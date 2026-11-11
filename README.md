<div align="center">

![RushDB Logo](https://raw.githubusercontent.com/rush-db/rushdb/main/rushdb-logo.svg)

# RushDB — JavaScript & TypeScript SDK

### RushDB — the database for AI

One database for your records, their relationships, and search over them.

[![NPM Version](https://img.shields.io/npm/v/%40rushdb%2Fjavascript-sdk)](https://www.npmjs.com/package/@rushdb/javascript-sdk)
[![NPM Downloads](https://img.shields.io/npm/dw/%40rushdb%2Fjavascript-sdk)](https://www.npmjs.com/package/@rushdb/javascript-sdk)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/%40rushdb%2Fjavascript-sdk)](https://bundlephobia.com/package/@rushdb/javascript-sdk)
[![License](https://img.shields.io/npm/l/%40rushdb%2Fjavascript-sdk)](#license)
[![Made with Node](https://img.shields.io/badge/dynamic/json?label=node&query=%24.engines%5B%22node%22%5D&url=https%3A%2F%2Fraw.githubusercontent.com%2Frush-db%2Fjavascript-sdk%2Fmain%2Fpackage.json)](https://nodejs.org)

[🌐 Website](https://rushdb.com) • [📖 Documentation](https://docs.rushdb.com) • [☁️ Cloud](https://app.rushdb.com) • [🔍 Examples](https://github.com/rush-db/examples)

</div>

---

## Why RushDB

Agents need memory. Apps need connected data. The standard answer involves multiple databases, schema design, and an embedding pipeline before you write a single useful line of business logic.

RushDB skips all of that:

- **Managed embeddings** — mark a property for indexing once; every write is auto-embedded server-side
- **Graph auto-structured** — nested JSON becomes a traversable graph; no manual edge creation
- **Semantic + graph in one query** — filter by relationships, rank by meaning, compute metrics — one call (use select/groupBy)
- **Zero schema** — push any shape; RushDB infers types and links records
- **6.9KB gzipped** — zero runtime dependencies
- **Isomorphic** — Node.js and browser

---

## Installation

```bash
npm install @rushdb/javascript-sdk
# yarn add @rushdb/javascript-sdk
# pnpm add @rushdb/javascript-sdk
```

---

## Compatibility

| Package | RushDB 3.x and RushDB Cloud | RushDB 2.x (legacy) |
|---|---|---|
| `@rushdb/javascript-sdk` | 3.x | 2.11.0: `npm i @rushdb/javascript-sdk@2` |
| `rushdb` (PyPI) | 3.x | 2.10.0: `pip install "rushdb<3"` |
| `@rushdb/mcp-server` | 3.x | 2.13.0: `npx @rushdb/mcp-server@2` |

---

## Agent memory in 3 lines

Get an API key at [app.rushdb.com](https://app.rushdb.com). Keys come in two levels: **full access** (server-side only) and **read-only** — read-only keys can't modify data, so they're safe to ship in browser code for public demos and dashboards.

```typescript
import RushDB from '@rushdb/javascript-sdk'

const db = new RushDB('RUSHDB_API_KEY')

// 1. One-time: index a property for semantic search
await db.ai.indexes.create({ label: 'MEMORY', propertyName: 'output' })

// 2. Store — no embedder needed, server handles it
await db.records.create({
  label: 'MEMORY',
  data: {
    agent_id: 'agent-42',
    session_id: 'sess-001',
    action: 'summarized',
    topic: 'Q4 results',
    output: summaryText
  }
})

// 3. Recall by meaning, scoped by graph
const memories = await db.records.vectorSearch({
  labels: ['MEMORY'],
  propertyName: 'output',
  query: 'what did we decide about Q4?',
  where: { agent_id: 'agent-42' },
  limit: 10
})
```

---

## Graph traversal

```typescript
// Push nested JSON — relationships created automatically
await db.records.importJson({
  label: 'COMPANY',
  data: {
    name: 'Acme Corp',
    DEPARTMENT: [
      {
        name: 'Engineering',
        EMPLOYEE: [
          {
            name: 'Alice',
            role: 'Staff Engineer'
          }
        ]
      }
    ]
  }
})

// Traverse the auto-created graph
const engineers = await db.records.find({
  labels: ['EMPLOYEE'],
  where: {
    role: { $contains: 'Engineer' },
    DEPARTMENT: { COMPANY: { name: 'Acme Corp' } }
  }
})

// Constrain by relationship type and direction
const authoredPosts = await db.records.find({
  labels: ['USER'],
  where: {
    POST: {
      $relation: { type: 'AUTHORED', direction: 'out' },
      title: { $contains: 'graph' }
    }
  },
  limit: 10
})

// Manage relationships explicitly
const company = await db.records.findUniq({
  labels: ['COMPANY'],
  where: { name: 'Acme Corp' }
})
await company.attach(engineers, { type: 'EMPLOYS' })
```

---

## Query API

One JSON structure works for record queries, aggregations, and vector search:

```typescript
const result = await db.records.find({
  labels: ['TRANSACTION'],
  where: {
    status: 'posted',
    amount: { $gte: 100 }
  },
  select: {
    total: { $sum: '$record.amount' }
  },
  groupBy: ['$record.category'],
  // Legacy: The aggregate clause is deprecated and should only be used for vector similarity until select supports it.
  orderBy: { amount: 'desc' },
  limit: 50
})
```

`where` is resource-local:

- `db.records.find().where` filters Records.
- `db.labels.find().where` and `db.properties.find().where` filter Records before returning matching labels/properties.
- `db.relationships.find().where` filters relationship edges. Use `source` and `target` for endpoint Record predicates.

```typescript
const relationships = await db.relationships.find({
  source: { labels: ['USER'], where: { status: 'active' } },
  target: { labels: ['ORDER'] },
  where: { type: 'ORDERED', confidence: { $gte: 0.8 } }
})
```

`db.relationships.update()` changes the properties of existing relationships: `set` writes values, `unset` removes them.
`types` marks a value whose type JSON can't carry: `{ since: 'datetime' }` stores an ISO string as a datetime.
Relationships read back with their datetime values as ISO strings and a `propertyTypes` map.
It needs RushDB 3.0.4 or newer.

```typescript
await db.relationships.update({
  source: user,
  target: order,
  type: 'ORDERED',
  set: { confidence: 0.95, reviewedAt: '2026-11-06T10:00:00.000Z' },
  unset: ['legacyCode'],
  types: { reviewedAt: 'datetime' }
})
```

---

## File imports and connections (RushDB Cloud)

Large files and SaaS data load in the background: the client hands the data over and the run
continues on the server. Every file import and every connection sync is an **import run**; follow it
with `db.imports.get(id)` or `db.imports.wait(id)` until its status is `completed`, `partial`,
`failed` or `cancelled`.

### Import files

```typescript
import { createReadStream, statSync } from 'node:fs'

// One call: create → upload every file → start (→ wait)
const run = await db.imports.importFiles(
  [
    { data: customersFile, label: 'Customer' }, // a browser File: name and size come from it
    { data: createReadStream('orders.csv.gz'), name: 'orders.csv.gz', size: statSync('orders.csv.gz').size }
  ],
  {
    mappings: { 0: { keyColumn: 'id' } }, // re-importing upserts by `id`
    links: [{ source: 1, sourceColumn: 'customer_id', target: 0, targetColumn: 'id', type: 'PLACED_BY' }],
    parallelism: 4,
    wait: { intervalMs: 2000 },
    onProgress: (p) => console.log(p.phase === 'upload' ? `${p.loaded}/${p.total}` : p.run.status)
  }
)
console.log(run.data.recordsWritten, run.data.summary)
```

Or step by step, to show a preview before starting:

```typescript
const { data: created } = await db.imports.create({ files: [{ name: 'orders.csv', size: file.size }] })
await db.imports.upload(created.id, created.files[0], file, { parallelism: 4, retries: 3 })
const { data: preview } = await db.imports.preview(created.id) // column types, suggested key and links, personal data
const columns = preview.files[0].columns // each has `suggestion` ('include' | 'skip' | 'hash') and `pii` when it looks personal
await db.imports.start(created.id, {
  files: [
    {
      id: created.files[0].id,
      mapping: {
        keyColumn: preview.files[0].suggestedKey,
        skip: columns.filter((c) => c.suggestion === 'skip').map((c) => c.name),
        hash: columns.filter((c) => c.suggestion === 'hash').map((c) => c.name) // keyed hash: joins, not readable
      }
    }
  ]
})
const { data: finished } = await db.imports.wait(created.id, { timeoutMs: 30 * 60_000 })
```

`upload` follows the upload mode the server returns: `s3-multipart` sends parts to their presigned
URLs (`parallelism` at a time, default 4; each failed part retried, `retries` default 3) and completes
with their ETags; `direct` sends the bytes through the API. Upload data can be a `Blob`/`File`,
`Uint8Array`/`Buffer`, `ArrayBuffer`, a web `ReadableStream`, or a Node `Readable`
(`fs.createReadStream`); file paths are not accepted. A stream needs its `size` up front. In the
browser the storage bucket's CORS rules must expose the `ETag` header.

Also: `imports.list({ kind, connectionId, limit, skip })`, `cancel`, `retry`, `delete`,
`addFiles`, `removeFile`.

### Connections

```typescript
const { data: catalog } = await db.connections.catalog() // connectors with their streams and config fields

const { data: created } = await db.connections.create({
  connectorId: 'hubspot',
  auth: { type: 'bearer', token: process.env.HUBSPOT_TOKEN! },
  mode: 'scheduled',
  scheduleMinutes: 60,
  streams: [{ stream: 'contacts', policy: { mode: 'auto', exclude: ['mobilephone'] } }]
})
await db.connections.test(created.connection.id)
await db.connections.preview(created.connection.id, 'contacts') // first records, nothing written

// Field review: profiles with personal-data findings (masked examples), the policy, unreviewed fields
const { data: review } = await db.connections.fields(created.connection.id, { stream: 'contacts', limit: 100 })
await db.connections.reviewFields(
  created.connection.id,
  'contacts',
  review.fields.map((field) => ({ name: field.name, action: field.suggestion })) // or your own choices
)

const { data: syncRun } = await db.connections.sync(created.connection.id) // or { streams: ['contacts'], full: true }
await db.imports.wait(syncRun.id)
```

A stream's `policy` decides which fields reach the graph: `auto` keeps everything except `exclude`
and `hash`; `reviewFields` switches it to an `allowlist` of the fields marked `include` or `hash`, and
fields that appear later wait in the stream's `unreviewed` list until the next review.

On-prem databases sync through `rushdb-agent`: create an agent connection and hand the token
(shown once) to the agent.

```typescript
const { data: agent } = await db.connections.create({ connectorId: 'agent', name: 'Warehouse', agent: { intervalMinutes: 15 } })
console.log(agent.agentToken) // connection.agent shows what the agent last reported
```

Also: `list`, `get`, `update`, `delete(id, { deleteData })`, `runs(id)`, `pause`, `resume`,
`rotateWebhookToken` (a new webhook URL, or a new agent token), `pushTemplates()` (Zapier, Make and
n8n recipes for push connections). Credentials are sealed on the server and never returned.

---

## RushDB Cloud or a self-hosted engine

The SDK works with RushDB in one of two ways:

| | RushDB Cloud | Self-hosted RushDB engine (direct mode) |
| --- | --- | --- |
| What you run | nothing: the managed service at [app.rushdb.com](https://app.rushdb.com) | one `rushdb` binary, on your own infrastructure |
| Connect with | an API key | the engine URL and the engine token |

The engine is what you can self-host. RushDB Cloud runs that engine for you and adds the dashboard,
managed embeddings and the AI features (natural-language search, relationship-pattern suggestions),
which exist only in RushDB Cloud.

```typescript
// RushDB Cloud
const cloud = new RushDB('RUSHDB_API_KEY')

// A self-hosted engine
const selfHosted = new RushDB('ENGINE_TOKEN', {
  direct: true,
  engineUrl: 'http://127.0.0.1:3000',
  scope: 'tenant-1' // only for an engine started with --multitenant
})
```

What each offers:

| Feature | Cloud | Self-hosted engine |
| --- | :---: | :---: |
| Records: create, read, update, set, upsert, delete, `find` with `where`, `orderBy`, `select`, `groupBy` | ✓ | ✓ |
| Relationships: `attach`/`detach`, `relationships.createMany`/`deleteMany`/`find`/`update` | ✓ | ✓ |
| Labels, properties, property values | ✓ | ✓ |
| Import JSON and CSV, export CSV | ✓ | ✓ |
| Text indexes and keyword search (`records.textSearch`) | ✓ | ✓ |
| External vector indexes; vector and hybrid search with a `queryVector` you supply | ✓ | ✓ |
| Raw openCypher (`query.raw`; the engine needs `--languages cypher`) | ✓ | ✓ |
| Schema (`ai.getSchema`, `ai.getSchemaMarkdown`) | ✓ | ✓ |
| Catalog lookups: `ai.searchValues` (a value across every property, also near spellings), `ai.getSchemaSummary`, `ai.resolveNames`, and value search in `properties.values` (`query`, `match`, `domainOnMiss`) | ✓ | ✓ |
| Transactions | ✓ | record creates, updates, sets, deletes by id, attaches and imports are staged; other writes refuse a transaction |
| Managed embeddings: managed indexes, `records.vectorSearch` by text `query` | ✓ | — |
| Natural-language search on SQL (`ai.search`, `ai.runSql`) | ✓ | — |
| Relationship-pattern suggestions (`relationships.patterns.*`) and join suggestions (`ai.getJoinCandidates`) | ✓ | — |
| Background file imports (`imports.*`) and SaaS connections (`connections.*`) | ✓ | — |
| Project settings (`settings.get`), dashboard, projects, team access, MCP over HTTP with OAuth | ✓ | — |

In direct mode a Cloud-only method throws `CloudOnlyError` (with `method` and `reason`) before
sending anything, and no request ever goes to RushDB Cloud. A write the engine cannot stage into a
transaction throws `DirectModeError`, also before sending anything. The list is available in code:

```typescript
import { CLOUD_ONLY_METHODS, CloudOnlyError, isCloudOnlyMethod } from '@rushdb/javascript-sdk'
```

---

## SDK configuration

```typescript
import RushDB from '@rushdb/javascript-sdk'

const db = new RushDB('RUSHDB_API_KEY', {
  // A different RushDB Cloud API endpoint (default: https://api.rushdb.com/api/v1)
  url: 'https://api.rushdb.com/api/v1',
  timeout: 30000
})
```

Key options:

- `url` — full API URL (default: `https://api.rushdb.com/api/v1`)
- `host`, `port`, `protocol` — alternative to `url`
- `timeout` — request timeout in ms (default: 10000)
- `httpClient` — custom HTTP client for advanced use
- `options.allowForceDelete` — allow deleting all records without criteria (default: false)
- `direct`, `engineUrl`, `scope` — direct mode against a standalone engine (see above)

Full config reference: [docs.rushdb.com/3.x/learn/reference/typescript/RushDB](https://docs.rushdb.com/3.x/learn/reference/typescript/RushDB/#sdkconfig-options)

---

## Documentation

[docs.rushdb.com/3.x/connect/sdks](https://docs.rushdb.com/3.x/connect/sdks/) and the [TypeScript reference](https://docs.rushdb.com/3.x/learn/reference/typescript/) — full API reference, examples, transactions, CSV import, and more.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Issues and PRs welcome.
