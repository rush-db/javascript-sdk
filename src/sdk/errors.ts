import type { CatalogWarning, SearchQuery } from '../types'

export class UniquenessError extends Error {
  constructor(label: string, properties: any) {
    super(`Record with label "${label}" and properties ${JSON.stringify(properties)} already exists`)
    this.name = 'UniquenessError'
    Object.setPrototypeOf(this, UniquenessError.prototype)
  }
}

export class EmptyTargetError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EmptyTarget'
    Object.setPrototypeOf(this, EmptyTargetError.prototype)
  }
}

export class NonUniqueResultError extends Error {
  constructor(duplicateCount: number, searchQuery: SearchQuery) {
    super(
      `Expected a unique result but found ${duplicateCount} matches for the provided SearchQuery: ${JSON.stringify(
        searchQuery
      )}. Ensure your search parameters uniquely identify a single result.`
    )
    this.name = 'NonUniqueResultError'
    Object.setPrototypeOf(this, NonUniqueResultError.prototype)
  }
}

/**
 * A RushDB Cloud feature was called on a client in direct mode (a standalone
 * engine). Thrown before any request is sent.
 */
export class CloudOnlyError extends Error {
  readonly code = 'CLOUD_ONLY'

  constructor(
    /** The SDK method, e.g. `ai.search`. */
    public readonly method: string,
    /** What the method needs from RushDB Cloud. */
    public readonly reason: string
  ) {
    super(`${method} requires RushDB Cloud: ${reason}. It is not available in direct mode.`)
    this.name = 'CloudOnlyError'
    Object.setPrototypeOf(this, CloudOnlyError.prototype)
  }
}

/**
 * A call that a standalone engine supports, made in a form direct mode cannot
 * carry out: a write inside a transaction that the engine cannot stage (bulk
 * deletes, detach, upserts and merge imports, inline vectors). The engine
 * stages record creates, updates, deletes, links and imports. Thrown before
 * any request is sent, so nothing runs half-way.
 */
export class DirectModeError extends Error {
  readonly code = 'DIRECT_MODE_UNSUPPORTED'

  constructor(message: string) {
    super(message)
    this.name = 'DirectModeError'
    Object.setPrototypeOf(this, DirectModeError.prototype)
  }
}

/**
 * A write refused by a unique index: another record of `label` already holds
 * the value in `property` (HTTP 409, code `conflict`). The value itself is
 * never sent back. RushDB 3.0.14 and later.
 */
export class UniqueConstraintError extends Error {
  status = 409
  code?: string = 'conflict'
  retryable?: boolean
  details?: Record<string, any>
  body?: unknown
  readonly label: string
  readonly property: string
  /** The record that holds the value (absent when the server names none). */
  readonly recordId?: string

  constructor(message: string, details: { label: string; property: string; recordId?: string }) {
    super(message)
    this.name = 'UniqueConstraintError'
    this.label = details.label
    this.property = details.property
    if (typeof details.recordId === 'string') {
      this.recordId = details.recordId
    }
    Object.setPrototypeOf(this, UniqueConstraintError.prototype)
  }
}

/**
 * A query refused by `context: { check: 'strict' }`: it names a label,
 * property or text that no record holds. `warnings` says which, with what the
 * query most likely meant. RushDB 3.0.14 and later.
 */
export class CatalogCheckError extends Error {
  status = 400
  code?: string = 'invalid_request'
  retryable?: boolean
  details?: Record<string, any>
  body?: unknown
  readonly warnings: Array<CatalogWarning>

  constructor(message: string, warnings: Array<CatalogWarning>) {
    super(message)
    this.name = 'CatalogCheckError'
    this.warnings = warnings
    Object.setPrototypeOf(this, CatalogCheckError.prototype)
  }
}
