/**
 * Issue #21: multiple `uniq: true` fields in a Model do not guarantee
 * uniqueness.
 *
 * `Model.create` (and `set`/`update`) used to validate uniqueness with a
 * single combined query (`where: { email, username }`), which only matches a
 * record sharing *all* values at once. A record sharing just one field was
 * missed and the duplicate was created. Each uniq field must be checked with
 * its own request.
 */
import { describe, it, expect, beforeEach } from 'vitest'

import type { HttpClientInterface, HttpClientResponseInterface } from '../src/network/HttpClient.js'
import { UniquenessError } from '../src/sdk/errors.js'
import { Model } from '../src/sdk/model.js'
import { RushDB } from '../src/sdk/sdk.js'

const EXISTING_ID = '0190a7e2-0000-7000-8000-000000000002'
const NEW_ID = '0190a7e2-0000-7000-8000-000000000003'

const EXISTING = { __id: EXISTING_ID, __label: 'User', email: 'taken@x.com', username: 'alice' }

type Call = { method: string; path: string; requestData?: unknown }

function fakeResponse(body: unknown): HttpClientResponseInterface {
  return {
    getHeaders: () => ({}),
    getRawResponse: () => body,
    getStatusCode: () => 200,
    toJSON: async () => body,
    toStream: () => undefined
  } as HttpClientResponseInterface
}

/**
 * A backend holding one existing User. Search uses AND semantics over the
 * `where` keys, like the real engine: a combined query only matches a record
 * sharing every value.
 */
function fakeBackend() {
  const calls: Call[] = []
  const httpClient: HttpClientInterface = {
    makeRequest: async (url, config) => {
      const path = url.replace('https://test.test/api/v1', '')
      calls.push({ method: String(config.method), path, requestData: config.requestData })
      if (path === '/records/search') {
        const where = (config.requestData as any)?.where ?? {}
        const keys = Object.keys(where)
        const matches =
          keys.length > 0 &&
          keys.every((key) => (EXISTING as Record<string, unknown>)[key] === where[key])
        return fakeResponse({
          success: true,
          total: matches ? 1 : 0,
          data: matches ? [EXISTING] : []
        })
      }
      if (path === '/tx') {
        return fakeResponse({ success: true, data: { id: 'tx-1' } })
      }
      if (path.startsWith('/tx/')) {
        return fakeResponse({ success: true, data: { message: 'ok' } })
      }
      return fakeResponse({
        success: true,
        data: { __id: NEW_ID, __label: 'User', email: 'new@x.com', username: 'bob' }
      })
    }
  }
  const client = new RushDB('test-token', { url: 'https://test.test/api/v1', httpClient })
  const User = new Model(
    'User',
    {
      email: { type: 'string' as const, unique: true },
      username: { type: 'string' as const, unique: true }
    },
    { client }
  )
  return { client, User, calls }
}

let backend: ReturnType<typeof fakeBackend>

beforeEach(() => {
  backend = fakeBackend()
})

function searchCalls() {
  return backend.calls.filter((call) => call.path === '/records/search')
}

describe('multiple uniq fields are checked separately (issue #21)', () => {
  it('create with a taken email rejects, even when the username is new', async () => {
    await expect(
      backend.User.create({ email: 'taken@x.com', username: 'bob' })
    ).rejects.toThrow(UniquenessError)
    expect(backend.calls.some((call) => call.method === 'POST' && call.path === '/records')).toBe(false)
  })

  it('create with a taken username rejects, even when the email is new', async () => {
    await expect(
      backend.User.create({ email: 'new@x.com', username: 'alice' })
    ).rejects.toThrow(UniquenessError)
    expect(backend.calls.some((call) => call.method === 'POST' && call.path === '/records')).toBe(false)
  })

  it('create with all-new values succeeds and checks each uniq field separately', async () => {
    const record = await backend.User.create({ email: 'new@x.com', username: 'bob' })
    expect(record.data.__id).toBe(NEW_ID)
    expect(searchCalls()).toHaveLength(2)
    expect(searchCalls().map((call) => (call.requestData as any).where)).toEqual([
      { email: 'new@x.com' },
      { username: 'bob' }
    ])
  })

  it('create with onConflict upsert updates the conflicting record', async () => {
    await backend.User.create({ email: 'taken@x.com', username: 'bob' }, undefined, {
      onConflict: 'upsert'
    })
    expect(backend.calls.some((call) => call.method === 'POST' && call.path === '/records')).toBe(false)
    expect(backend.calls.some((call) => call.path === `/records/${EXISTING_ID}`)).toBe(true)
  })

  it('update to a taken email rejects, even when the username is new', async () => {
    await expect(
      backend.User.update('0190a7e2-0000-7000-8000-000000000004', {
        email: 'taken@x.com',
        username: 'carol'
      })
    ).rejects.toThrow(UniquenessError)
  })

  it('update of a record to its own values is allowed', async () => {
    const result = await backend.User.update(EXISTING_ID, {
      email: 'taken@x.com',
      username: 'alice'
    })
    expect(result).toBeTruthy()
  })
})
