import { createServer } from 'node:http'
import type { AddressInfo } from 'node:net'
import { Readable } from 'node:stream'

import { describe, it, expect } from 'vitest'

import type { ImportPreview, ImportRun } from '../src/api/ingest-types.js'
import { FetchHttpClient } from '../src/network/FetchHttpClient.js'
import { NodeHttpClient } from '../src/network/NodeHttpClient.js'
import { RushDB } from '../src/sdk/sdk.js'

type Call = { url: string; method: string; headers: Record<string, string>; body: any }

const API = 'https://api.test/api/v1'

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(status < 300 ? { success: true, data } : data), {
    status,
    headers: { 'content-type': 'application/json' }
  })

const bodyOf = async (body: unknown) => {
  if (body === undefined || body === '') return undefined
  if (typeof body === 'string') return JSON.parse(body)
  if (body instanceof Blob) return new Uint8Array(await body.arrayBuffer())
  return body
}

/** A RushDB client whose requests go to `answer`. */
function client(answer: (call: Call, calls: Call[]) => Response | Promise<Response>) {
  const calls: Call[] = []
  const fetchFn = (async (url: string, init: RequestInit) => {
    const call: Call = {
      url,
      method: init.method ?? 'GET',
      headers: (init.headers ?? {}) as Record<string, string>,
      body: await bodyOf(init.body)
    }
    calls.push(call)
    return answer(call, calls)
  }) as unknown as typeof fetch
  const db = new RushDB('TOKEN', { url: 'https://api.test', httpClient: new FetchHttpClient(fetchFn) })
  return { db, calls }
}

const run = (patch: Partial<ImportRun> = {}): ImportRun => ({
  id: 'imp-1',
  kind: 'file',
  trigger: 'api',
  status: 'draft',
  name: null,
  connectionId: null,
  recordsWritten: 0,
  recordsDeleted: 0,
  linksCreated: 0,
  errorCount: 0,
  progress: {},
  errorSample: [],
  summary: null,
  error: null,
  startedBy: null,
  startedAt: null,
  finishedAt: null,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  ...patch
})

const fileDto = (id: string, name: string, size: number) => ({
  id,
  name,
  format: 'csv',
  compression: null,
  size,
  status: 'uploading',
  label: 'Row',
  mapping: null,
  rowsDone: 0,
  bytesDone: 0,
  errorCount: 0,
  error: null
})

const s3File = (id: string, size: number, partSize: number) => {
  const count = Math.max(1, Math.ceil(size / partSize))
  return {
    ...fileDto(id, `${id}.csv`, size),
    upload: {
      mode: 's3-multipart' as const,
      partSize,
      expiresAt: '2026-01-01T01:00:00.000Z',
      parts: Array.from({ length: count }, (_, index) => ({
        partNumber: index + 1,
        url: `https://bucket.s3.test/${id}?partNumber=${index + 1}&X-Amz-Signature=sig`
      }))
    }
  }
}

const directFile = (id: string, size: number) => ({
  ...fileDto(id, `${id}.csv`, size),
  upload: { mode: 'direct' as const, method: 'PUT' as const, path: `/api/v1/imports/imp-1/files/${id}/content` }
})

const bytes = (length: number) => Uint8Array.from({ length }, (_, index) => index % 251)

/** Answers S3 part PUTs with an ETag, and the import API with `api`. */
const s3AndApi =
  (api: (call: Call) => Response, options: { failFirst?: number } = {}) =>
  (call: Call, calls: Call[]) => {
    if (call.url.startsWith('https://bucket.s3.test/')) {
      const partNumber = Number(new URL(call.url).searchParams.get('partNumber'))
      const attempts = calls.filter((other) => other.url === call.url).length
      if (partNumber === options.failFirst && attempts === 1) {
        return new Response('<Error>SlowDown</Error>', { status: 503 })
      }
      return new Response(null, { status: 200, headers: { ETag: `"etag-${partNumber}"` } })
    }
    return api(call)
  }

