/**
 * RushDB 3.0.14 features against a real standalone engine, in direct mode.
 * Runs only when `RUSHDB_TEST_ENGINE_URL` (and `RUSHDB_TEST_ENGINE_TOKEN`,
 * default `local-token`) point at a single-tenant `rushdb`. Against an engine
 * that does not advertise a feature in `describe.capabilities` (3.0.13), it
 * checks that the SDK refuses the feature cleanly and that everything else
 * keeps working.
 *
 * `RUSHDB_TEST_ASSUME_CAPABILITIES` (comma-separated flags) adds flags to what
 * the engine advertises, for a pre-release build that has a feature before it
 * advertises it.
 */
import { describe, it, expect, beforeAll, vi } from 'vitest'

import { DirectEngine } from '../src/direct/engine.js'
import { NodeHttpClient } from '../src/network/NodeHttpClient.js'
import { CatalogCheckError, DirectModeError, UniqueConstraintError } from '../src/sdk/errors.js'
import RushDB from '../src/index.node.js'

const engineUrl = process.env.RUSHDB_TEST_ENGINE_URL
const token = process.env.RUSHDB_TEST_ENGINE_TOKEN ?? 'local-token'
const run = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
const EVENT = `Event${run}`
const CAFE = `Cafe${run}`
const USER = `User${run}`
const NOTE = `Note${run}`
const ROW = `Row${run}`

const BERLIN = { type: 'Point' as const, coordinates: [13.405, 52.52] as [number, number] }
const POTSDAM = { type: 'Point' as const, coordinates: [13.064, 52.391] as [number, number] }
const HAMBURG = { type: 'Point' as const, coordinates: [9.993, 53.551] as [number, number] }

