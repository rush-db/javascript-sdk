import type { HttpClientResponseInterface } from './HttpClient.js'

/**
 * An error from a failed HTTP response: `"<status> <message>"`, with the HTTP
 * `status`, the server's error `code` and `retryable` flag when it sent them,
 * and the parsed `body`.
 */
export type ResponseError = Error & { status: number; code?: string; retryable?: boolean; body?: unknown }

/**
 * Reads the reason from any error body the SDK receives:
 *
 * - a protocol error `{"protocolVersion":1,"error":{"code","message","retryable"}}`;
 * - a bare engine error `{"error":"unauthorized"}`;
 * - a RushDB Cloud error `{"statusCode","message":"…"|["…"],"error":"Bad Request"}`.
 *
 * Anything else (no body, a non-JSON body, an unknown shape) yields nothing.
 */
export function errorDetails(body: unknown): { message?: string; code?: string; retryable?: boolean } {
  if (!body || typeof body !== 'object') {
    return {}
  }
  const { message, error } = body as Record<string, any>
  if (error && typeof error === 'object' && !Array.isArray(error)) {
    return {
      message: typeof error.message === 'string' && error.message ? error.message : undefined,
      code: typeof error.code === 'string' && error.code ? error.code : undefined,
      retryable: typeof error.retryable === 'boolean' ? error.retryable : undefined
    }
  }
  const raw = message ?? error
  if (Array.isArray(raw)) {
    const joined = raw.filter((part) => typeof part === 'string').join('; ')
    return joined ? { message: joined } : {}
  }
  return typeof raw === 'string' && raw ? { message: raw } : {}
}

/** Builds a {@link ResponseError}; `fallback` is the message when the body has none. */
export function responseError(status: number, body: unknown, fallback?: string): ResponseError {
  const { message, code, retryable } = errorDetails(body)
  const text = message ?? fallback
  const error = new Error(text ? `${status} ${text}` : `${status}`) as ResponseError
  error.status = status
  if (code !== undefined) {
    error.code = code
  }
  if (retryable !== undefined) {
    error.retryable = retryable
  }
  error.body = body
  return error
}

/** The parsed body of a response, or `undefined` when it is empty or not JSON. */
export async function readJsonBody(response: HttpClientResponseInterface): Promise<unknown> {
  try {
    return await response.toJSON()
  } catch {
    return undefined
  }
}
