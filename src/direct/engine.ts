import type { HttpClient } from '../network/HttpClient.js'

/**
 * Protocol operation envelope (v1) sent to `POST /protocol/v1/execute`.
 */
export type ProtocolEnvelope = {
  protocolVersion: 1
  context?: { scope?: string }
  operation: Record<string, any>
}

export type ProtocolResponse = {
  response: { kind: string; [key: string]: any }
  error?: { code: string; message: string }
}

/**
 * Direct engine transport: executes protocol operations against a standalone
 * `rushdbd` (`/protocol/v1/execute`) over HTTP. This is the SDK's "direct
 * mode" — no RushDB Cloud. `scope` is the tenant on a multitenant engine
 * (`X-RushDB-Tenant`); auth is the engine token.
 */
export class DirectEngine {
  private readonly baseUrl: string
  private readonly token: string
  private readonly httpClient: HttpClient
  private readonly scope?: string

  constructor(config: { engineUrl: string; token: string; httpClient: HttpClient; scope?: string }) {
    this.baseUrl = config.engineUrl.replace(/\/$/, '')
    this.token = config.token
    this.httpClient = config.httpClient
    this.scope = config.scope
  }

  /**
   * Runs one protocol operation and returns its `response`. A refused
   * operation throws an `Error` with `status` (the engine's HTTP status) and a
   * `"<status> <message>"` message, as a RushDB Cloud error does.
   */
  async execute(operation: Record<string, any>): Promise<Record<string, any>> {
    const envelope: ProtocolEnvelope = {
      protocolVersion: 1,
      ...(this.scope ? { context: { scope: this.scope } } : {}),
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
    const body = (await response.toJSON().catch(() => undefined)) as ProtocolResponse | undefined
    if (status >= 400 || body?.error || !body?.response) {
      const message = body?.error?.message ?? 'engine request failed'
      const error = new Error(`${status} ${message}`) as Error & { status: number; body?: unknown }
      error.status = status
      error.body = body
      throw error
    }
    return body.response
  }
}
