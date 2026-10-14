/**
 * What RushDB Cloud adds over a standalone engine, as SDK methods. One list:
 * the direct-mode router refuses these with `CloudOnlyError`, the MCP server
 * hides the tools built on them, and the docs mark them.
 *
 * Everything else the SDK offers runs against a standalone `rushdbd` too.
 */
export const CLOUD_ONLY_METHODS = {
  'ai.search': 'natural-language search turns the prompt into a query with an LLM',
  'relationships.patterns.list': 'relationship-pattern suggestions are produced and stored by the platform',
  'relationships.patterns.analyze': 'relationship-pattern suggestions are produced and stored by the platform',
  'relationships.patterns.approve': 'relationship-pattern suggestions are produced and stored by the platform',
  'relationships.patterns.ignore': 'relationship-pattern suggestions are produced and stored by the platform',
  'relationships.patterns.delete': 'relationship-pattern suggestions are produced and stored by the platform',
  'settings.get': 'project settings belong to the platform'
} as const

/**
 * Methods available in direct mode in one form only; the other form needs
 * RushDB Cloud.
 */
export const CLOUD_ONLY_FORMS = {
  'records.vectorSearch':
    'a text `query` is embedded with the managed embedding model; in direct mode pass `queryVector`',
  'ai.indexes.create':
    'a managed index is filled by the managed embedding model; in direct mode create an external index (`external: true`) and supply vectors'
} as const

export type CloudOnlyMethod = keyof typeof CLOUD_ONLY_METHODS

/** Whether `method` (e.g. `relationships.patterns.list`) needs RushDB Cloud. */
export const isCloudOnlyMethod = (method: string): method is CloudOnlyMethod =>
  Object.prototype.hasOwnProperty.call(CLOUD_ONLY_METHODS, method)
