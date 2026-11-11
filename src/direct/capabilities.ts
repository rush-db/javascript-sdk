/**
 * What RushDB Cloud adds over a standalone engine, as SDK methods. One list:
 * the direct-mode router refuses these with `CloudOnlyError`, the MCP server
 * hides the tools built on them, and the docs mark them.
 *
 * Everything else the SDK offers runs against a standalone `rushdb` too.
 */
export const CLOUD_ONLY_METHODS = {
  'ai.search': 'natural-language search turns the prompt into a SQL statement with an LLM',
  'ai.runSql': 'Smart search SQL runs on the platform, which loads the full records the statement selects',
  'ai.getJoinCandidates':
    'join suggestions are computed by the platform (its heuristics over the engine\'s value overlap)',
  'relationships.patterns.list': 'relationship-pattern suggestions are produced and stored by the platform',
  'relationships.patterns.analyze': 'relationship-pattern suggestions are produced and stored by the platform',
  'relationships.patterns.approve': 'relationship-pattern suggestions are produced and stored by the platform',
  'relationships.patterns.ignore': 'relationship-pattern suggestions are produced and stored by the platform',
  'relationships.patterns.delete': 'relationship-pattern suggestions are produced and stored by the platform',
  'settings.get': 'project settings belong to the platform',
  'imports.create': 'file imports run on the platform',
  'imports.addFiles': 'file imports run on the platform',
  'imports.removeFile': 'file imports run on the platform',
  'imports.upload': 'file imports run on the platform',
  'imports.preview': 'file imports run on the platform',
  'imports.start': 'file imports run on the platform',
  'imports.get': 'file imports run on the platform',
  'imports.list': 'file imports run on the platform',
  'imports.cancel': 'file imports run on the platform',
  'imports.retry': 'file imports run on the platform',
  'imports.delete': 'file imports run on the platform',
  'imports.wait': 'file imports run on the platform',
  'imports.importFiles': 'file imports run on the platform',
  'connections.catalog': 'connections and their syncs run on the platform',
  'connections.list': 'connections and their syncs run on the platform',
  'connections.pushTemplates': 'connections and their syncs run on the platform',
  'connections.get': 'connections and their syncs run on the platform',
  'connections.create': 'connections and their syncs run on the platform',
  'connections.update': 'connections and their syncs run on the platform',
  'connections.delete': 'connections and their syncs run on the platform',
  'connections.test': 'connections and their syncs run on the platform',
  'connections.preview': 'connections and their syncs run on the platform',
  'connections.fields': 'connections and their syncs run on the platform',
  'connections.reviewFields': 'connections and their syncs run on the platform',
  'connections.sync': 'connections and their syncs run on the platform',
  'connections.runs': 'connections and their syncs run on the platform',
  'connections.pause': 'connections and their syncs run on the platform',
  'connections.resume': 'connections and their syncs run on the platform',
  'connections.rotateWebhookToken': 'connections and their syncs run on the platform'
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
