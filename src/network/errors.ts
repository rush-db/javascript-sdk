import type { HttpClientResponseInterface } from './HttpClient.js'
import { CatalogCheckError, UniqueConstraintError } from '../sdk/errors.js'

/**
 * An error from a failed HTTP response: `"<status> <message>"`, with the HTTP
 * `status`, the server's error `code` and `retryable` flag when it sent them,
 * and the parsed `body`.
 */
export type ResponseError = Error & {
  status: number
  code?: string
  retryable?: boolean
  /** Structured facts about the error (a unique conflict's record, a strict check's warnings). */
  details?: Record<string, any>
  body?: unknown
}

/**
 * Reads the reason from any error body the SDK receives:
 *
 * - a protocol error `{"protocolVersion":1,"error":{"code","message","retryable"}}`;
 * - a bare engine error `{"error":"unauthorized"}`;
 * - a RushDB Cloud error `{"statusCode","message":"…"|["…"],"error":"Bad Request"}`, which may
 *   carry the engine's `code`, `retryable` and `details` beside them.
 *
 * Anything else (no body, a non-JSON body, an unknown shape) yields nothing.
 */
export function errorDetails(body: unknown): {
  message?: string
  code?: string
  retryable?: boolean
  details?: Record<string, any>
} {
  if (!body || typeof body !== 'object') {
    return {}
  }
  const { message, error } = body as Record<string, any>
  if (error && typeof error === 'object' && !Array.isArray(error)) {
    return {
      message: typeof error.message === 'string' && error.message ? error.message : undefined,
      ...facts(error)
    }
  }
  const raw = message ?? error
  const known = facts(body as Record<string, any>)
  if (Array.isArray(raw)) {
    const joined = raw.filter((part) => typeof part === 'string').join('; ')
    return joined ? { message: joined, ...known } : known
  }
  return typeof raw === 'string' && raw ? { message: raw, ...known } : known
}

const facts = (source: Record<string, any>) => {
  const out: { code?: string; retryable?: boolean; details?: Record<string, any> } = {}
  if (typeof source.code === 'string' && source.code) {
    out.code = source.code
  }
  if (typeof source.retryable === 'boolean') {
    out.retryable = source.retryable
  }
  if (source.details && typeof source.details === 'object' && !Array.isArray(source.details)) {
    out.details = source.details
  }
  return out
}

/**
 * Builds a {@link ResponseError}; `fallback` is the message when the body has none.
 * A unique-index conflict (409 naming the label and property) is a
 * {@link UniqueConstraintError}, and a query refused by `context.check: 'strict'`
 * (`invalid_request` with `details.warnings`) a {@link CatalogCheckError}.
 */
export function responseError(status: number, body: unknown, fallback?: string): ResponseError {
  const { message, code, retryable, details } = errorDetails(body)
  const text = message ?? fallback
  const full = text ? `${status} ${text}` : `${status}`
  const error = (
    status === 409 && typeof details?.label === 'string' && typeof details?.property === 'string' ?
      new UniqueConstraintError(full, details as { label: string; property: string; recordId?: string })
    : Array.isArray(details?.warnings) && (code === undefined || code === 'invalid_request') ?
      new CatalogCheckError(full, details.warnings)
    : new Error(full)) as ResponseError
  error.status = status
  if (code !== undefined) {
    error.code = code
  }
  if (retryable !== undefined) {
    error.retryable = retryable
  }
  if (details !== undefined) {
    error.details = details
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
