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

#### ai.search

> `readonly` **ai.search**: `"natural-language search turns the prompt into a query with an LLM"` = `'natural-language search turns the prompt into a query with an LLM'`

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
