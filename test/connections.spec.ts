import { describe, it, expect } from 'vitest'

import { FetchHttpClient } from '../src/network/FetchHttpClient.js'
import { RushDB } from '../src/sdk/sdk.js'

const API = 'https://api.test/api/v1'

type Call = { method: string; path: string; body: any; auth?: string }

function client() {
  const calls: Call[] = []
  const fetchFn = (async (url: string, init: RequestInit) => {
    calls.push({
      method: init.method ?? 'GET',
      path: url.slice(API.length),
      body: typeof init.body === 'string' && init.body ? JSON.parse(init.body) : undefined,
      auth: (init.headers as Record<string, string>)?.Authorization
    })
    return new Response(JSON.stringify({ success: true, data: { ok: true } }), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    })
  }) as unknown as typeof fetch
  const db = new RushDB('TOKEN', { url: 'https://api.test', httpClient: new FetchHttpClient(fetchFn) })
  return { db, calls }
}

describe('connections', () => {
  it('maps every method to its route', async () => {
    const { db, calls } = client()

    await db.connections.catalog()
    await db.connections.list()
    await db.connections.get('conn-1')
    await db.connections.create({
      connectorId: 'hubspot',
      name: 'HubSpot',
      auth: { type: 'bearer', token: 'pat-1' },
      mode: 'scheduled',
      scheduleMinutes: 60,
      streams: [{ stream: 'contacts', policy: { mode: 'auto', exclude: ['phone'] } }]
    })
    await db.connections.update('conn-1', { scheduleMinutes: 30 })
    await db.connections.delete('conn-1')
    await db.connections.delete('conn-1', { deleteData: true })
    await db.connections.test('conn-1')
    await db.connections.preview('conn-1', 'contacts', { limit: 5 })
    await db.connections.sync('conn-1', { streams: ['contacts'], full: true })
    await db.connections.sync('conn-1')
    await db.connections.runs('conn-1', { limit: 5, skip: 10 })
    await db.connections.pause('conn-1')
    await db.connections.resume('conn-1')
    await db.connections.rotateWebhookToken('conn/1')
    await db.connections.pushTemplates()
    await db.connections.fields('conn-1', { stream: 'contacts', limit: 100 })
    await db.connections.fields('conn-1', { stream: 'deals' })

    expect(calls.map((call) => `${call.method} ${call.path}`)).toEqual([
      'GET /connections/catalog',
      'GET /connections',
      'GET /connections/conn-1',
      'POST /connections',
      'PATCH /connections/conn-1',
      'DELETE /connections/conn-1',
      'DELETE /connections/conn-1?deleteData=true',
      'POST /connections/conn-1/test',
      'POST /connections/conn-1/preview',
      'POST /connections/conn-1/runs',
      'POST /connections/conn-1/runs',
      'GET /connections/conn-1/runs?limit=5&skip=10',
      'POST /connections/conn-1/pause',
      'POST /connections/conn-1/resume',
      'POST /connections/conn%2F1/webhook-token',
      'GET /connections/push-templates',
      'POST /connections/conn-1/fields',
      'POST /connections/conn-1/fields'
    ])
    expect(calls.every((call) => call.auth === 'Bearer TOKEN')).toBe(true)
    expect(calls[3].body).toEqual({
      connectorId: 'hubspot',
      name: 'HubSpot',
      auth: { type: 'bearer', token: 'pat-1' },
      mode: 'scheduled',
      scheduleMinutes: 60,
      streams: [{ stream: 'contacts', policy: { mode: 'auto', exclude: ['phone'] } }]
    })
    expect(calls[4].body).toEqual({ scheduleMinutes: 30 })
    expect(calls[8].body).toEqual({ stream: 'contacts', limit: 5 })
    expect(calls[9].body).toEqual({ streams: ['contacts'], full: true })
    // Writes without parameters still send a JSON body.
    expect(calls[10].body).toEqual({})
    expect(calls[7].body).toEqual({})
    expect(calls[16].body).toEqual({ stream: 'contacts', limit: 100 })
    expect(calls[17].body).toEqual({ stream: 'deals' })
  })

  it('saves a field review as an allowlist policy', async () => {
    const { db, calls } = client()
    await db.connections.reviewFields('conn-1', 'contacts', [
      { name: 'company', action: 'include' },
      { name: 'email', action: 'hash' },
      { name: 'phone', action: 'exclude' },
      { name: 'title', action: 'include' }
    ])
    expect(calls).toHaveLength(1)
    expect(`${calls[0].method} ${calls[0].path}`).toBe('PATCH /connections/conn-1')
    expect(calls[0].body).toEqual({
      streams: [
        {
          stream: 'contacts',
          policy: { mode: 'allowlist', include: ['company', 'title'], exclude: ['phone'], hash: ['email'] }
        }
      ]
    })
  })

  it('creates an agent connection', async () => {
    const { db, calls } = client()
    await db.connections.create({ connectorId: 'agent', name: 'Warehouse', agent: { intervalMinutes: 15 } })
    await db.connections.rotateWebhookToken('agent-1')
    expect(calls.map((call) => `${call.method} ${call.path}`)).toEqual([
      'POST /connections',
      'POST /connections/agent-1/webhook-token'
    ])
    expect(calls[0].body).toEqual({ connectorId: 'agent', name: 'Warehouse', agent: { intervalMinutes: 15 } })
  })

  it('returns the response envelope', async () => {
    const { db } = client()
    const response = await db.connections.test('conn-1')
    expect(response).toMatchObject({ success: true, data: { ok: true } })
  })
})
