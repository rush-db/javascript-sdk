import type { HttpClient } from '../network/HttpClient.js'
import { readJsonBody, responseError } from '../network/errors.js'

/**
 * Protocol operation envelope (v1) sent to `POST /protocol/v1/execute`.
 */
export type ProtocolEnvelope = {
  protocolVersion: 1
  context?: { scope?: string; check?: string }
  operation: Record<string, any>
}

export type ProtocolResponse = {
  response: { kind: string; [key: string]: any }
  /** Catalog check findings (RushDB 3.0.14 and later); absent when nothing is missing. */
  warnings?: Array<Record<string, any>>
  /** A protocol error, or a bare string on an auth failure (`{"error":"unauthorized"}`). */
  error?: { code: string; message: string; retryable?: boolean } | string
}

/**
 * Direct engine transport: executes protocol operations against a standalone
 * `rushdb` (`/protocol/v1/execute`) over HTTP. This is the SDK's "direct
 * mode" — no RushDB Cloud. `scope` is the tenant on a multitenant engine
 * (`X-RushDB-Tenant`); auth is the engine token.
 */
export class DirectEngine {
  private readonly baseUrl: string
  private readonly token: string
  private readonly httpClient: HttpClient
  private readonly scope?: string
  private capabilityFlags?: Promise<Set<string>>

  constructor(config: { engineUrl: string; token: string; httpClient: HttpClient; scope?: string }) {
    this.baseUrl = config.engineUrl.replace(/\/$/, '')
    this.token = config.token
    this.httpClient = config.httpClient
    this.scope = config.scope
  }

  /**
   * Runs one protocol operation and returns its `response`. A refused
   * operation throws an `Error` with `status` (the engine's HTTP status), the
   * protocol error `code` and `retryable` when the engine sent them, and a
   * `"<status> <message>"` message, as a RushDB Cloud error does.
   */
  async execute(operation: Record<string, any>, context?: { check?: string }): Promise<Record<string, any>> {
    return (await this.run(operation, context)).response
  }

  /**
   * {@link execute}, also returning the envelope's `warnings`. `context.check`
   * is sent only when set, so engines before 3.0.14 never see it.
   */
  async run(
    operation: Record<string, any>,
    context?: { check?: string }
  ): Promise<{ response: Record<string, any>; warnings?: Array<Record<string, any>> }> {
    const requestContext = {
      ...(this.scope ? { scope: this.scope } : {}),
      ...(context?.check !== undefined ? { check: context.check } : {})
    }
    const envelope: ProtocolEnvelope = {
      protocolVersion: 1,
      ...(Object.keys(requestContext).length ? { context: requestContext } : {}),
      operation
    }
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    }
    if (this.scope) {
      headers['X-RushDB-Tenant'] = this.scope
    }
    const response = await this.httpClient.makeRequest(`${this.baseUrl}/protocol/v1/execute`, {
      method: 'POST',
      headers,
      requestData: envelope
    })
    const status = response.getStatusCode()
    const body = (await readJsonBody(response)) as ProtocolResponse | undefined
    if (status >= 400 || body?.error || !body?.response) {
      throw responseError(status, body, 'engine request failed')
    }
    return Array.isArray(body.warnings) && body.warnings.length ?
        { response: body.response, warnings: body.warnings }
      : { response: body.response }
  }

  /**
   * The engine's `describe.capabilities` flags, read once. An absent flag
   * means the engine lacks the feature (3.0.14 adds `typedTemporalValues`,
   * `pointValues`, `spatialFilters`, `uniqueIndexes` and `catalogCheck`).
   */
  capabilities(): Promise<Set<string>> {
    if (!this.capabilityFlags) {
      this.capabilityFlags = this.execute({ kind: 'describe', describe: { kind: 'capabilities' } }).then(
        (response) => new Set(capabilityList(response)),
        (error) => {
          this.capabilityFlags = undefined
          throw error
        }
      )
    }
    return this.capabilityFlags
  }

  /** Whether the engine advertises `flag` in `describe.capabilities`. */
  async supports(flag: string): Promise<boolean> {
    return (await this.capabilities()).has(flag)
  }
}

/** The flags of a `capabilities` response, whatever its field is called. */
const capabilityList = (response: Record<string, any>): string[] => {
  for (const key of ['capabilities', 'flags', 'features']) {
    if (Array.isArray(response[key])) {
      return response[key].filter((flag: unknown): flag is string => typeof flag === 'string')
    }
  }
  return []
}
