/**
 * Two clients on two real standalone engines in one process. Runs only when
 * `RUSHDB_TEST_ENGINE_A_URL` and `RUSHDB_TEST_ENGINE_B_URL` point at two
 * single-tenant engines (token `RUSHDB_TEST_ENGINE_TOKEN`, default
 * `local-token`). Use engines no other spec writes to while this one runs: a
 * concurrent writer can make the engine refuse the commit with
 * `transaction_conflict`. E.g.
 *
 *   docker run -d -e RUSHDB_TOKEN=local-token -p 127.0.0.1:3932:3000 rushdb/rushdb
 *   docker run -d -e RUSHDB_TOKEN=local-token -p 127.0.0.1:3933:3000 rushdb/rushdb
 *   RUSHDB_TEST_ENGINE_A_URL=http://127.0.0.1:3932 RUSHDB_TEST_ENGINE_B_URL=http://127.0.0.1:3933 pnpm test
 */
import { describe, it, expect, beforeAll } from 'vitest'

import RushDB, { Model } from '../src/index.node.js'

const engineUrlA = process.env.RUSHDB_TEST_ENGINE_A_URL
const engineUrlB = process.env.RUSHDB_TEST_ENGINE_B_URL
const token = process.env.RUSHDB_TEST_ENGINE_TOKEN ?? 'local-token'
const run = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
const NOTE = `Note${run}`

describe.skipIf(!engineUrlA || !engineUrlB)('two clients on two engines', () => {
  let a: RushDB
  let b: RushDB

  beforeAll(() => {
    a = new RushDB(token, { direct: true, engineUrl: engineUrlA })
    // Created last: the client `RushDB.getInstance()` returns.
    b = new RushDB(token, { direct: true, engineUrl: engineUrlB })
  })

  const titles = async (db: RushDB) =>
    (await db.records.find({ labels: [NOTE] })).data.map((record) => record.data.title).sort()

  it('tx.commit() commits on the engine that began the transaction', async () => {
    const tx = await a.tx.begin()
    await a.records.create({ label: NOTE, data: { title: 'committed' } }, tx)
    await tx.commit()

    expect(await titles(a)).toContain('committed')
    expect(await titles(b)).not.toContain('committed')
  })

  it('tx.rollback() rolls back on the engine that began the transaction', async () => {
    const tx = await a.tx.begin()
    await a.records.create({ label: NOTE, data: { title: 'rolled back' } }, tx)
    await tx.rollback()

    expect(await titles(a)).not.toContain('rolled back')
  })

  it('record instance methods reach the engine the record was read from', async () => {
    const record = await a.records.create({ label: NOTE, data: { title: 'draft' } })
    await record.update({ title: 'edited' })
    expect(await titles(a)).toContain('edited')

    await record.delete()
    expect(await titles(a)).not.toContain('edited')
  })

  it('a model bound to a client writes to its engine only', async () => {
    const Note = new Model(NOTE, { title: { type: 'string', unique: true } }, { client: a })
    await Note.create({ title: 'from model' })

    expect(await titles(a)).toContain('from model')
    expect(await titles(b)).toEqual([])
  })
})
