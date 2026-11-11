import type { RestAPI } from './api.js'
import type {
  CreatedImport,
  CreateImportParams,
  ImportFile,
  ImportFileInput,
  ImportFileSettings,
  ImportFilesOptions,
  ImportFileSource,
  ImportFileUpload,
  ImportPreview,
  ImportRun,
  ImportUploadData,
  ImportUploadOptions,
  ListImportsParams,
  PreviewImportParams,
  StartImportParams,
  WaitImportOptions
} from './ingest-types.js'
import type { ApiResponse } from './types.js'

import { CloudOnlyError } from '../sdk/errors.js'
import { FINISHED_IMPORT_RUN_STATUSES } from './ingest-types.js'
import { sizeOf, uploadFileContent } from './uploads.js'
import { generateRandomId } from './utils.js'

const CLOUD_ONLY_REASON = 'file imports run on the platform'

/** A JSON request through the client's fetcher, logged like every other call. */
export async function ingestRequest<T>(
  api: RestAPI,
  method: string,
  path: string,
  requestData?: Record<string, any>
): Promise<ApiResponse<T>> {
  // A JSON content type with an empty body is refused, so writes send `{}`.
  const body = requestData ?? (method === 'GET' || method === 'DELETE' ? undefined : {})
  const payload = { method, headers: {}, ...(body === undefined ? {} : { requestData: body }) }
  const requestId = typeof api.logger === 'function' ? generateRandomId() : ''
  api.logger?.({ requestId, path, ...payload })
  const response = await api.fetcher<ApiResponse<T>>(path, payload)
  api.logger?.({ requestId, path, ...payload, responseData: response.data })
  return response
}

const query = (params: Record<string, string | number | boolean | undefined>) => {
  const search = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&')
  return search ? `?${search}` : ''
}

const id = encodeURIComponent

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * `db.imports`: background file imports (CSV, JSON, NDJSON, …, optionally
 * compressed). Create an import with its files, upload them, preview the
 * mapping, start; the run continues on the server without the client.
 * **RushDB Cloud only.**
 */
