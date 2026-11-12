/**
 * Background file imports and SaaS connections (RushDB Cloud).
 *
 * Both write through import runs: an import run is created for every file
 * import and every connection sync, and continues on the server without the
 * client. Poll it with `db.imports.get(id)` or `db.imports.wait(id)`.
 */

// ── import runs ──────────────────────────────────────────────────────────────

export type ImportRunKind = 'file' | 'sync'
export type ImportRunTrigger = 'manual' | 'schedule' | 'webhook' | 'api' | 'retry' | 'once'
export type ImportRunStatus =
  | 'draft'
  | 'queued'
  | 'running'
  | 'paused_billing'
  | 'completed'
  | 'partial'
  | 'failed'
  | 'cancelled'

/** Statuses after which a run no longer changes (until it is retried). */
export const FINISHED_IMPORT_RUN_STATUSES: ReadonlyArray<ImportRunStatus> = [
  'completed',
  'partial',
  'failed',
  'cancelled'
]

/** Progress of one file or one stream of a run. */
export type ImportRunPart = {
  label?: string
  /** What the part is when it is not one label's records (a link step). */
  title?: string
  status: 'pending' | 'running' | 'done' | 'failed' | 'skipped'
  records: number
  deleted?: number
  links?: number
  bytes?: number
  totalBytes?: number
  errors?: number
  error?: string
}

export type ImportRunError = { part: string; row?: number; externalId?: string; message: string }

/** What a run found after it finished. */
export type ImportRunSummary = {
  labels: string[]
  /** Relationship suggestions pending review in the project after the run. */
  suggestions?: number
  /** Records of embedding-indexed labels that still await vectors. */
  awaitingEmbeddings?: number
  durationMs?: number
}

/** Who started a run, as the audit log records it. */
export type ImportRunActor = Record<string, unknown>

export type ImportRun = {
  id: string
  kind: ImportRunKind
  trigger: ImportRunTrigger
  status: ImportRunStatus
  name: string | null
  connectionId: string | null
  recordsWritten: number
  recordsDeleted: number
  linksCreated: number
  errorCount: number
  /** Per file (file imports) or per stream (syncs). */
  progress: Record<string, ImportRunPart>
  errorSample: ImportRunError[]
  summary: ImportRunSummary | null
  error: string | null
  startedBy: ImportRunActor | null
  startedAt: string | null
  finishedAt: string | null
  createdAt: string
  updatedAt: string
  files?: ImportFile[]
  options?: Record<string, unknown> | null
}

// ── personal data ────────────────────────────────────────────────────────────

export type PiiKind =
  | 'email'
  | 'phone'
  | 'name'
  | 'address'
  | 'birthdate'
  | 'national_id'
  | 'tax_id'
  | 'payment_card'
  | 'bank_account'
  | 'ip_address'
  | 'credentials'
  | 'compensation'
  | 'health'
  | 'location'
  | 'free_text'

/** Why a field or column looks like personal data. */
export type PiiFinding = {
  kind: PiiKind
  /** Where the suspicion comes from: the field name, or values that match a pattern. */
  source: 'name' | 'value'
  /** 0–1. */
  confidence: number
  reason: string
}

// ── file imports ─────────────────────────────────────────────────────────────

export type ImportColumnType = 'string' | 'number' | 'boolean' | 'datetime'

/** How one file maps to the graph. */
export type ImportFileMapping = {
  /** Column whose value identifies a row across imports: re-importing the file upserts. */
  keyColumn?: string
  skip?: string[]
  /** Columns kept as a keyed hash: personal data that should still join across sources, not readable. */
  hash?: string[]
  rename?: Record<string, string>
  types?: Record<string, ImportColumnType>
  /** CSV only. */
  delimiter?: string
}

/** A link between two files of one import: rows whose `sourceColumn` equals the target's `targetColumn`. */
export type ImportFileLink = {
  sourceFileId: string
  sourceColumn: string
  targetFileId: string
  targetColumn: string
  /** Relationship type, e.g. `PLACED`. */
  type: string
}

export type ImportFile = {
  id: string
  name: string
  format: string
  compression: string | null
  size: number
  status: string
  label: string
  mapping: ImportFileMapping | null
  rowsDone: number
  bytesDone: number
  errorCount: number
  error: string | null
}

