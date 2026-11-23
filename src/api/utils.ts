import type { DBRecordTarget } from '../sdk'
import type { SDKConfig } from '../sdk/types.js'
import type { CatalogWarning, PropertyDraft, PropertyType } from '../types/index.js'

import { PROPERTY_TYPES } from '../common/constants.js'
import { isObject, isPropertyValue, isString } from '../common/utils.js'
import { DBRecordInstance } from '../sdk'
import { Transaction } from '../sdk/transaction.js'
import { DEFAULT_BASE_PATH, DEFAULT_HOST, DEFAULT_PORT, DEFAULT_PROTOCOL } from './constants.js'

export const buildTransactionHeader = (txId?: string) =>
  txId ?
    {
      ['x-transaction-id']: txId
    }
  : undefined

export const isTransaction = (input: any): input is Transaction | string =>
  isString(input) || input instanceof Transaction

export const pickTransactionId = (input: any) =>
  isTransaction(input) ?
    input instanceof Transaction ?
      input.id
    : input
  : undefined

export const isUUID = (value: any) => {
  const regex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
  return regex.test(value)
}

export const pickRecordId = (input: DBRecordTarget) => {
  if (isString(input) && isUUID(input)) {
    return input
  } else if (input instanceof DBRecordInstance && input.data) {
    return input.data.__id
  } else if (isObject(input) && '__id' in input && isUUID(input.__id)) {
    return input.__id
  }
  return undefined
}

export const isPropertyDraft = (obj: any): obj is PropertyDraft => {
  if (!isObject(obj)) {
    return false
  }

  if (isObject(obj) && 'name' in obj && !isString(obj.name)) {
    return false
  }

  if (
    isObject(obj) &&
    'type' in obj &&
    (!isString(obj.type) || !PROPERTY_TYPES.includes(obj.type as PropertyType))
  ) {
    return false
  }

  if (!('value' in obj) || !isPropertyValue(obj.value)) {
    return false
  }

  if ('metadata' in obj && !isString(obj.metadata)) {
    return false
  }

  if ('valueSeparator' in obj && !isString(obj.valueSeparator)) {
    return false
  }

  return true
}

export const buildUrl = (props: SDKConfig): string => {
  let protocol = DEFAULT_PROTOCOL
  let host = DEFAULT_HOST
  let port = DEFAULT_PORT
  let basePath = DEFAULT_BASE_PATH

  if ('url' in props) {
    const url = new URL(props.url!)
    protocol = url.protocol.replace(':', '')
    host = url.hostname
    port = parseInt(
      url.port ||
        (protocol === 'http' ? '80'
        : protocol === 'https' ? '443'
        : '')
    )
  }

  if ('host' in props && 'port' in props && 'protocol' in props) {
    protocol = props.protocol!.replace(':', '')
    host = props.host!
    port = props.port!
  }

  // Ensure the basePath starts with a '/'
  if (basePath && !basePath.startsWith('/')) {
    basePath = '/' + basePath
  }

  // If the port is the default for the protocol (80 for http, 443 for https), it can be omitted
  let portString = ''
  if (!((protocol === 'http' && port === 80) || (protocol === 'https' && port === 443))) {
    portString = ':' + port
  }

  return `${protocol}://${host}${portString}${basePath}`
}

export const generateRandomId = (size: number = 8): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''

  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    id += characters[randomIndex]
  }

  return id
}

/**
 * The catalog check's `warnings` of a response (objects with a `kind`), or
 * `undefined` when it has none. Smart search's text warnings are not these.
 */
export const pickCatalogWarnings = (warnings: unknown): Array<CatalogWarning> | undefined => {
  if (!Array.isArray(warnings)) {
    return undefined
  }
  const found = warnings.filter(
    (warning): warning is CatalogWarning =>
      Boolean(warning) && typeof warning === 'object' && typeof (warning as CatalogWarning).kind === 'string'
  )
  return found.length ? found : undefined
}

/**
 * Runs `search` again while its text index reports `pending` changes, until
 * none are left or `wait`'s timeout passes, and returns the last result.
 */
