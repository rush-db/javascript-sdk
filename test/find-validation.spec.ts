/**
 * Issue #22: `*.find*()` methods must error on empty criteria instead of
 * silently returning an arbitrary record.
 *
 * `repo.findById(undefined)` used to send a request (`GET /records/undefined`
 * or an unfiltered search) and return the last record. These methods must
 * reject before any request is sent.
 */
import { describe, it, expect, beforeEach } from 'vitest'

import type { HttpClientInterface, HttpClientResponseInterface } from '../src/network/HttpClient.js'
import { EmptyTargetError } from '../src/sdk/errors.js'
import { Model } from '../src/sdk/model.js'
import { RushDB } from '../src/sdk/sdk.js'

const RECORD_ID = '0190a7e2-0000-7000-8000-000000000001'

type Call = { method: string; path: string }

function fakeResponse(body: unknown): HttpClientResponseInterface {
  return {
    getHeaders: () => ({}),
    getRawResponse: () => body,
    getStatusCode: () => 200,
    toJSON: async () => body,
    toStream: () => undefined
  } as HttpClientResponseInterface
}

/** A Cloud-shaped backend that records every request it receives. */
function fakeBackend() {
  const calls: Call[] = []
  const httpClient: HttpClientInterface = {
    makeRequest: async (url, config) => {
      const path = url.replace('https://test.test/api/v1', '')
      calls.push({ method: String(config.method), path })
      if (path.endsWith('/search')) {
        return fakeResponse({
          success: true,
          total: 2,
          data: [{ __id: RECORD_ID, __label: 'Book', title: 'Dune' }]
        })
      }
      return fakeResponse({ success: true, data: { __id: RECORD_ID, __label: 'Book', title: 'Dune' } })
    }
  }
  const client = new RushDB('test-token', { url: 'https://test.test/api/v1', httpClient })
  return { client, calls }
}

let backend: ReturnType<typeof fakeBackend>

beforeEach(() => {
  backend = fakeBackend()
})

describe('find methods reject empty criteria (issue #22)', () => {
  it('records.findById(undefined) rejects without sending a request', async () => {
    await expect(backend.client.records.findById(undefined as any)).rejects.toThrow(EmptyTargetError)
    expect(backend.calls).toEqual([])
  })

  it('records.findById("") rejects without sending a request', async () => {
    await expect(backend.client.records.findById('')).rejects.toThrow(EmptyTargetError)
    expect(backend.calls).toEqual([])
  })

  it('records.findById([]) rejects without sending a request', async () => {
    await expect(backend.client.records.findById([])).rejects.toThrow(EmptyTargetError)
    expect(backend.calls).toEqual([])
  })

  it('records.findById([undefined]) rejects without sending a request', async () => {
    await expect(backend.client.records.findById([undefined as any])).rejects.toThrow(EmptyTargetError)
    expect(backend.calls).toEqual([])
  })

  it('records.findOne(undefined) rejects without sending a request', async () => {
    await expect(backend.client.records.findOne(undefined as any)).rejects.toThrow(EmptyTargetError)
    expect(backend.calls).toEqual([])
  })

  it('records.findUniq(undefined) rejects without sending a request', async () => {
    await expect(backend.client.records.findUniq(undefined as any)).rejects.toThrow(EmptyTargetError)
    expect(backend.calls).toEqual([])
  })

  it('Model.findById(undefined) rejects without sending a request', async () => {
    const Book = new Model('Book', { title: { type: 'string' as const } }, { client: backend.client })
    await expect(Book.findById(undefined as any)).rejects.toThrow(EmptyTargetError)
    expect(backend.calls).toEqual([])
  })

  it('records.findById(id) still works', async () => {
    const record = await backend.client.records.findById(RECORD_ID)
    expect(record.data.__id).toBe(RECORD_ID)
    expect(backend.calls).toEqual([{ method: 'GET', path: `/records/${RECORD_ID}` }])
  })

  it('records.findOne(query) still works', async () => {
    const record = await backend.client.records.findOne({ where: { title: 'Dune' } })
    expect(record.data.__id).toBe(RECORD_ID)
    expect(backend.calls).toEqual([{ method: 'POST', path: '/records/search' }])
  })
})
