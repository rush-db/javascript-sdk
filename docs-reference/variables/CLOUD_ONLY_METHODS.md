[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CLOUD\_ONLY\_METHODS

# Variable: CLOUD\_ONLY\_METHODS

> `const` **CLOUD\_ONLY\_METHODS**: `object`

Defined in: [direct/capabilities.ts:8](https://github.com/rush-db/javascript-sdk/blob/main/src/direct/capabilities.ts#L8)

What RushDB Cloud adds over a standalone engine, as SDK methods. One list:
the direct-mode router refuses these with `CloudOnlyError`, the MCP server
hides the tools built on them, and the docs mark them.

Everything else the SDK offers runs against a standalone `rushdb` too.

## Type Declaration

#### ai.getJoinCandidates

> `readonly` **ai.getJoinCandidates**: `"join suggestions are computed by the platform (its heuristics over the engine's value overlap)"` = 'join suggestions are computed by the platform (its heuristics over the engine\'s value overlap)'

#### ai.runSql

> `readonly` **ai.runSql**: `"Smart search SQL runs on the platform, which loads the full records the statement selects"` = `'Smart search SQL runs on the platform, which loads the full records the statement selects'`

#### ai.search

> `readonly` **ai.search**: `"natural-language search turns the prompt into a SQL statement with an LLM"` = `'natural-language search turns the prompt into a SQL statement with an LLM'`

#### connections.catalog

> `readonly` **connections.catalog**: `"connections and their syncs run on the platform"` = `'connections and their syncs run on the platform'`

#### connections.create

> `readonly` **connections.create**: `"connections and their syncs run on the platform"` = `'connections and their syncs run on the platform'`

#### connections.delete

> `readonly` **connections.delete**: `"connections and their syncs run on the platform"` = `'connections and their syncs run on the platform'`

#### connections.fields

> `readonly` **connections.fields**: `"connections and their syncs run on the platform"` = `'connections and their syncs run on the platform'`

#### connections.get

> `readonly` **connections.get**: `"connections and their syncs run on the platform"` = `'connections and their syncs run on the platform'`

#### connections.list

> `readonly` **connections.list**: `"connections and their syncs run on the platform"` = `'connections and their syncs run on the platform'`

#### connections.pause

> `readonly` **connections.pause**: `"connections and their syncs run on the platform"` = `'connections and their syncs run on the platform'`

#### connections.preview

> `readonly` **connections.preview**: `"connections and their syncs run on the platform"` = `'connections and their syncs run on the platform'`

#### connections.pushTemplates

> `readonly` **connections.pushTemplates**: `"connections and their syncs run on the platform"` = `'connections and their syncs run on the platform'`

#### connections.resume

> `readonly` **connections.resume**: `"connections and their syncs run on the platform"` = `'connections and their syncs run on the platform'`

#### connections.reviewFields

> `readonly` **connections.reviewFields**: `"connections and their syncs run on the platform"` = `'connections and their syncs run on the platform'`

#### connections.rotateWebhookToken

> `readonly` **connections.rotateWebhookToken**: `"connections and their syncs run on the platform"` = `'connections and their syncs run on the platform'`

#### connections.runs

> `readonly` **connections.runs**: `"connections and their syncs run on the platform"` = `'connections and their syncs run on the platform'`

#### connections.sync

> `readonly` **connections.sync**: `"connections and their syncs run on the platform"` = `'connections and their syncs run on the platform'`

#### connections.test

> `readonly` **connections.test**: `"connections and their syncs run on the platform"` = `'connections and their syncs run on the platform'`

#### connections.update

> `readonly` **connections.update**: `"connections and their syncs run on the platform"` = `'connections and their syncs run on the platform'`

#### imports.addFiles

> `readonly` **imports.addFiles**: `"file imports run on the platform"` = `'file imports run on the platform'`

#### imports.cancel

> `readonly` **imports.cancel**: `"file imports run on the platform"` = `'file imports run on the platform'`

#### imports.create

> `readonly` **imports.create**: `"file imports run on the platform"` = `'file imports run on the platform'`

#### imports.delete

> `readonly` **imports.delete**: `"file imports run on the platform"` = `'file imports run on the platform'`

#### imports.get

> `readonly` **imports.get**: `"file imports run on the platform"` = `'file imports run on the platform'`

#### imports.importFiles

> `readonly` **imports.importFiles**: `"file imports run on the platform"` = `'file imports run on the platform'`

#### imports.list

> `readonly` **imports.list**: `"file imports run on the platform"` = `'file imports run on the platform'`

#### imports.preview

> `readonly` **imports.preview**: `"file imports run on the platform"` = `'file imports run on the platform'`

#### imports.removeFile

> `readonly` **imports.removeFile**: `"file imports run on the platform"` = `'file imports run on the platform'`

#### imports.retry

> `readonly` **imports.retry**: `"file imports run on the platform"` = `'file imports run on the platform'`

#### imports.start

> `readonly` **imports.start**: `"file imports run on the platform"` = `'file imports run on the platform'`

#### imports.upload

> `readonly` **imports.upload**: `"file imports run on the platform"` = `'file imports run on the platform'`

#### imports.wait

> `readonly` **imports.wait**: `"file imports run on the platform"` = `'file imports run on the platform'`

#### relationships.patterns.analyze

> `readonly` **relationships.patterns.analyze**: `"relationship-pattern suggestions are produced and stored by the platform"` = `'relationship-pattern suggestions are produced and stored by the platform'`

#### relationships.patterns.approve

> `readonly` **relationships.patterns.approve**: `"relationship-pattern suggestions are produced and stored by the platform"` = `'relationship-pattern suggestions are produced and stored by the platform'`

#### relationships.patterns.delete

> `readonly` **relationships.patterns.delete**: `"relationship-pattern suggestions are produced and stored by the platform"` = `'relationship-pattern suggestions are produced and stored by the platform'`

#### relationships.patterns.ignore

> `readonly` **relationships.patterns.ignore**: `"relationship-pattern suggestions are produced and stored by the platform"` = `'relationship-pattern suggestions are produced and stored by the platform'`

#### relationships.patterns.list

> `readonly` **relationships.patterns.list**: `"relationship-pattern suggestions are produced and stored by the platform"` = `'relationship-pattern suggestions are produced and stored by the platform'`

#### settings.get

> `readonly` **settings.get**: `"project settings belong to the platform"` = `'project settings belong to the platform'`