export const searchUntilApplied = async <T extends { textSearch?: { pending?: number } }>(
  wait: boolean | { timeoutMs?: number; intervalMs?: number } | undefined,
  search: () => Promise<T>
): Promise<T> => {
  let result = await search()
  if (!wait) {
    return result
  }
  const { timeoutMs = 2000, intervalMs = 25 } = wait === true ? {} : wait
  const deadline = Date.now() + timeoutMs
  let delay = Math.max(1, intervalMs)
  while ((result.textSearch?.pending ?? 0) > 0 && Date.now() + delay <= deadline) {
    await new Promise((resolve) => setTimeout(resolve, delay))
    delay = Math.min(delay * 2, 500)
    result = await search()
  }
  return result
}

/**
 * The chunk size to use: the call's, else the client's. Unset or `0` means no
 * chunking (one request, atomic as before).
 */
export const chunkSizeOf = (call: number | undefined, client: number | undefined) => {
  const size = call ?? client
  return size !== undefined && Number.isFinite(size) && size > 0 ? Math.floor(size) : Infinity
}

/** `items` in consecutive chunks of at most `size` (one chunk, possibly empty, when it fits). */
export const chunked = <T>(items: Array<T>, size: number): Array<Array<T>> => {
  if (items.length <= size) {
    return [items]
  }
  const chunks: Array<Array<T>> = []
  for (let start = 0; start < items.length; start += size) {
    chunks.push(items.slice(start, start + size))
  }
  return chunks
}

/**
 * Splits CSV text into rows at line breaks outside quoted fields. Returns the
 * rows without their line breaks and the line break found first.
 */
export const splitCsvRows = (
  text: string,
  quoteChar = '"',
  escapeChar = quoteChar,
  newline?: string
): { rows: Array<string>; newline: string } => {
  const rows: Array<string> = []
  let detected = newline
  let inQuotes = false
  let start = 0
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (inQuotes) {
      if (escapeChar !== quoteChar && char === escapeChar && text[i + 1] === quoteChar) {
        i++
      } else if (char === quoteChar) {
        inQuotes = false
      }
      continue
    }
    if (char === quoteChar) {
      inQuotes = true
      continue
    }
    const breakHere =
      detected !== undefined ?
        text.startsWith(detected, i) ? detected : undefined
      : char === '\r' ? (text[i + 1] === '\n' ? '\r\n' : '\r')
      : char === '\n' ? '\n'
      : undefined
    if (breakHere !== undefined) {
      detected = breakHere
      rows.push(text.slice(start, i))
      i += breakHere.length - 1
      start = i + 1
    }
  }
  if (start < text.length) {
    rows.push(text.slice(start))
  }
  return { rows, newline: detected ?? '\n' }
}

/**
 * A CSV import as one request per chunk of at most `size` data rows: each
 * chunk repeats the header row (unless `parseConfig.header` is `false`),
 * carries its rows' `vectors` and names the line break, so the server does
 * not detect it again.
 */
export const csvChunks = <T extends { data: string; parseConfig?: Record<string, any>; vectors?: Array<any> }>(
  params: T,
  size: number
): Array<T> => {
  if (!Number.isFinite(size) || params.data.length <= size) {
    return [params]
  }
  const parseConfig = params.parseConfig ?? {}
  const { rows, newline } = splitCsvRows(params.data, parseConfig.quoteChar, parseConfig.escapeChar, parseConfig.newline)
  const header = parseConfig.header === false ? [] : rows.slice(0, 1)
  const dataRows = rows.slice(header.length)
  // The server maps `vectors[i]` to the i-th row it parses, which skips blank lines: such a
  // file with vectors is sent whole, so no vector lands on another row.
  if (dataRows.length <= size || (params.vectors?.length && dataRows.some((row) => row.trim() === ''))) {
    return [params]
  }
  return chunked(dataRows, size).map((chunk, index) => {
    const request: T = {
      ...params,
      data: [...header, ...chunk].join(newline),
      parseConfig: { ...parseConfig, newline }
    }
    if (params.vectors) {
      request.vectors = params.vectors.slice(index * size, (index + 1) * size)
    }
    return request
  })
}
