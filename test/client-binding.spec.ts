/**
 * Several clients in one process: every Transaction, record instance, result
 * set and Model operation is sent through the client that owns it, never
 * through whichever client happened to be created last.
 */
import { describe, it, expect, beforeEach } from 'vitest'

import type { HttpClientInterface, HttpClientResponseInterface } from '../src/network/HttpClient.js'
import { Model } from '../src/sdk/model.js'
import { DBRecordInstance } from '../src/sdk/record.js'
import { RushDB } from '../src/sdk/sdk.js'
import { Transaction } from '../src/sdk/transaction.js'

const RECORD_ID = '0190a7e2-0000-7000-8000-000000000001'
const OTHER_ID = '0190a7e2-0000-7000-8000-000000000002'

type Call = { method: string; path: string; tx?: string }

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
function fakeBackend(name: string) {
  const calls: Call[] = []
  const httpClient: HttpClientInterface = {
    makeRequest: async (url, config) => {
      const path = url.replace(`https://${name}.test/api/v1`, '')
      const headers = (config.headers ?? {}) as Record<string, string>
      calls.push({ method: String(config.method), path, tx: headers['x-transaction-id'] })
      if (path === '/tx' || /^\/tx\/[^/]+$/.test(path))
        return fakeResponse({ success: true, data: { id: path.split('/')[2] ?? `${name}-tx` } })
      if (path.endsWith('/search') || path.startsWith('/records/sql-search')) {
        return fakeResponse({
          success: true,
          total: 2,
          data: [{ __id: RECORD_ID, __label: 'Book', title: 'Dune' }]
        })
      }
      return fakeResponse({ success: true, data: { __id: RECORD_ID, __label: 'Book', title: 'Dune' } })
    }
  }
  const client = new RushDB(`${name}-token`, { url: `https://${name}.test/api/v1`, httpClient })
  return { client, calls }
}

let a: ReturnType<typeof fakeBackend>
let b: ReturnType<typeof fakeBackend>

beforeEach(() => {
  a = fakeBackend('a')
  // Created last: the client `RushDB.getInstance()` returns.
  b = fakeBackend('b')
})

const paths = (calls: Call[]) => calls.map((call) => `${call.method} ${call.path}`)

describe('transactions', () => {
  it('commit() goes to the client that began the transaction', async () => {
    const tx = await a.client.tx.begin()
    await tx.commit()

    expect(paths(a.calls)).toEqual(['POST /tx', 'POST /tx/a-tx/commit'])
    expect(b.calls).toEqual([])
  })

  it('rollback() goes to the client that began the transaction', async () => {
    const tx = await a.client.tx.begin()
    await tx.rollback()

    expect(paths(a.calls)).toEqual(['POST /tx', 'POST /tx/a-tx/rollback'])
    expect(b.calls).toEqual([])
  })

  it('a transaction from tx.get() is bound to its client', async () => {
    const tx = await a.client.tx.get('a-tx')
    await tx.commit()

    expect(paths(a.calls)).toEqual(['GET /tx/a-tx', 'POST /tx/a-tx/commit'])
    expect(b.calls).toEqual([])
  })

  it('an unbound transaction falls back to the most recently created client', async () => {
    await new Transaction('loose-tx').commit()

    expect(paths(b.calls)).toEqual(['POST /tx/loose-tx/commit'])
    expect(a.calls).toEqual([])
  })

  it('keeps the client out of the serialized transaction', async () => {
    const tx = await a.client.tx.begin()
    expect(JSON.parse(JSON.stringify(tx))).toEqual({ id: 'a-tx' })
  })
})

