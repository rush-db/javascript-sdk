/**
 * Direct mode against a real standalone engine. Runs only when
 * `RUSHDB_TEST_ENGINE_URL` (and `RUSHDB_TEST_ENGINE_TOKEN`, default
 * `local-token`) point at a single-tenant `rushdb` started with
 * `--languages cypher`, e.g.
 *
 *   rushdb serve --data-dir /tmp/rushdb-test --port 3877 --languages cypher
 *   RUSHDB_TEST_ENGINE_URL=http://127.0.0.1:3877 pnpm test
 */
import { describe, it, expect, beforeAll } from 'vitest'

import { CloudOnlyError, DirectModeError } from '../src/sdk/errors.js'
import RushDB from '../src/index.node.js'

const engineUrl = process.env.RUSHDB_TEST_ENGINE_URL
const run = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
const BOOK = `Book${run}`
const AUTHOR = `Author${run}`
const TEXT_INDEX = `${BOOK}.summary.text`

describe.skipIf(!engineUrl)('direct mode against a standalone engine', () => {
  let db: RushDB

  beforeAll(async () => {
    db = new RushDB(process.env.RUSHDB_TEST_ENGINE_TOKEN ?? 'local-token', { direct: true, engineUrl })
    await db.records.createMany({
      label: BOOK,
      data: [
        { title: 'Dune', pages: 412, summary: 'desert planet spice', genre: 'sf' },
        { title: 'Emma', pages: 474, summary: 'matchmaking in a village', genre: 'novel' },
        { title: 'Foundation', pages: 255, summary: 'empire falls psychohistory', genre: 'sf' }
      ]
    })
    await db.records.createMany({ label: AUTHOR, data: [{ name: 'Herbert', wrote: 'Dune' }] })
  })

  it('creates, reads, updates, replaces and upserts records', async () => {
    const created = await db.records.create({ label: BOOK, data: { title: 'Ubik', pages: 202 } })
    expect(created.label).toBe(BOOK)
    expect((await db.records.findById(created.id)).data.title).toBe('Ubik')

    await db.records.update({ target: created, label: BOOK, data: { pages: 210 } })
    const updated = await db.records.findById(created.id)
    expect(updated.data).toMatchObject({ title: 'Ubik', pages: 210 })

    await db.records.set({ target: created, label: BOOK, data: { title: 'Ubik!' } })
    const replaced = await db.records.findById(created.id)
    expect(replaced.data.title).toBe('Ubik!')
    expect(replaced.data.pages).toBeUndefined()

    const upserted = await db.records.upsert({
      label: BOOK,
      data: { title: 'Ubik!', pages: 1 },
      options: { mergeBy: ['title'], mergeStrategy: 'append' }
    })
    expect(upserted.id).toBe(created.id)

    const both = await db.records.findById([created.id, upserted.id])
    expect(both.data.map((record) => record.id)).toContain(created.id)

    await db.records.deleteById(created.id)
    await expect(db.records.findById(created.id)).rejects.toMatchObject({ status: expect.any(Number) })
  })

  it('searches with filters, ordering, projections and grouping', async () => {
    const sf = await db.records.find({ labels: [BOOK], where: { genre: 'sf' }, orderBy: { pages: 'asc' } })
    expect(sf.data.map((record) => record.data.title)).toEqual(['Foundation', 'Dune'])
    expect(sf.total).toBe(2)

    const grouped = await db.records.find({
      labels: [BOOK],
      select: { count: { $count: '*' } },
      groupBy: ['$record.genre']
    } as any)
    expect(grouped.data.map((row: any) => row.data)).toEqual(
      expect.arrayContaining([
        { genre: 'sf', count: 2 },
        { genre: 'novel', count: 1 }
      ])
    )

    const one = await db.records.findOne({ labels: [BOOK], where: { title: 'Emma' } })
    expect(one.data.pages).toBe(474)
    const uniq = await db.records.findUniq({ labels: [BOOK], where: { title: 'Dune' } })
    expect(uniq.data.title).toBe('Dune')
  })

  it('links records and reads relationships', async () => {
    const dune = await db.records.findOne({ labels: [BOOK], where: { title: 'Dune' } })
    const herbert = await db.records.findOne({ labels: [AUTHOR], where: { name: 'Herbert' } })
    await db.records.attach({ source: herbert, target: dune, options: { type: 'WROTE' } })
    const linked = await db.relationships.find({
      where: { type: 'WROTE' },
      source: { labels: [AUTHOR] }
    } as any)
    expect(linked.total).toBe(1)
    await db.records.detach({ source: herbert, target: dune, options: { typeOrTypes: 'WROTE' } })
    expect(
      (await db.relationships.find({ where: { type: 'WROTE' }, source: { labels: [AUTHOR] } } as any)).total
    ).toBe(0)

    await db.relationships.createMany({
      source: { label: AUTHOR, key: 'wrote' },
      target: { label: BOOK, key: 'title' },
      type: 'AUTHORED'
    })
    expect(
      (await db.relationships.find({ where: { type: 'AUTHORED' }, source: { labels: [AUTHOR] } } as any))
        .total
    ).toBe(1)
    const related = await db.records.find({ id: herbert.id, labels: [BOOK] } as any)
    expect(related.data.map((record) => record.data.title)).toEqual(['Dune'])
    await db.relationships.deleteMany({
      source: { label: AUTHOR, key: 'wrote' },
      target: { label: BOOK, key: 'title' },
      type: 'AUTHORED'
    })
    expect(
      (await db.relationships.find({ where: { type: 'AUTHORED' }, source: { labels: [AUTHOR] } } as any))
        .total
    ).toBe(0)
  })

  it('describes labels, properties and the schema', async () => {
    const labels = await db.labels.find({})
    expect(labels.data[BOOK]).toBeGreaterThanOrEqual(3)

    const properties = await db.properties.find({ labels: [BOOK] })
    const pages = properties.data.find((property) => property.name === 'pages')!
    expect(pages.type).toBe('number')
    expect((await db.properties.findById(pages.id)).data.name).toBe('pages')
    const values = await db.properties.values(pages.id, { labels: [BOOK] } as any)
    expect((values.data as any).values).toEqual(expect.arrayContaining([412]))

    const schema = await db.ai.getSchema({ labels: [BOOK] })
    expect((schema.data as any[])[0]).toMatchObject({ label: BOOK })
    const markdown = await db.ai.getSchemaMarkdown({ labels: [BOOK] })
    expect(markdown.data).toContain(`## \`${BOOK}\``)
  })

  it('imports JSON and CSV and exports CSV', async () => {
    await db.records.importJson({ label: BOOK, data: [{ title: 'Neuromancer', pages: 271 }] })
    await db.records.importCsv({
      label: BOOK,
      data: 'title,pages,in print\nSolaris,204,true\n',
      options: { suggestTypes: true }
    })
    const solaris = await db.records.findOne({ labels: [BOOK], where: { title: 'Solaris' } })
    expect(solaris.data).toMatchObject({ pages: 204, in_print: true })

    const exported = await db.records.export({ labels: [BOOK], where: { title: 'Solaris' } })
    expect(exported.data.fileContent).toMatch(/^__id,__label,in_print,pages,title\r\n/)
    expect(exported.data.fileContent).toContain(`,${BOOK},true,204,Solaris`)
  })

  it('declares a text index and searches it', async () => {
    await db.textIndexes.create({ label: BOOK, property: 'summary', consistency: 'immediate' })
    expect((await db.textIndexes.find()).data.map((index) => index.name)).toContain(TEXT_INDEX)
    for (let i = 0; i < 50; i++) {
      const index = (await db.textIndexes.find()).data.find((candidate) => candidate.name === TEXT_INDEX)
      if (index?.status === 'ready') break
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    const found = await db.records.textSearch({ query: 'spice', labels: [BOOK] })
    expect(found.data.map((record) => record.data.title)).toEqual(['Dune'])
  })

  it('runs an external vector index end to end', async () => {
    const created = await db.ai.indexes.create({
      label: BOOK,
      propertyName: 'title',
      external: true,
      dimensions: 3
    })
    const name = created.data.name
    expect(name).toBe(`${BOOK}.title.external.3.cosine`)

    const dune = await db.records.findOne({ labels: [BOOK], where: { title: 'Dune' } })
    const emma = await db.records.findOne({ labels: [BOOK], where: { title: 'Emma' } })
    await db.ai.indexes.upsertVectors(name, {
      items: [
        { recordId: dune.id, vector: [1, 0, 0] },
        { recordId: emma.id, vector: [0, 1, 0] }
      ]
    })
    await db.records.create({
      label: BOOK,
      data: { title: 'Hyperion' },
      vectors: [{ propertyName: 'title', vector: [0, 0, 1] }]
    })

    const nearest = await db.records.vectorSearch({
      propertyName: 'title',
      labels: [BOOK],
      queryVector: [0, 0.1, 1],
      limit: 1
    })
    expect(nearest.data[0].data.title).toBe('Hyperion')
    expect((await db.ai.indexes.find()).data.map((index) => index.name)).toContain(name)
    expect((await db.ai.indexes.stats(name)).data).toBeDefined()
    await db.ai.indexes.delete(name)
  })

  it('runs raw openCypher', async () => {
    const result = await db.query.raw({
      query: `MATCH (b:${BOOK}) WHERE b.title = 'Dune' RETURN b.pages AS pages`
    })
    expect(result.data.records).toEqual([{ pages: 412 }])
  })

  it('stages creates, updates, deletes and links in a transaction', async () => {
    // A label with no text index: a transaction deleting a record an eventual text
    // index has not applied yet loses to the index's background commit (retryable).
    const SHELF = `Shelf${run}`
    const dune = await db.records.create({ label: SHELF, data: { title: 'Dune' } })
    const doomed = await db.records.create({ label: SHELF, data: { title: 'Doomed' } })
    const tx = await db.tx.begin()
    const staged = await db.records.create({ label: SHELF, data: { title: 'Staged' } }, tx)
    const updated = await db.records.update({ target: staged, label: SHELF, data: { pages: 1 } }, tx)
    expect(updated.data).toMatchObject({ title: 'Staged', pages: 1 })
    await db.records.attach({ source: dune, target: staged, options: { type: 'SEQUEL' } }, tx)
    await db.records.deleteById(doomed.id, tx)
    await expect(db.records.detach({ source: dune, target: staged }, tx)).rejects.toBeInstanceOf(
      DirectModeError
    )
    expect((await db.records.find({ labels: [SHELF], where: { title: 'Staged' } })).total).toBe(0)
    await db.tx.commit(tx)
    expect((await db.records.findById(staged.id)).data).toMatchObject({ title: 'Staged', pages: 1 })
    expect((await db.records.find({ labels: [SHELF], where: { title: 'Doomed' } })).total).toBe(0)
    const sequels = { where: { type: 'SEQUEL' }, source: { labels: [SHELF] } }
    expect((await db.relationships.find(sequels)).total).toBe(1)
    await db.records.detach({ source: dune, target: staged })
    expect((await db.relationships.find(sequels)).total).toBe(0)

    const rolledBack = await db.tx.begin()
    await db.records.create({ label: BOOK, data: { title: 'Gone' } }, rolledBack)
    await db.tx.rollback(rolledBack)
    expect((await db.records.find({ labels: [BOOK], where: { title: 'Gone' } })).total).toBe(0)
  })

  it('refuses the Cloud features before sending anything', async () => {
    await expect(db.ai.search('books about deserts')).rejects.toBeInstanceOf(CloudOnlyError)
    await expect(db.relationships.patterns.list()).rejects.toBeInstanceOf(CloudOnlyError)
    await expect(
      db.records.vectorSearch({ propertyName: 'title', labels: [BOOK], query: 'deserts' })
    ).rejects.toBeInstanceOf(CloudOnlyError)
  })

  it('deletes by query and deletes properties', async () => {
    const pages = (await db.properties.find({ labels: [BOOK] })).data.find(
      (property) => property.name === 'genre'
    )!
    await db.properties.delete(pages.id)
    expect(
      (await db.properties.find({ labels: [BOOK] })).data.map((property) => property.name)
    ).not.toContain('genre')

    await db.records.delete({ labels: [BOOK, AUTHOR], where: {} } as any).catch(() => undefined)
    await db.records.delete({ labels: [BOOK], where: { pages: { $gte: 0 } } })
    expect((await db.records.find({ labels: [BOOK], where: { pages: { $gte: 0 } } })).total).toBe(0)
  })
})