/** How the client uploads one file. */
export type ImportUploadInstructions =
  | {
      mode: 's3-multipart'
      partSize: number
      /** Presigned PUT URL per part. */
      parts: Array<{ partNumber: number; url: string }>
      expiresAt: string
    }
  | {
      /** Through the API: `PUT` the raw bytes to `path` with the usual auth header. */
      mode: 'direct'
      method: 'PUT'
      path: string
    }

export type ImportFileUpload = ImportFile & { upload: ImportUploadInstructions }

/** A file announced to `imports.create`: its name (the extension picks the parser) and exact size in bytes. */
export type ImportFileInput = {
  name: string
  size: number
  /** Label of the file's records; defaults to one derived from the file name. */
  label?: string
}

export type CreateImportParams = {
  files: ImportFileInput[]
  name?: string
}

export type CreatedImport = ImportRun & { files: ImportFileUpload[] }

/** Settings of one uploaded file for `preview` and `start`. */
export type ImportFileSettings = {
  id: string
  label?: string
  mapping?: ImportFileMapping
}

export type PreviewImportParams = { files?: ImportFileSettings[] }

export type StartImportParams = {
  files?: ImportFileSettings[]
  links?: ImportFileLink[]
}

export type ImportColumnProfile = {
  name: string
  type: ImportColumnType
  samples: unknown[]
  nulls: number
  distinct: number
  /** Every sampled non-empty value is different. */
  unique: boolean
  /** Looks like personal data (by name or sampled values); its samples are masked then. */
  pii?: PiiFinding
  /** What to do with the column by default: personal data that joins (email, phone) is hashed, other personal data skipped. */
  suggestion: 'include' | 'skip' | 'hash'
}

export type ImportFilePreview = {
  fileId: string
  name: string
  label: string
  rows: number
  columns: ImportColumnProfile[]
  suggestedKey?: string
  errors: string[]
}

export type ImportLinkSuggestion = ImportFileLink & {
  /** 0–1: share of sampled source values found among the target's, or 0.5 from the names alone. */
  confidence: number
  reason: string
}

export type ImportPreview = { files: ImportFilePreview[]; links: ImportLinkSuggestion[] }

export type ListImportsParams = {
  kind?: ImportRunKind
  connectionId?: string
  /** 1–100. */
  limit?: number
  skip?: number
}

/**
 * File contents for an upload. `Blob`/`File`, `Uint8Array` (a Node `Buffer`
 * is one), `ArrayBuffer` and web `ReadableStream`s work in every runtime; any
 * async iterable of bytes, such as a Node `Readable` (`fs.createReadStream`),
 * works too. File paths are not accepted: open the file yourself.
 */
export type ImportUploadData =
  | Blob
  | ArrayBuffer
  | ArrayBufferView
  | ReadableStream<Uint8Array>
  | AsyncIterable<Uint8Array | string>

export type ImportUploadProgress = {
  fileId: string
  /** Bytes sent so far for this file. */
  loaded: number
  total: number
}

export type ImportUploadOptions = {
  /** Parts uploaded at once (`s3-multipart`). Default 4. */
  parallelism?: number
  /** Attempts per part (or per direct upload) on a network error or 5xx/429. Default 3. */
  retries?: number
  /** Per-request timeout in ms. Default 10 minutes. */
  timeout?: number
  onProgress?: (progress: ImportUploadProgress) => void
}

/** A file for `imports.importFiles`: its data, name and size (taken from a `Blob`/`File`/bytes when omitted). */
export type ImportFileSource = {
  data: ImportUploadData
  name?: string
  size?: number
  label?: string
  mapping?: ImportFileMapping
}

/** A link for `imports.importFiles`, naming files by their position in the list or their name. */
export type ImportFilesLink = Omit<ImportFileLink, 'sourceFileId' | 'targetFileId'> & {
  source: number | string
  target: number | string
}

export type ImportFilesProgress =
  | ({ phase: 'upload' } & ImportUploadProgress)
  | { phase: 'run'; run: ImportRun }

export type ImportFilesOptions = Omit<ImportUploadOptions, 'onProgress'> & {
  name?: string
  links?: ImportFilesLink[]
  /** Mappings by file name or position, in addition to `mapping` on each file. */
  mappings?: Record<string, ImportFileMapping>
  /** Wait for the run to finish (default `false`: return once it is started). */
  wait?: boolean | WaitImportOptions
  onProgress?: (progress: ImportFilesProgress) => void
}