describe('record instances', () => {
  it('update, set, attach, detach and delete go to the client that read the record', async () => {
    const record = await a.client.records.findById(RECORD_ID)
    a.calls.length = 0

    await record.update({ title: 'Dune Messiah' })
    await record.set({ title: 'Dune' })
    await record.attach(OTHER_ID)
    await record.detach(OTHER_ID)
    await record.delete()

    expect(paths(a.calls)).toEqual([
      `PATCH /records/${RECORD_ID}`,
      `PUT /records/${RECORD_ID}`,
      `POST /relationships/${RECORD_ID}`,
      `PUT /relationships/${RECORD_ID}`,
      `DELETE /records/${RECORD_ID}`
    ])
    expect(b.calls).toEqual([])
  })

  it('records created on a client are bound to it', async () => {
    const record = await a.client.records.create({ label: 'Book', data: { title: 'Dune' } })
    await record.delete()

    expect(paths(a.calls)).toEqual(['POST /records', `DELETE /records/${RECORD_ID}`])
    expect(b.calls).toEqual([])
  })

  it('toDBRecordInstance() binds to the client it is called on', async () => {
    await a.client.toDBRecordInstance({ __id: RECORD_ID, __label: 'Book' }).delete()

    expect(paths(a.calls)).toEqual([`DELETE /records/${RECORD_ID}`])
    expect(b.calls).toEqual([])
  })

  it('a record instance built without a client falls back to the most recently created client', async () => {
    await new DBRecordInstance({ __id: RECORD_ID, __label: 'Book' }).delete()

    expect(paths(b.calls)).toEqual([`DELETE /records/${RECORD_ID}`])
    expect(a.calls).toEqual([])
  })

  it('keeps the client out of the serialized record', async () => {
    const record = await a.client.records.findById(RECORD_ID)
    expect(Object.keys(JSON.parse(JSON.stringify(record)))).toEqual(['data'])
  })
})

describe('result sets', () => {
  it('deleteAll, setProperties and next go to the client that ran the query', async () => {
    const result = await a.client.records.find({ labels: ['Book'], limit: 1 })
    await result.deleteAll()
    await result.setProperties({ read: true })
    await result.next()

    expect(paths(a.calls)).toEqual([
      'POST /records/search',
      'POST /records/delete',
      `PATCH /records/${RECORD_ID}`,
      'POST /records/search'
    ])
    expect(b.calls).toEqual([])
  })

  it('every record of a result set is bound to the client that ran the query', async () => {
    const result = await a.client.records.find({ labels: ['Book'] })
    await result.data[0].delete()

    expect(paths(a.calls)).toEqual(['POST /records/search', `DELETE /records/${RECORD_ID}`])
    expect(b.calls).toEqual([])
  })

  it('next() of a SQL result goes to the client that ran the statement', async () => {
    const result = await a.client.ai.runSql('SELECT __id FROM "Book"', { limit: 1 })
    await result.next()

    expect(paths(a.calls)).toEqual(['POST /records/sql-search', 'POST /records/sql-search'])
    expect(b.calls).toEqual([])
  })
})

describe('models', () => {
  const schema = { title: { type: 'string' as const, unique: true } }

  it('a model with a client sends every operation through it', async () => {
    const Book = new Model('Book', schema, { client: a.client })
    await Book.find()
    await Book.deleteById(RECORD_ID)
    // A unique field makes create() open, use and commit its own transaction.
    await Book.create({ title: 'Ubik' }, undefined, { onConflict: 'skip' })

    expect(paths(a.calls)).toEqual([
      'POST /records/search',
      `DELETE /records/${RECORD_ID}`,
      'POST /tx',
      'POST /records/search',
      'POST /tx/a-tx/commit'
    ])
    expect(b.calls).toEqual([])
  })

  it('a model without a client uses the client of the transaction it is given', async () => {
    const Book = new Model('Book', { title: { type: 'string' as const } })
    const tx = await a.client.tx.begin()
    await Book.find({}, tx)
    await Book.createMany([{ title: 'Ubik' }], tx)
    await tx.commit()

    expect(paths(a.calls)).toEqual([
      'POST /tx',
      'POST /records/search',
      'POST /records/import/json',
      'POST /tx/a-tx/commit'
    ])
    expect(a.calls.slice(1).every((call) => call.tx === 'a-tx' || call.path.endsWith('/commit'))).toBe(true)
    expect(b.calls).toEqual([])
  })

  it('records a model returns are bound to the model client', async () => {
    const Book = new Model('Book', schema, { client: a.client })
    const book = await Book.findById(RECORD_ID)
    await book.delete()
    await (await Book.toDBRecordInstance({ __id: RECORD_ID, __label: 'Book' } as any)).delete()

    expect(paths(a.calls)).toEqual([
      'POST /records/search',
      `DELETE /records/${RECORD_ID}`,
      `DELETE /records/${RECORD_ID}`
    ])
    expect(b.calls).toEqual([])
  })

  it('a model without a client or transaction uses the most recently created client', async () => {
    await new Model('Book', schema).find()

    expect(paths(b.calls)).toEqual(['POST /records/search'])
    expect(a.calls).toEqual([])
  })
})
