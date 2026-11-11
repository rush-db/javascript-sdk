import type { HttpClientInterface, HttpClientResponseInterface, RawRequestBody } from '../network/HttpClient.js'
import type { ImportFileUpload, ImportUploadData, ImportUploadOptions } from './ingest-types.js'

/** What uploads need besides the JSON fetcher: raw requests to presigned URLs and the API. */
export type UploadTransport = {
  httpClient: HttpClientInterface
  /** API base URL, e.g. `https://api.rushdb.com/api/v1`. */
  url: string
  token?: string
}

export type UploadedPart = { partNumber: number; etag: string }

export const DEFAULT_UPLOAD_PARALLELISM = 4
export const DEFAULT_UPLOAD_RETRIES = 3
export const DEFAULT_UPLOAD_TIMEOUT = 10 * 60 * 1000

type Bytes = Uint8Array | Blob

const isBlob = (data: unknown): data is Blob => typeof Blob !== 'undefined' && data instanceof Blob

const isAsyncIterable = (data: unknown): data is AsyncIterable<Uint8Array | string> =>
  data !== null &&
  typeof data === 'object' &&
  typeof (data as Record<symbol, unknown>)[Symbol.asyncIterator] === 'function'

const isReadableStream = (data: unknown): data is ReadableStream<Uint8Array> =>
  data !== null && typeof data === 'object' && typeof (data as ReadableStream).getReader === 'function'

const toUint8Array = (chunk: Uint8Array | string | ArrayBuffer | ArrayBufferView): Uint8Array =>
  typeof chunk === 'string' ? new TextEncoder().encode(chunk)
  : chunk instanceof Uint8Array ? chunk
  : chunk instanceof ArrayBuffer ? new Uint8Array(chunk)
  : new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength)

/** Data that can be sliced and re-read (so a failed request can be retried). */
const randomAccess = (data: ImportUploadData): Bytes | undefined => {
  if (isBlob(data)) {
    return data
  }
  if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
    return toUint8Array(data as ArrayBuffer | ArrayBufferView)
  }
  return undefined
}

/** The size of in-memory data, or `undefined` for a stream. */
export const sizeOf = (data: ImportUploadData): number | undefined => {
  const bytes = randomAccess(data)
  return bytes === undefined ? undefined
    : isBlob(bytes) ? bytes.size
    : bytes.byteLength
}

/** Chunks of a stream, as bytes. */
async function* chunksOf(data: ImportUploadData): AsyncGenerator<Uint8Array> {
  if (isAsyncIterable(data)) {
    const iterator = data[Symbol.asyncIterator]()
    for (;;) {
      const { done, value } = await iterator.next()
      if (done) {
        return
      }
      yield toUint8Array(value)
    }
  }
  if (isReadableStream(data)) {
    const reader = data.getReader()
    try {
      for (;;) {
        const { done, value } = await reader.read()
        if (done) {
          return
        }
        yield toUint8Array(value)
      }
    } finally {
      reader.releaseLock()
    }
  }
  throw new TypeError(
    'Unsupported upload data: pass a Blob/File, Uint8Array/Buffer, ArrayBuffer, ReadableStream or a Node Readable'
  )
}

/** A stream cut into parts of `partSize` bytes (the last may be shorter). */
async function* partsOfStream(data: ImportUploadData, partSize: number): AsyncGenerator<Uint8Array> {
  let buffer = new Uint8Array(partSize)
  let filled = 0
  const chunks = chunksOf(data)
  for (;;) {
    const { done, value } = await chunks.next()
    if (done) {
      break
    }
    let offset = 0
    while (offset < value.byteLength) {
      const take = Math.min(partSize - filled, value.byteLength - offset)
      buffer.set(value.subarray(offset, offset + take), filled)
      filled += take
      offset += take
      if (filled === partSize) {
        yield buffer
        buffer = new Uint8Array(partSize)
        filled = 0
      }
    }
  }
  if (filled > 0) {
    yield buffer.subarray(0, filled)
  }
}

const sliceOf = (bytes: Bytes, start: number, end: number): Bytes =>
  isBlob(bytes) ? bytes.slice(start, end) : bytes.subarray(start, end)

const byteLength = (bytes: Bytes) => (isBlob(bytes) ? bytes.size : bytes.byteLength)

/** An error as the JSON fetcher reports one: `"<status> <message>"` with `status` and `body`. */
async function responseError(response: HttpClientResponseInterface, what: string) {
  const status = response.getStatusCode()
  let body: unknown
  let message = ''
  try {
    body = await response.toJSON()
    const raw = (body as Record<string, any>)?.message ?? (body as Record<string, any>)?.error
    message = Array.isArray(raw) ? raw.join('; ') : typeof raw === 'string' ? raw : ''
  } catch {
    // S3 answers XML; the status says enough.
  }
  const error = new Error(`${status} ${message || what}`) as Error & { status: number; body?: unknown }
  error.status = status
  error.body = body
  return error
}

/** Lets the connection go back to the pool without reading the body. */
function discard(response: HttpClientResponseInterface) {
  try {
    const raw = response.getRawResponse() as any
    if (raw && typeof raw.resume === 'function') {
      raw.resume()
    } else if (raw?.body && typeof raw.body.cancel === 'function') {
      raw.body.cancel().catch(() => undefined)
    }
  } catch {
    // Mocked responses have nothing to release.
  }
}