describe('imports: s3-multipart uploads', () => {
  it('puts every part to its presigned URL, retries a failed part and completes with the ETags', async () => {
    const file = s3File('f1', 10, 4)
    const { db, calls } = client(
      s3AndApi(
        (call) => {
          if (call.url === `${API}/imports`) return json({ ...run(), files: [file] }, 201)
          if (call.url.endsWith('/complete')) return json({ ...fileDto('f1', 'f1.csv', 10), status: 'uploaded' })
          return json({ message: 'unexpected' }, 404)
        },
        { failFirst: 2 }
      )
    )

    const created = await db.imports.create({ files: [{ name: 'f1.csv', size: 10 }] })
    expect(calls[0]).toMatchObject({ method: 'POST', body: { files: [{ name: 'f1.csv', size: 10 }] } })

    const progress: number[] = []
    const data = bytes(10)
    await db.imports.upload(created.data.id, 'f1', data, {
      parallelism: 2,
      onProgress: (p) => progress.push(p.loaded)
    })

    const puts = calls.filter((call) => call.url.startsWith('https://bucket.s3.test/'))
    expect(puts).toHaveLength(4) // three parts, one retried
    for (const put of puts) {
      expect(put.method).toBe('PUT')
      expect(put.headers.Authorization).toBeUndefined()
    }
    const sizes = Object.fromEntries(
      puts.map((put) => [new URL(put.url).searchParams.get('partNumber'), (put.body as Uint8Array).byteLength])
    )
    expect(sizes).toEqual({ '1': 4, '2': 4, '3': 2 })
    expect(Array.from(puts.find((put) => put.url.includes('partNumber=3'))!.body)).toEqual(Array.from(data.subarray(8)))

    const complete = calls[calls.length - 1]
    expect(complete.url).toBe(`${API}/imports/imp-1/files/f1/complete`)
    expect(complete.method).toBe('POST')
    expect(complete.headers.Authorization).toBe('Bearer TOKEN')
    expect(complete.body).toEqual({
      parts: [
        { partNumber: 1, etag: '"etag-1"' },
        { partNumber: 2, etag: '"etag-2"' },
        { partNumber: 3, etag: '"etag-3"' }
      ]
    })
    expect(progress[progress.length - 1]).toBe(10)
  })

  it('cuts a stream into parts of partSize', async () => {
    const file = s3File('f1', 9, 4)
    const { db, calls } = client(s3AndApi(() => json(fileDto('f1', 'f1.csv', 9))))
    const data = bytes(9)
    // Uneven chunks: 3 + 5 + 1 bytes.
    const stream = Readable.from([data.subarray(0, 3), data.subarray(3, 8), data.subarray(8)])

    await db.imports.upload('imp-1', file, stream)

    const puts = calls.filter((call) => call.url.startsWith('https://bucket.s3.test/'))
    expect(puts.map((put) => Array.from(put.body as Uint8Array))).toEqual([
      Array.from(data.subarray(0, 4)),
      Array.from(data.subarray(4, 8)),
      Array.from(data.subarray(8))
    ])
    expect(calls[calls.length - 1].body.parts).toHaveLength(3)
  })

  it('fails without completing when the data size differs from the announced size', async () => {
    const { db, calls } = client(s3AndApi(() => json({})))
    await expect(db.imports.upload('imp-1', s3File('f1', 10, 4), bytes(9))).rejects.toThrow(/announced as 10 bytes/)
    expect(calls).toHaveLength(0)
  })

  it('does not retry a 4xx part upload', async () => {
    const { db, calls } = client(() => new Response('<Error>AccessDenied</Error>', { status: 403 }))
    await expect(db.imports.upload('imp-1', s3File('f1', 4, 4), bytes(4), { retries: 3 })).rejects.toMatchObject({
      status: 403
    })
    expect(calls).toHaveLength(1)
  })
})