export type WaitImportOptions = {
  /** Poll interval in ms. Default 2000. */
  intervalMs?: number
  /** Give up after this many ms (rejects). Default: no limit. */
  timeoutMs?: number
  onProgress?: (run: ImportRun) => void
}

// ── connections ──────────────────────────────────────────────────────────────

export type ConnectionMode = 'once' | 'scheduled' | 'manual' | 'webhook_trigger' | 'webhook_push' | 'agent'
export type ConnectionStatus = 'draft' | 'ready' | 'paused' | 'needs_reauth'
export type ConnectionDeleteMode = 'soft' | 'hard' | 'ignore'

/**
 * Which fields of a stream reach the graph. `auto` keeps every field except
 * what is excluded or hashed; `allowlist` keeps only reviewed fields
 * (`include`, `hash`), and new fields wait in `unreviewed`.
 */
export type FieldPolicy = {
  mode: 'auto' | 'allowlist'
  include?: string[]
  exclude?: string[]
  /** Kept as a keyed hash: joinable with the same value hashed elsewhere in the project, not readable. */
  hash?: string[]
  reviewedAt?: string
  reviewedBy?: string
}

/** One field of a stream as sampled for the field review. */
export type FieldProfile = {
  name: string
  type: 'string' | 'number' | 'boolean' | 'datetime' | 'array' | 'null'
  /** Share of sampled records that have a value. */
  coverage: number
  pii?: PiiFinding
  /** A masked example (never a raw value of a field that looks like personal data). */
  example?: string
  /** What the doctrine would do with it now. */
  suggestion: 'include' | 'exclude' | 'hash'
}

/** `connections.fields`: the field review of one stream. */
export type ConnectionFieldsReview = {
  stream: string
  label: string
  /** Records sampled (agent connections: what the agent reported). */
  sampled: number
  fields: FieldProfile[]
  policy: FieldPolicy
  unreviewed: string[]
}

export type ConnectionFieldsParams = {
  stream: string
  /** Records to sample, 1–200. */
  limit?: number
}

/** A reviewer's choice for one field, for `connections.reviewFields`. */
export type FieldChoice = { name: string; action: 'include' | 'exclude' | 'hash' }

/** What an on-prem agent (`rushdb-agent`) last reported. */
export type AgentStatus = {
  version?: string
  hostname?: string
  sources?: Array<{ type: string; streams: number }>
  lastSeenAt?: string
  lastError?: string | null
  /** Field relations the agent declared, by stream. */
  relations?: Record<string, Array<{ type: string; target: string; field: string; direction?: 'in' | 'out' }>>
}

/** How Zapier, Make or n8n push records into a webhook (push) connection. */
export type PushTemplate = {
  id: string
  name: string
  description: string
  docsUrl?: string
  /** Steps to follow in the tool, in order. `{{pushUrl}}` stands for the connection's push URL. */
  steps: string[]
  /** A body the tool can send as is. */
  samplePayload: Record<string, unknown>
  /** The tool's brand logo (`data:image/svg+xml`). */
  logo?: string
}

export type ConnectionStream = {
  stream: string
  enabled: boolean
  label: string
  deleteMode: ConnectionDeleteMode
  /** The field doctrine every batch of this stream passes through. */
  policy: FieldPolicy
  /** An allowlist a person confirmed. */
  reviewed: boolean
  /** Fields seen since the review and held back until someone reviews them. */
  unreviewed: string[]
  records: number
  lastSyncedAt: string | null
  /** Incremental position, e.g. the last modified time seen. */
  cursor: string | number | null
  description?: string
  optional?: boolean
}

