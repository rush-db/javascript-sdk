import type { RestAPI } from '../api/api.js'

import { RushDB } from './sdk.js'

/**
 * The client each SDK object belongs to. A Transaction, record instance or
 * result set is bound to the client that produced it, so its methods reach the
 * same backend even when several clients live in one process. A WeakMap keeps
 * the client off the object itself: it never shows up in `JSON.stringify` or
 * logs (the client holds the token).
 */
const owners = new WeakMap<object, RestAPI>()

/** Binds `target` to `client` (a no-op without a client). */
export const bindClient = <T extends object>(target: T, client?: RestAPI): T => {
  if (client) {
    owners.set(target, client)
  }
  return target
}

/** The client `target` is bound to, if any. */
export const boundClient = (target: unknown): RestAPI | undefined =>
  typeof target === 'object' && target !== null ? owners.get(target) : undefined

/**
 * The first known client among `candidates`, else the most recently created
 * `RushDB` instance (single-client code keeps working unchanged).
 */
export const resolveClient = (...candidates: Array<RestAPI | undefined>): RestAPI =>
  candidates.find((client): client is RestAPI => client !== undefined) ?? RushDB.getInstance()