describe('imports: direct uploads', () => {
  it('puts the raw bytes to the API path with the auth header, then completes without parts', async () => {
    const { db, calls } = client((call) =>
      call.url.endsWith('/content') ?
        json({ ...fileDto('f1', 'f1.csv', 5), status: 'uploaded' })
      : json({ ...fileDto('f1', 'f1.csv', 5), status: 'uploaded' })
    )

    await db.imports.upload('imp-1', directFile('f1', 5), new Blob([bytes(5)]))

    expect(calls[0]).toMatchObject({
      url: `${API}/imports/imp-1/files/f1/content`,
      method: 'PUT',
      headers: { Authorization: 'Bearer TOKEN', 'Content-Type': 'application/octet-stream' }
    })
    expect(Array.from(calls[0].body as Uint8Array)).toEqual(Array.from(bytes(5)))
    expect(calls[1]).toMatchObject({ url: `${API}/imports/imp-1/files/f1/complete`, method: 'POST', body: {} })
  })

  it('streams a Node Readable with the Node HTTP client', async () => {
    const received: Array<{ method?: string; url?: string; auth?: string; body: Buffer }> = []
    const server = createServer((req, res) => {
      const chunks: Buffer[] = []
      req.on('data', (chunk) => chunks.push(chunk))
      req.on('end', () => {
        received.push({ method: req.method, url: req.url, auth: req.headers.authorization, body: Buffer.concat(chunks) })
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({ success: true, data: fileDto('f1', 'f1.csv', 6) }))
      })
    })
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
    const { port } = server.address() as AddressInfo
    try {
      const db = new RushDB('TOKEN', { url: `http://127.0.0.1:${port}`, httpClient: new NodeHttpClient() })
      await db.imports.upload('imp-1', directFile('f1', 6), Readable.from([Buffer.from('a,b\n'), Buffer.from('1,2')]))
      expect(received[0]).toMatchObject({ method: 'PUT', url: '/api/v1/imports/imp-1/files/f1/content', auth: 'Bearer TOKEN' })
      expect(received[0].body.toString()).toBe('a,b\n1,2')
      expect(received[1]).toMatchObject({ method: 'POST', url: '/api/v1/imports/imp-1/files/f1/complete' })
    } finally {
      server.close()
    }
  })

  it('needs the file object for files this client did not create', async () => {
    const { db } = client(() => json({}))
    await expect(db.imports.upload('imp-1', 'f1', bytes(1))).rejects.toThrow(/No upload instructions/)
  })
})

describe('imports: runs', () => {
  it('waits until the run finishes', async () => {
    const statuses = ['queued', 'running', 'completed'] as const
    let polls = 0
    const { db, calls } = client(() => json(run({ status: statuses[Math.min(polls++, 2)], recordsWritten: polls })))
    const seen: string[] = []

    const result = await db.imports.wait('imp-1', { intervalMs: 1, onProgress: (current) => seen.push(current.status) })

    expect(result.data.status).toBe('completed')
    expect(seen).toEqual(['queued', 'running', 'completed'])
    expect(calls.every((call) => call.method === 'GET' && call.url === `${API}/imports/imp-1`)).toBe(true)
  })

  it('stops waiting after timeoutMs', async () => {
    const { db } = client(() => json(run({ status: 'running' })))
    await expect(db.imports.wait('imp-1', { intervalMs: 5, timeoutMs: 12 })).rejects.toThrow(/still running/)
  })

  it('maps list filters and run actions to their routes', async () => {
    const { db, calls } = client(() => new Response(JSON.stringify({ success: true, data: [], total: 0 }), { status: 200 }))
    await db.imports.list({ kind: 'sync', connectionId: 'c 1', limit: 10 })
    await db.imports.cancel('imp-1')
    await db.imports.retry('imp-1')
    await db.imports.delete('imp-1')
    await db.imports.preview('imp-1', { files: [{ id: 'f1', label: 'Order' }] })
    await db.imports.start('imp-1')
    expect(calls.map((call) => `${call.method} ${call.url.slice(API.length)}`)).toEqual([
      'GET /imports?kind=sync&connectionId=c%201&limit=10',
      'POST /imports/imp-1/cancel',
      'POST /imports/imp-1/retry',
      'DELETE /imports/imp-1',
      'POST /imports/imp-1/preview',
      'POST /imports/imp-1/start'
    ])
    expect(calls[4].body).toEqual({ files: [{ id: 'f1', label: 'Order' }] })
    expect(calls[5].body).toEqual({})
  })

  it('passes hashed columns in a mapping and returns personal-data hints from the preview', async () => {
    const preview: ImportPreview = {
      files: [
        {
          fileId: 'f1',
          name: 'customers.csv',
          label: 'Customer',
          rows: 2,
          columns: [
            { name: 'id', type: 'number', samples: [1, 2], nulls: 0, distinct: 2, unique: true, suggestion: 'include' },
            {
              name: 'email',
              type: 'string',
              samples: ['a***@example.com'],
              nulls: 0,
              distinct: 2,
              unique: true,
              pii: { kind: 'email', source: 'name', confidence: 0.9, reason: 'The name "email" suggests email' },
              suggestion: 'hash'
            }
          ],
          errors: []
        }
      ],
      links: []
    }
    const { db, calls } = client(() => new Response(JSON.stringify({ success: true, data: preview }), { status: 200 }))
    const { data } = await db.imports.preview('imp-1')
    const email = data.files[0].columns.find((column) => column.suggestion === 'hash')!
    expect(email.pii?.kind).toBe('email')
    await db.imports.start('imp-1', { files: [{ id: 'f1', mapping: { keyColumn: 'id', hash: [email.name] } }] })
    expect(calls[1].body).toEqual({ files: [{ id: 'f1', mapping: { keyColumn: 'id', hash: ['email'] } }] })
  })
})

