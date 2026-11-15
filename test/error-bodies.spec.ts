import { createServer } from 'node:http'
import type { AddressInfo } from 'node:net'

import { describe, it, expect, beforeAll, afterAll } from 'vitest'

import { DirectEngine } from '../src/direct/engine.js'
import { errorDetails, responseError } from '../src/network/errors.js'
import { FetchHttpClient } from '../src/network/FetchHttpClient.js'
import type { HttpClient } from '../src/network/HttpClient.js'
import { createFetcher } from '../src/network/index.js'
import { NodeHttpClient } from '../src/network/NodeHttpClient.js'
import { RushDB } from '../src/sdk/sdk.js'

type Shape = {
  name: string
  status: number
  body: string
  contentType?: string
  /** What the error carries; `message` is the reason after `"<status> "`. */
  expected: { message?: string; code?: string; retryable?: boolean }
}

/** Every error body the engine or RushDB Cloud can answer with. */
const SHAPES: Shape[] = [
  {
    name: 'a protocol error envelope',
    status: 401,
    body: JSON.stringify({
      protocolVersion: 1,
      error: { code: 'unauthorized', message: 'capability lacks write permission', retryable: false }
    }),
    expected: { message: 'capability lacks write permission', code: 'unauthorized', retryable: false }
  },
  {
    name: 'a bare string error',
    status: 401,
    body: JSON.stringify({ error: 'unauthorized' }),
    expected: { message: 'unauthorized' }
  },
  {
    name: 'a RushDB Cloud error',
    status: 400,
    body: JSON.stringify({ statusCode: 400, message: ['name must be a string', 'limit too big'], error: 'Bad Request' }),
    expected: { message: 'name must be a string; limit too big' }
  },
  {
    name: 'a non-JSON body',
    status: 502,
    body: '<html>Bad Gateway</html>',
    contentType: 'text/html',
    expected: {}
  },
  { name: 'an empty body', status: 401, body: '', expected: {} }
]

let baseUrl = ''
let current: Shape = SHAPES[0]
const server = createServer((req, res) => {
  req.resume()
  req.on('end', () => {
    res.statusCode = current.status
    res.setHeader('Content-Type', current.contentType ?? 'application/json')
    res.end(current.body)
  })
})

beforeAll(async () => {
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`
})
afterAll(() => {
  server.close()
})

const clients: Array<[string, () => HttpClient]> = [
  ['Node', () => new NodeHttpClient()],
  ['fetch', () => new FetchHttpClient()]
]

const fieldsOf = (error: any) => ({
  status: error.status,
  message: error.message,
  code: error.code,
  retryable: error.retryable
})

const expectedError = (shape: Shape, fallback?: string) => {
  const reason = shape.expected.message ?? fallback
  return {
    status: shape.status,
    message: reason ? `${shape.status} ${reason}` : `${shape.status}`,
    code: shape.expected.code,
    retryable: shape.expected.retryable
  }
}

describe.each(clients)('error bodies over the %s HTTP client', (_, httpClient) => {
  describe.each(SHAPES)('$name', (shape) => {
    it('direct mode raises the reason, code and status', async () => {
      current = shape
      const engine = new DirectEngine({ engineUrl: baseUrl, token: 'local-token', httpClient: httpClient() })
      const error = await engine.execute({ kind: 'query', query: { kind: 'records', query: {} } }).catch((e) => e)
      expect(error).toBeInstanceOf(Error)
      expect(fieldsOf(error)).toEqual(expectedError(shape, 'engine request failed'))
    })

    it('the RushDB Cloud client raises the reason, code and status', async () => {
      current = shape
      const fetcher = createFetcher({ httpClient: httpClient(), token: 'TOKEN', url: baseUrl })
      const error = await fetcher('/records/search', { method: 'POST', requestData: {} }).catch((e) => e)
      expect(error).toBeInstanceOf(Error)
      expect(fieldsOf(error)).toEqual(expectedError(shape))
    })
  })
})

describe('error bodies through the SDK', () => {
  it('surfaces a bare engine auth failure in direct mode', async () => {
    current = SHAPES[1]
    const db = new RushDB('nope', { direct: true, engineUrl: baseUrl, httpClient: new NodeHttpClient() } as any)
    await expect(db.records.create({ label: 'Note', data: { a: 1 } })).rejects.toMatchObject({
      status: 401,
      message: '401 unauthorized',
      body: { error: 'unauthorized' }
    })
  })

  it('names the failed upload when storage answers XML', async () => {
    current = SHAPES[3]
    const db = new RushDB('TOKEN', { url: baseUrl, httpClient: new NodeHttpClient() })
    const file = { id: 'f1', size: 1, upload: { mode: 'direct', method: 'PUT', path: '/upload/f1' } }
    await expect(db.imports.upload('imp-1', file as any, new Uint8Array(1), { retries: 1 })).rejects.toMatchObject({
      status: 502,
      message: '502 upload failed'
    })
  })
})

describe('errorDetails', () => {
  it('reads every known shape', () => {
    expect(errorDetails({ protocolVersion: 1, error: { code: 'busy', message: 'retry', retryable: true } })).toEqual({
      code: 'busy',
      message: 'retry',
      retryable: true
    })
    expect(errorDetails({ error: 'unauthorized' })).toEqual({ message: 'unauthorized' })
    expect(errorDetails({ message: 'plan limit reached', error: 'Forbidden' })).toEqual({
      message: 'plan limit reached'
    })
    expect(errorDetails({ message: ['a', 'b'] })).toEqual({ message: 'a; b' })
  })

  it('reads nothing from an unknown, empty or missing body', () => {
    expect(errorDetails(undefined)).toEqual({})
    expect(errorDetails('Bad Gateway')).toEqual({})
    expect(errorDetails({})).toEqual({})
    expect(errorDetails({ error: '' })).toEqual({})
    expect(errorDetails({ error: { code: 7 } })).toEqual({ code: undefined, message: undefined, retryable: undefined })
  })

  it('keeps the status when the body has no reason', () => {
    expect(responseError(503, undefined)).toMatchObject({ message: '503', status: 503 })
    expect(responseError(503, undefined, 'engine request failed').message).toBe('503 engine request failed')
  })
})