export function createImportsApi(api: RestAPI) {
  /** Upload instructions from `create`/`addFiles`, so `upload` can take ids. */
  const uploads = new Map<string, ImportFileUpload>()
  const remember = (importId: string, files: ImportFileUpload[]) => {
    for (const file of files) {
      uploads.set(`${importId}/${file.id}`, file)
    }
  }

  const guard = (method: string) => {
    if (api.direct) {
      throw new CloudOnlyError(`imports.${method}`, CLOUD_ONLY_REASON)
    }
  }

  const imports = {
    /**
     * Creates a draft import with its files (name and exact size in bytes; up
     * to 50). Each returned file carries its `upload` instructions.
     */
    create: async (params: CreateImportParams) => {
      guard('create')
      const response = await ingestRequest<CreatedImport>(api, 'POST', '/imports', params)
      remember(response.data.id, response.data.files)
      return response
    },

    /** Adds files to a draft import. */
    addFiles: async (importId: string, files: ImportFileInput[]) => {
      guard('addFiles')
      const response = await ingestRequest<ImportFileUpload[]>(api, 'POST', `/imports/${id(importId)}/files`, {
        files
      })
      remember(importId, response.data)
      return response
    },

    /** Removes a file from a draft import. */
    removeFile: async (importId: string, fileId: string) => {
      guard('removeFile')
      uploads.delete(`${importId}/${fileId}`)
      return ingestRequest<{ deleted: true }>(api, 'DELETE', `/imports/${id(importId)}/files/${id(fileId)}`)
    },

    /**
     * Uploads one file's bytes and completes it. `file` is a file from
     * `create`/`addFiles` (or its id, when this client created it). With
     * `s3-multipart`, parts go to their presigned URLs `parallelism` at a time
     * (default 4) and the ETags are sent on completion; with `direct`, the
     * bytes go to the API. Failed requests are retried (`retries`, default 3);
     * a stream is read once, so a direct stream upload is not retried.
     */
    upload: async (
      importId: string,
      file: string | ImportFileUpload,
      data: ImportUploadData,
      options: ImportUploadOptions = {}
    ) => {
      guard('upload')
      const target = typeof file === 'string' ? uploads.get(`${importId}/${file}`) : file
      if (!target) {
        throw new Error(
          `No upload instructions for file ${String(file)}: pass the file object returned by imports.create() or imports.addFiles()`
        )
      }
      const transport = api.uploadTransport
      if (!transport) {
        throw new Error('Uploads need an HTTP client: import the SDK from its Node or browser entry')
      }
      const parts = await uploadFileContent(transport, target, data, options)
      const response = await ingestRequest<ImportFile>(
        api,
        'POST',
        `/imports/${id(importId)}/files/${id(target.id)}/complete`,
        parts ? { parts } : {}
      )
      uploads.delete(`${importId}/${target.id}`)
      return response
    },

    /** Column types, samples, a suggested key per file and suggested links between files. Writes nothing. */
    preview: async (importId: string, params: PreviewImportParams = {}) => {
      guard('preview')
      return ingestRequest<ImportPreview>(api, 'POST', `/imports/${id(importId)}/preview`, params)
    },

    /** Starts the run with the files' labels and mappings and the links between files. */
    start: async (importId: string, params: StartImportParams = {}) => {
      guard('start')
      return ingestRequest<ImportRun>(api, 'POST', `/imports/${id(importId)}/start`, params)
    },

    /** One import run (a file import or a connection sync) with its progress. */
    get: async (importId: string) => {
      guard('get')
      return ingestRequest<ImportRun>(api, 'GET', `/imports/${id(importId)}`)
    },

    /** Import runs of the project, newest first: `{ data, total }`. */
    list: async (params: ListImportsParams = {}) => {
      guard('list')
      return ingestRequest<ImportRun[]>(api, 'GET', `/imports${query(params)}`)
    },

    /** Asks a queued or running run to stop; it ends `cancelled`. */
    cancel: async (importId: string) => {
      guard('cancel')
      return ingestRequest<ImportRun>(api, 'POST', `/imports/${id(importId)}/cancel`)
    },

    /** Runs a failed or partial file import again. */
    retry: async (importId: string) => {
      guard('retry')
      return ingestRequest<ImportRun>(api, 'POST', `/imports/${id(importId)}/retry`)
    },

    /** Deletes an import and its uploaded files (records already written stay). */
    delete: async (importId: string) => {
      guard('delete')
      return ingestRequest<{ deleted: true }>(api, 'DELETE', `/imports/${id(importId)}`)
    },

    /**
     * Polls a run until it is `completed`, `partial`, `failed` or
     * `cancelled`, and returns it. Rejects after `timeoutMs`.
     */
    wait: async (importId: string, options: WaitImportOptions = {}) => {
      guard('wait')
      const interval = Math.max(0, options.intervalMs ?? 2000)
      const deadline = options.timeoutMs === undefined ? Infinity : Date.now() + options.timeoutMs
      for (;;) {
        const response = await imports.get(importId)
        options.onProgress?.(response.data)
        if (FINISHED_IMPORT_RUN_STATUSES.includes(response.data.status)) {
          return response
        }
        if (Date.now() + interval > deadline) {
          throw new Error(
            `Import ${importId} is still ${response.data.status} after ${options.timeoutMs} ms`
          )
        }
        await sleep(interval)
      }
    },

    /**
     * Imports files in one call: create → upload every file → start (→ wait
     * when `wait` is set). Names and sizes come from `File`/`Blob`/bytes when
     * not given; a stream needs both. Links and `mappings` name files by
     * position or name.
     */
    importFiles: async (files: ImportFileSource[], options: ImportFilesOptions = {}) => {
      guard('importFiles')
      const sources = files.map((file, index) => {
        const name = file.name ?? (file.data as { name?: unknown })?.name
        const size = file.size ?? sizeOf(file.data)
        if (typeof name !== 'string' || !name) {
          throw new Error(`File ${index} needs a name (its extension picks the parser)`)
        }
        if (typeof size !== 'number') {
          throw new Error(`File ${index} (${name}) is a stream: pass its size in bytes`)
        }
        return { ...file, name, size }
      })
      const created = await imports.create({
        name: options.name,
        files: sources.map(({ name, size, label }) => (label ? { name, size, label } : { name, size }))
      })
      const run = created.data
      const fileIdOf = (ref: number | string) => {
        const index =
          typeof ref === 'number' ? ref : sources.findIndex((source) => source.name === ref)
        const file = run.files[index]
        if (!file) {
          throw new Error(`No file ${JSON.stringify(ref)} in this import`)
        }
        return file.id
      }
      const links = (options.links ?? []).map(({ source, target, ...link }) => ({
        ...link,
        sourceFileId: fileIdOf(source),
        targetFileId: fileIdOf(target)
      }))

      const { onProgress, wait, mappings, links: _links, name: _name, ...uploadOptions } = options
      for (let index = 0; index < sources.length; index++) {
        await imports.upload(run.id, run.files[index], sources[index].data, {
          ...uploadOptions,
          onProgress: (progress) => onProgress?.({ phase: 'upload', ...progress })
        })
      }

      const settings: ImportFileSettings[] = sources.map((source, index) => {
        const mapping = source.mapping ?? mappings?.[source.name] ?? mappings?.[String(index)]
        return mapping ? { id: run.files[index].id, mapping } : { id: run.files[index].id }
      })
      const started = await imports.start(run.id, { files: settings, ...(links.length ? { links } : {}) })
      onProgress?.({ phase: 'run', run: started.data })
      if (!wait) {
        return started
      }
      const waitOptions = wait === true ? {} : wait
      return imports.wait(run.id, {
        ...waitOptions,
        onProgress: (current) => {
          waitOptions.onProgress?.(current)
          onProgress?.({ phase: 'run', run: current })
        }
      })
    }
  }

  return imports
}

export type ImportsApi = ReturnType<typeof createImportsApi>
