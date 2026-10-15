import type { HttpClientInterface } from '../network/HttpClient.js'

type ApiConnectionConfig =
  | {
      host?: string
      port?: number
      protocol?: string
    }
  | {
      url?: string
    }

export type State = {
  debug: boolean
  timeout: number
  token?: string
  direct?: boolean
  engineUrl?: string
  initialized: boolean
  serverSettings?: {
    selfHosted: boolean
  }
} & Partial<ApiConnectionConfig>

export type Logger = (payload: any) => void

export type SDKConfig = {
  httpClient?: HttpClientInterface
  timeout?: number
  logger?: Logger
  /**
   * Direct mode: talk to a standalone RushDB engine (`rushdb`) instead of
   * RushDB Cloud. Requires `engineUrl`; the token is the engine token. The
   * methods listed in `CLOUD_ONLY_METHODS` throw `CloudOnlyError`, and no
   * request is ever sent to RushDB Cloud.
   */
  direct?: boolean
  /** Standalone engine base URL when `direct` is enabled (e.g. `http://127.0.0.1:3000`). */
  engineUrl?: string
  /**
   * Tenant on a multitenant engine (`rushdb serve --multitenant`), sent as
   * `X-RushDB-Tenant`. Omit for a single-tenant engine.
   */
  scope?: string
  options?: {
    /**
     * @description
     * Defaults to `false`.
     * Allows using the `delete()` method without a specified criteria,
     * which results in deleting all Records in the project.
     */
    allowForceDelete?: boolean
  }
} & ApiConnectionConfig