const isRetryable = (error: any) => {
  const status = error?.status
  return typeof status !== 'number' || status === 429 || status >= 500
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function withRetries<T>(attempts: number, run: () => Promise<T>): Promise<T> {
  let lastError: unknown
  for (let attempt = 0; attempt < Math.max(1, attempts); attempt++) {
    try {
      return await run()
    } catch (error) {
      lastError = error
      if (!isRetryable(error) || attempt === attempts - 1) {
        break
      }
      await sleep(Math.min(8000, 250 * 2 ** attempt))
    }
  }
  throw lastError
}

/** Runs `task` for each item of `items` with at most `limit` in flight; stops at the first failure. */
async function pool<T>(items: AsyncIterable<T>, limit: number, task: (item: T) => Promise<void>) {
  const running = new Set<Promise<void>>()
  let failure: { error: unknown } | undefined
  const iterator = items[Symbol.asyncIterator]()
  for (;;) {
    if (failure) {
      break
    }
    let next: IteratorResult<T>
    try {
      next = await iterator.next()
    } catch (error) {
      failure = { error }
      break
    }
    if (next.done) {
      break
    }
    const value = next.value
    const promise: Promise<void> = task(value)
      .catch((error) => {
        failure = failure ?? { error }
      })
      .then(() => {
        running.delete(promise)
      })
    running.add(promise)
    if (running.size >= limit) {
      await Promise.race(running)
    }
  }
  await Promise.all(running)
  if (failure) {
    try {
      await iterator.return?.(undefined)
    } catch {
      // The source already failed.
    }
    throw (failure as { error: unknown }).error
  }
}

/**
 * Sends one file's bytes as its upload instructions say. `s3-multipart`
 * returns the parts with their ETags for the completion call; `direct`
 * returns no parts.
 */
export async function uploadFileContent(
  transport: UploadTransport,
  file: Pick<ImportFileUpload, 'id' | 'size' | 'upload'>,
  data: ImportUploadData,
  options: ImportUploadOptions = {}
): Promise<UploadedPart[] | undefined> {
  const retries = options.retries ?? DEFAULT_UPLOAD_RETRIES
  const timeout = options.timeout ?? DEFAULT_UPLOAD_TIMEOUT
  const total = file.size
  let loaded = 0
  const progress = (bytes: number) => {
    loaded += bytes
    options.onProgress?.({ fileId: file.id, loaded, total })
  }
  const bytes = randomAccess(data)
  if (bytes !== undefined && byteLength(bytes) !== file.size) {
    throw new Error(`File ${file.id} was announced as ${file.size} bytes but the data has ${byteLength(bytes)}`)
  }

  const upload = file.upload
  if (upload.mode === 'direct') {
    const url = new URL(upload.path, transport.url).toString()
    const headers: Record<string, string> = { 'Content-Type': 'application/octet-stream' }
    if (transport.token !== undefined) {
      headers.Authorization = `Bearer ${transport.token}`
    }
    const send = async (rawBody: RawRequestBody) => {
      const response = await transport.httpClient.makeRequest(url, {
        method: upload.method ?? 'PUT',
        headers,
        rawBody,
        timeout
      })
      if (response.getStatusCode() < 200 || response.getStatusCode() >= 300) {
        throw await responseError(response, 'upload failed')
      }
      discard(response)
    }
    if (bytes !== undefined) {
      // Bytes in memory can be sent again.
      await withRetries(retries, () => send(bytes))
      progress(byteLength(bytes))
    } else {
      // A stream is read once: no retry.
      const counted = (async function* () {
        for await (const chunk of chunksOf(data)) {
          progress(chunk.byteLength)
          yield chunk
        }
      })()
      await send(counted)
    }
    return undefined
  }

  const { partSize, parts } = upload
  const urls = new Map(parts.map((part) => [part.partNumber, part.url]))
  const source: AsyncIterable<{ partNumber: number; body: Bytes }> =
    bytes !== undefined ?
      (async function* () {
        for (const { partNumber } of parts) {
          const start = (partNumber - 1) * partSize
          yield { partNumber, body: sliceOf(bytes, start, Math.min(start + partSize, total)) }
        }
      })()
    : (async function* () {
        let partNumber = 0
        let sent = 0
        for await (const body of partsOfStream(data, partSize)) {
          partNumber += 1
          sent += body.byteLength
          if (!urls.has(partNumber) || sent > total) {
            throw new Error(`File ${file.id} has more data than the ${total} bytes announced`)
          }
          yield { partNumber, body }
        }
        if (sent !== total) {
          throw new Error(`File ${file.id} was announced as ${total} bytes but the stream had ${sent}`)
        }
      })()

  const done: UploadedPart[] = []
  await pool(source, Math.max(1, options.parallelism ?? DEFAULT_UPLOAD_PARALLELISM), async ({ partNumber, body }) => {
    const etag = await withRetries(retries, async () => {
      const response = await transport.httpClient.makeRequest(urls.get(partNumber)!, {
        method: 'PUT',
        headers: {},
        rawBody: body,
        timeout
      })
      if (response.getStatusCode() < 200 || response.getStatusCode() >= 300) {
        throw await responseError(response, `upload of part ${partNumber} failed`)
      }
      const headers = response.getHeaders()
      const value = headers.etag ?? headers.ETag
      discard(response)
      const etag = Array.isArray(value) ? value[0] : value
      if (!etag) {
        // Browsers only see ETag when the bucket's CORS rules expose it.
        const error = new Error(
          `Part ${partNumber} uploaded but its ETag header is not readable; the storage CORS rules must expose ETag`
        ) as Error & { status: number }
        error.status = 400
        throw error
      }
      return etag
    })
    done.push({ partNumber, etag })
    progress(byteLength(body))
  })
  return done.sort((a, b) => a.partNumber - b.partNumber)
}