describe.skipIf(!engineUrl)('RushDB 3.0.14 features against a standalone engine', () => {
  let db: RushDB
  let flags: Set<string>
  const has = (flag: string) => flags.has(flag)

  beforeAll(async () => {
    const assumed = (process.env.RUSHDB_TEST_ASSUME_CAPABILITIES ?? '').split(',').filter(Boolean)
    if (assumed.length) {
      const advertised = DirectEngine.prototype.capabilities
      vi.spyOn(DirectEngine.prototype, 'capabilities').mockImplementation(async function (this: DirectEngine) {
        return new Set([...(await advertised.call(this)), ...assumed])
      })
    }
    db = new RushDB(token, { direct: true, engineUrl })
    flags = await new DirectEngine({ engineUrl: engineUrl!, token, httpClient: new NodeHttpClient() }).capabilities()
  })

  it('round-trips temporal values in their own types', async () => {
    const created = await db.records.create({
      label: EVENT,
      data: {
        at: '2024-05-01T12:30:00.25+02:00',
        day: '2024-05-01',
        opens: '10:30:00',
        local: '2024-05-01T10:30:00',
        lasts: 'P1DT2H'
      }
    })
    const read = (await db.records.findById(created.id)).data as Record<string, any>
    if (has('typedTemporalValues')) {
      // A datetime keeps its offset and its fraction.
      expect(read.at).toBe('2024-05-01T12:30:00.25+02:00')
      expect(read.day).toBe('2024-05-01')
      expect(read.opens).toBe('10:30:00')
      expect(read.local).toBe('2024-05-01T10:30:00')
      expect(read.lasts).toBe('P1DT2H')
      expect(read.__proptypes).toMatchObject({
        at: 'datetime',
        day: 'date',
        opens: 'localtime',
        local: 'localdatetime',
        lasts: 'duration'
      })
      // Equality compares instants, whatever the offset.
      const same = await db.records.find({ labels: [EVENT], where: { at: '2024-05-01T10:30:00.25Z' } })
      expect(same.total).toBe(1)
      const range = await db.records.find({ labels: [EVENT], where: { day: { $gte: '2024-04-30', $lt: '2024-05-02' } } })
      expect(range.total).toBe(1)
      const longer = await db.records.find({ labels: [EVENT], where: { lasts: { $gt: 'PT25H' } } })
      expect(longer.total).toBe(1)
    } else {
      // Before 3.0.14 the instant reads back in UTC and times stay strings.
      expect(new Date(read.at).toISOString()).toBe('2024-05-01T10:30:00.250Z')
      expect(read.opens).toBe('10:30:00')
    }
  })

  it('shows the new types in the direct-mode schema', async () => {
    const markdown = await db.ai.getSchemaMarkdown({ labels: [EVENT] } as any)
    const text = typeof markdown === 'string' ? markdown : (markdown as any).data
    expect(text).toContain(EVENT)
    if (has('typedTemporalValues')) {
      expect(text).toMatch(/`day` \| date \| `2024-05-01`\.\.`2024-05-01`/)
      expect(text).toMatch(/`lasts` \| duration \|/)
    }
  })

  it('filters by $within and sorts by $distance', async () => {
    if (!has('spatialFilters')) {
      return
    }
    await db.records.createMany({
      label: CAFE,
      data: [
        { name: 'Mitte', location: BERLIN },
        { name: 'Potsdam', location: POTSDAM },
        { name: 'Hamburg', location: HAMBURG }
      ]
    })
    const near = await db.records.find({
      labels: [CAFE],
      where: { location: { $within: { center: BERLIN, meters: 40000 } } },
      orderBy: { location: { $distance: BERLIN } }
    })
    expect(near.data.map((record) => record.data.name)).toEqual(['Mitte', 'Potsdam'])

    const box = await db.records.find({
      labels: [CAFE],
      where: {
        location: {
          $within: {
            box: [
              { type: 'Point', coordinates: [9, 53] },
              { type: 'Point', coordinates: [11, 54] }
            ]
          }
        }
      }
    })
    expect(box.data.map((record) => record.data.name)).toEqual(['Hamburg'])

    const nearest = await db.records.find({ labels: [CAFE], orderBy: { location: { $distance: HAMBURG } }, limit: 1 })
    expect(nearest.data[0].data.name).toBe('Hamburg')
    const stored = nearest.data[0].data as Record<string, any>
    expect(stored.location).toMatchObject({ type: 'Point', coordinates: HAMBURG.coordinates })
  })

  it('reports catalog warnings and honours context.check', async () => {
    await db.records.create({ label: USER, data: { name: 'Ada', city: 'Berlin', email: 'ada@example.com' } })
    if (!has('catalogCheck')) {
      // Without the flag the SDK never sends `check`; a pre-release build may still send warnings.
      const plain = await db.records.find({ labels: [USER], where: { city: 'berlin' } })
      expect(plain.total).toBe(0)
      await expect(
        db.records.find({ labels: [USER], where: { city: 'berlin' }, context: { check: 'strict' } })
      ).rejects.toBeInstanceOf(DirectModeError)
      return
    }
    const missed = await db.records.find({ labels: [USER], where: { city: 'berlin' } })
    expect(missed.total).toBe(0)
    expect(missed.catalogWarnings).toEqual([
      expect.objectContaining({
        kind: 'unknownValue',
        property: 'city',
        value: 'berlin',
        suggestions: expect.arrayContaining([expect.objectContaining({ value: 'Berlin', reason: 'spelling' })])
      })
    ])

    const counted = await db.records.find({
      labels: [USER],
      where: { $or: [{ city: 'berlin' }, { city: 'Paris' }] },
      select: { count: { $count: '*' } }
    } as any)
    expect(counted.catalogWarnings?.length).toBeGreaterThan(0)

    const found = await db.records.find({ labels: [USER], where: { city: 'Berlin' } })
    expect(found.catalogWarnings).toBeUndefined()

    const off = await db.records.find({ labels: [USER], where: { city: 'berlin' }, context: { check: 'off' } })
    expect(off.catalogWarnings).toBeUndefined()

    const error = await db.records
      .find({ labels: [USER], where: { city: 'berlin' }, context: { check: 'strict' } })
      .catch((e) => e)
    expect(error).toBeInstanceOf(CatalogCheckError)
    expect(error).toMatchObject({ code: 'invalid_request' })
    expect(error.warnings[0]).toMatchObject({ kind: 'unknownValue', value: 'berlin' })

    const unknownLabel = await db.records.find({ labels: [`${USER}x`] })
    expect(unknownLabel.catalogWarnings?.[0]).toMatchObject({ kind: 'unknownLabel' })
  })

  it('creates a unique index and refuses a repeated value', async () => {
    if (!has('uniqueIndexes')) {
      await expect(db.indexes.create({ label: USER, property: 'email', unique: true })).rejects.toBeInstanceOf(
        DirectModeError
      )
      return
    }
    await db.records.create({ label: USER, data: { name: 'Bob', email: 'bob@example.com' } })
    const { data: index } = await db.indexes.create({ label: USER, property: 'email', unique: true })
    expect(index).toMatchObject({ label: USER, kind: 'unique', unique: true })
    expect(index.name).toBe(`${USER}.email.unique`)

    for (let i = 0; i < 100; i++) {
      const listed = (await db.indexes.find()).data.find((candidate) => candidate.name === index.name)
      expect(listed).toMatchObject({ kind: 'unique', unique: true })
      if (listed?.status === 'ready') break
      await new Promise((resolve) => setTimeout(resolve, 50))
    }

    const error = await db.records.create({ label: USER, data: { name: 'Ada 2', email: 'ada@example.com' } }).catch((e) => e)
    expect(error).toBeInstanceOf(UniqueConstraintError)
    expect(error).toMatchObject({ status: 409, code: 'conflict', label: USER, property: 'email' })
    expect(typeof error.recordId).toBe('string')
    expect(JSON.stringify(error.details)).not.toContain('ada@example.com')

    // Another label may hold the value.
    await db.records.create({ label: `${USER}Other`, data: { email: 'ada@example.com' } })

    await db.indexes.delete(index.name)
    expect((await db.indexes.find()).data.some((candidate) => candidate.name === index.name)).toBe(false)
  })

  it('lists and drops an ordered index', async () => {
    const { data: index } = await db.indexes.create({ label: EVENT, property: 'day' })
    expect(index).toMatchObject({ kind: 'ordered', unique: false, name: `${EVENT}.day.ordered` })
    expect((await db.indexes.find()).data.some((candidate) => candidate.name === index.name)).toBe(true)
    await db.indexes.delete(index.name)
  })

  it('imports a large write in chunks', async () => {
    const rows = Array.from({ length: 1201 }, (_, n) => ({ n, group: n % 3 }))
    const created = await db.records.createMany({
      label: ROW,
      data: rows,
      chunkSize: 500,
      options: { returnResult: true }
    })
    expect(created.total).toBe(1201)
    expect(created.data[1200].data.n).toBe(1200)
    expect((await db.records.find({ labels: [ROW], limit: 1 })).total).toBe(1201)

    const csv = ['n,bio', ...Array.from({ length: 7 }, (_, n) => `${n},"line\nbreak ${n}"`)].join('\n')
    await db.records.importCsv({ label: `${ROW}Csv`, data: csv, chunkSize: 3 })
    const imported = await db.records.find({ labels: [`${ROW}Csv`], orderBy: { n: 'asc' } })
    expect(imported.total).toBe(7)
    expect(imported.data[6].data.bio).toBe('line\nbreak 6')

    const nested = Array.from({ length: 25 }, (_, n) => ({ n, author: { name: `A${n}` } }))
    await db.records.importJson({ label: `${ROW}Doc`, data: nested, chunkSize: 10 })
    expect((await db.records.find({ labels: [`${ROW}Doc`] })).total).toBe(25)
  })

  it('reads its own writes from an eventual text index with waitForPending', async () => {
    await db.records.create({ label: NOTE, data: { body: 'seed note' } })
    const { data: index } = await db.textIndexes.create({ label: NOTE, property: 'body' })
    for (let i = 0; i < 100; i++) {
      const listed = (await db.textIndexes.find()).data.find((candidate) => candidate.name === index.name)
      if (listed?.status === 'ready') break
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
    await db.records.create({ label: NOTE, data: { body: 'quarterly revenue review' } })
    const hits = await db.records.textSearch({
      query: 'revenue',
      index: index.name,
      waitForPending: { timeoutMs: 5000 }
    })
    expect(hits.textSearch?.pending).toBe(0)
    expect(hits.data.map((record) => record.data.body)).toContain('quarterly revenue review')
    await db.textIndexes.delete(index.name)
  })
})