describe('imports.importFiles', () => {
  it('creates, uploads every file, starts with mappings and links, then waits', async () => {
    const files = [directFile('f1', 3), directFile('f2', 4)]
    let polls = 0
    const { db, calls } = client((call) => {
      const path = call.url.slice(API.length)
      if (call.method === 'POST' && path === '/imports') return json({ ...run(), files }, 201)
      if (path.endsWith('/content') || path.endsWith('/complete')) return json(fileDto('f', 'f.csv', 1))
      if (path.endsWith('/start')) return json(run({ status: 'queued' }))
      if (call.method === 'GET') return json(run({ status: polls++ ? 'completed' : 'running' }))
      return json({ message: 'unexpected' }, 404)
    })
    const phases: string[] = []

    const result = await db.imports.importFiles(
      [
        { data: new Blob([bytes(3)]), name: 'customers.csv', label: 'Customer' },
        { data: bytes(4), name: 'orders.csv' }
      ],
      {
        name: 'CRM export',
        mappings: { 'customers.csv': { keyColumn: 'id' } },
        links: [{ source: 'orders.csv', sourceColumn: 'customer_id', target: 0, targetColumn: 'id', type: 'PLACED_BY' }],
        wait: { intervalMs: 1 },
        onProgress: (progress) => phases.push(progress.phase)
      }
    )

    expect(result.data.status).toBe('completed')
    expect(calls[0].body).toEqual({
      name: 'CRM export',
      files: [
        { name: 'customers.csv', size: 3, label: 'Customer' },
        { name: 'orders.csv', size: 4 }
      ]
    })
    const start = calls.find((call) => call.url.endsWith('/start'))!
    expect(start.body).toEqual({
      files: [{ id: 'f1', mapping: { keyColumn: 'id' } }, { id: 'f2' }],
      links: [{ sourceFileId: 'f2', sourceColumn: 'customer_id', targetFileId: 'f1', targetColumn: 'id', type: 'PLACED_BY' }]
    })
    expect(phases).toContain('upload')
    expect(phases[phases.length - 1]).toBe('run')
  })

  it('needs a size for a stream', async () => {
    const { db } = client(() => json({}))
    await expect(
      db.imports.importFiles([{ data: Readable.from([Buffer.from('x')]), name: 'a.csv' }])
    ).rejects.toThrow(/pass its size/)
  })
})
