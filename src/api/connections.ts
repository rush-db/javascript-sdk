import type { RestAPI } from './api.js'
import type {
  CatalogConnector,
  Connection,
  ConnectionFieldsParams,
  ConnectionFieldsReview,
  ConnectionPreview,
  ConnectionTestResult,
  ConnectionWebhookToken,
  CreateConnectionParams,
  CreatedConnection,
  DeleteConnectionOptions,
  DeletedConnection,
  FieldChoice,
  ImportRun,
  PushTemplate,
  SyncConnectionParams,
  UpdateConnectionParams
} from './ingest-types.js'

import { CloudOnlyError } from '../sdk/errors.js'
import { ingestRequest } from './imports.js'

const CLOUD_ONLY_REASON = 'connections and their syncs run on the platform'

const id = encodeURIComponent

/**
 * `db.connections`: the project's connections to SaaS tools (CRM, billing,
 * support, issue trackers, docs, spreadsheets), custom APIs and webhooks.
 * Every sync is an import run (`db.imports.get(runId)` / `db.imports.wait`).
 * **RushDB Cloud only.**
 */
export function createConnectionsApi(api: RestAPI) {
  const guard = (method: string) => {
    if (api.direct) {
      throw new CloudOnlyError(`connections.${method}`, CLOUD_ONLY_REASON)
    }
  }

  return {
    /** Built-in connectors and the workspace's own, with their streams, auth types and config fields. */
    catalog: async () => {
      guard('catalog')
      return ingestRequest<CatalogConnector[]>(api, 'GET', '/connections/catalog')
    },

    /** Zapier, Make and n8n recipes for pushing records into a webhook (push) connection. */
    pushTemplates: async () => {
      guard('pushTemplates')
      return ingestRequest<PushTemplate[]>(api, 'GET', '/connections/push-templates')
    },

    /** The project's connections with their streams, status and last sync. */
    list: async () => {
      guard('list')
      return ingestRequest<Connection[]>(api, 'GET', '/connections')
    },

    get: async (connectionId: string) => {
      guard('get')
      return ingestRequest<Connection>(api, 'GET', `/connections/${id(connectionId)}`)
    },

    /**
     * Creates a connection. Credentials are sealed server-side and never
     * returned; a push or trigger connection's `webhookToken` and an agent
     * connection's (`connectorId: 'agent'`) `agentToken` are returned once.
     */
    create: async (params: CreateConnectionParams) => {
      guard('create')
      return ingestRequest<CreatedConnection>(api, 'POST', '/connections', params)
    },

    /** Changes name, credentials, mode, schedule or stream settings (labels, delete mode, field policy). */
    update: async (connectionId: string, params: UpdateConnectionParams) => {
      guard('update')
      return ingestRequest<Connection>(api, 'PATCH', `/connections/${id(connectionId)}`, params)
    },

    /** Deletes a connection; `deleteData: true` also deletes the records it wrote. */
    delete: async (connectionId: string, options: DeleteConnectionOptions = {}) => {
      guard('delete')
      const query = options.deleteData ? '?deleteData=true' : ''
      return ingestRequest<DeletedConnection>(api, 'DELETE', `/connections/${id(connectionId)}${query}`)
    },

    /** Checks the credentials against the provider. */
    test: async (connectionId: string) => {
      guard('test')
      return ingestRequest<ConnectionTestResult>(api, 'POST', `/connections/${id(connectionId)}/test`)
    },

    /** The first records of a stream as they would be written (up to 50). Writes nothing. */
    preview: async (connectionId: string, stream: string, options: { limit?: number } = {}) => {
      guard('preview')
      return ingestRequest<ConnectionPreview>(api, 'POST', `/connections/${id(connectionId)}/preview`, {
        stream,
        ...(options.limit === undefined ? {} : { limit: options.limit })
      })
    },

    /**
     * The field review of one stream: sampled field profiles with personal-data
     * findings (values of fields that look personal are masked), the stream's
     * current policy and the fields held back since the last review. Writes nothing.
     */
    fields: async (connectionId: string, params: ConnectionFieldsParams) => {
      guard('fields')
      return ingestRequest<ConnectionFieldsReview>(api, 'POST', `/connections/${id(connectionId)}/fields`, {
        stream: params.stream,
        ...(params.limit === undefined ? {} : { limit: params.limit })
      })
    },

    /**
     * Saves a field review: the stream switches to an allowlist of the fields
     * marked `include` or `hash` (hashed ones are kept as a keyed hash);
     * `exclude`d fields are left out, and new fields wait for the next review.
     */
    reviewFields: async (connectionId: string, stream: string, choices: FieldChoice[]) => {
      guard('reviewFields')
      const pick = (action: FieldChoice['action']) =>
        choices.filter((choice) => choice.action === action).map((choice) => choice.name)
      return ingestRequest<Connection>(api, 'PATCH', `/connections/${id(connectionId)}`, {
        streams: [
          {
            stream,
            policy: { mode: 'allowlist', include: pick('include'), exclude: pick('exclude'), hash: pick('hash') }
          }
        ]
      })
    },

    /**
     * Syncs now: every enabled stream, or the `streams` named; `full` ignores
     * stored cursors and reads everything again. Returns the queued run.
     */
    sync: async (connectionId: string, params: SyncConnectionParams = {}) => {
      guard('sync')
      return ingestRequest<ImportRun>(api, 'POST', `/connections/${id(connectionId)}/runs`, params)
    },

    /** The connection's sync runs, newest first: `{ data, total }`. */
    runs: async (connectionId: string, options: { limit?: number; skip?: number } = {}) => {
      guard('runs')
      const params = [
        options.limit === undefined ? '' : `limit=${options.limit}`,
        options.skip === undefined ? '' : `skip=${options.skip}`
      ]
        .filter(Boolean)
        .join('&')
      return ingestRequest<ImportRun[]>(
        api,
        'GET',
        `/connections/${id(connectionId)}/runs${params ? `?${params}` : ''}`
      )
    },

    /** Stops scheduled and webhook-triggered syncs until resumed. */
    pause: async (connectionId: string) => {
      guard('pause')
      return ingestRequest<Connection>(api, 'POST', `/connections/${id(connectionId)}/pause`)
    },

    resume: async (connectionId: string) => {
      guard('resume')
      return ingestRequest<Connection>(api, 'POST', `/connections/${id(connectionId)}/resume`)
    },

    /**
     * A new token, shown once; the previous one stops working. Trigger and push
     * connections get a new webhook URL, agent connections a new agent token.
     */
    rotateWebhookToken: async (connectionId: string) => {
      guard('rotateWebhookToken')
      return ingestRequest<ConnectionWebhookToken>(api, 'POST', `/connections/${id(connectionId)}/webhook-token`)
    }
  }
}

export type ConnectionsApi = ReturnType<typeof createConnectionsApi>