export type Connection = {
  id: string
  name: string
  connectorId: string
  specId: string | null
  connectorName: string
  status: ConnectionStatus
  mode: ConnectionMode
  scheduleMinutes: number | null
  nextRunAt: string | null
  config: Record<string, unknown>
  authType: string | null
  account: string | null
  hasCredentials: boolean
  hasWebhookSecret: boolean
  /** Where the provider sends events (when the connector supports webhooks). */
  webhookUrl: string | null
  /** Custom trigger/push URL without its token (the token is shown once when rotated). */
  customWebhookUrl: string | null
  hasCustomWebhookToken: boolean
  webhookSetup: string | null
  lastRunAt: string | null
  lastSuccessAt: string | null
  lastWebhookAt: string | null
  lastError: string | null
  activeRunId: string | null
  /** Agent connections: what the agent last reported. */
  agent: AgentStatus | null
  /** The connector's brand logo (`data:image/svg+xml`), when it has one. */
  logo?: string
  streams: ConnectionStream[]
  createdAt: string
  updatedAt: string
}

export type ConnectorConfigField = {
  label: string
  type: 'string' | 'url' | 'select' | 'list'
  required: boolean
  help?: string
  placeholder?: string
  options?: Array<{ value: string; label: string }>
  default?: string
}

export type CatalogConnector = {
  id: string
  name: string
  /** e.g. `crm`, `billing`, `support`, `project-management`, `knowledge`, `spreadsheet`. */
  category: string
  description: string
  docsUrl?: string
  auth: string[]
  streams: Array<{ name: string; label: string; description?: string; optional?: boolean }>
  config?: Record<string, ConnectorConfigField>
  webhooks: boolean
  incremental: boolean
  beta: boolean
  /** RushDB (or this server) has an OAuth app for it, so "Connect with …" works. */
  oauthAvailable: boolean
  /** A workspace's own connector. */
  custom?: { specId: string; version: number; status: string; origin: string }
  /** The brand logo (`data:image/svg+xml`). */
  logo?: string
}

export type ConnectionAuth =
  | { type: 'bearer'; token: string }
  | { type: 'apiKey'; apiKey: string }
  | { type: 'basic'; username: string; password: string }
  | { type: 'none' }

export type ConnectionStreamSettings = {
  stream: string
  enabled?: boolean
  label?: string
  deleteMode?: ConnectionDeleteMode
  /** The stream's field doctrine (see `connections.fields` / `reviewFields`). */
  policy?: Pick<FieldPolicy, 'mode' | 'include' | 'exclude' | 'hash'>
}

type ConnectionFields = {
  name?: string
  config?: Record<string, string | string[]>
  auth?: ConnectionAuth
  /** A workspace's own OAuth app for this provider. */
  oauthApp?: { clientId: string; clientSecret: string }
  webhookSecret?: string
  mode?: ConnectionMode
  /** 5 minutes to 7 days. */
  scheduleMinutes?: number
  streams?: ConnectionStreamSettings[]
  /** Push connections: the label of the records the webhook receives, and the field identifying one. */
  push?: { label: string; keyField?: string }
  /** Agent connections: how often the agent runs a cycle, in minutes (1–1440). */
  agent?: { intervalMinutes?: number }
}

export type CreateConnectionParams = ConnectionFields & {
  /** A built-in connector id (see `catalog()`), `custom` (with `specId`), `webhook` (push) or `agent` (on-prem agent). */
  connectorId: string
  specId?: string
}

export type UpdateConnectionParams = ConnectionFields & {
  /** Move the connection to another approved version of its custom spec. */
  specId?: string
}

/**
 * Tokens are returned once: `webhookToken` for push and trigger connections,
 * `agentToken` (for `rushdb-agent`) for agent connections.
 */
export type CreatedConnection = { connection: Connection; webhookToken?: string; agentToken?: string }

export type ConnectionTestResult = { ok: boolean; account?: string; error?: string }

export type ConnectionPreviewRecord = {
  externalId: string
  properties: Record<string, unknown>
  links: Array<{ type: string; target: string; direction: 'out' | 'in'; externalIds: string[] }>
  deleted?: boolean
  cursor?: string | number
}

export type ConnectionPreview = { stream: string; label: string; records: ConnectionPreviewRecord[] }

export type SyncConnectionParams = {
  /** Stream names; every enabled stream when omitted. */
  streams?: string[]
  /** Ignore stored cursors and read everything again. */
  full?: boolean
}

export type DeleteConnectionOptions = {
  /** Also delete the records this connection wrote. */
  deleteData?: boolean
}

export type DeletedConnection = { deleted: true; recordsDeleted?: number }

/** The new webhook URL with its token; shown once. */
export type ConnectionWebhookToken = { token: string; url: string }
