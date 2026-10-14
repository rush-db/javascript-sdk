import type { DirectEngine } from './engine.js'

/**
 * `ai.getSchema` and `ai.getSchemaMarkdown` in direct mode: the engine's
 * `describe.schema` arranged per label exactly as RushDB Cloud arranges it,
 * with each property's vector indexes attached.
 */

type Body = Record<string, any>

export type SchemaVectorIndex = {
  id: string
  name: string
  sourceType: string
  similarityFunction: string
  dimensions: number
  status: string
  modelKey: string
}

export type SchemaProperty = {
  id: string
  name: string
  type: string
  isArray?: boolean
  min?: number | string
  max?: number | string
  values?: Array<string | number>
  recordsCount?: number
  vectorIndexes?: SchemaVectorIndex[]
}

export type SchemaRelationship = {
  label: string
  type: string
  direction: 'in' | 'out'
  count?: number
  properties?: Array<{ name: string; type: string; relationshipsCount?: number }>
}

export type SchemaItem = {
  label: string
  count: number
  properties: SchemaProperty[]
  relationships: SchemaRelationship[]
}

/** Sample values shown per string property. */
const SAMPLE_VALUES = 10

export const buildSchema = async (
  engine: DirectEngine,
  labels: string[] | undefined,
  toEmbeddingIndex: (index: Body) => Body
): Promise<SchemaItem[]> => {
  const [described, vectorIndexes] = await Promise.all([
    engine.execute({
      kind: 'describe',
      describe: { kind: 'schema', query: { labels: [], predicate: {}, offset: 0 } }
    }),
    engine.execute({ kind: 'describe', describe: { kind: 'vectorIndexes' } })
  ])
  const native = described.schema ?? { labels: [], properties: [], relationships: [] }

  const propsByLabel = new Map<string, SchemaProperty[]>()
  for (const definition of native.properties ?? []) {
    const label = definition.label ?? ''
    if (!label) {
      continue
    }
    const property: SchemaProperty = {
      id: String(definition.id),
      name: String(definition.name),
      type: String(definition.type ?? 'string'),
      recordsCount: Number(definition.recordsCount ?? 0),
      isArray: definition.isArray ?? undefined
    }
    if (property.type === 'boolean') {
      property.values = ['true', 'false']
    } else if (property.type === 'string') {
      const samples = (definition.sampleValues ?? [])
        .filter((value: unknown) => value !== null && value !== undefined)
        .map(String)
      property.values = [...new Set<string>(samples)].slice(0, SAMPLE_VALUES)
    }
    if (definition.min !== undefined && definition.min !== null) {
      property.min = property.type === 'number' ? Number(definition.min) : String(definition.min)
    }
    if (definition.max !== undefined && definition.max !== null) {
      property.max = property.type === 'number' ? Number(definition.max) : String(definition.max)
    }
    const props = propsByLabel.get(label) ?? []
    props.push(property)
    propsByLabel.set(label, props)
  }

  const schema: SchemaItem[] = (native.labels ?? []).map((label: Body) => ({
    label: label.name,
    count: Number(label.recordsCount ?? 0),
    properties: propsByLabel.get(label.name) ?? [],
    relationships: []
  }))

  const byLabel = new Map(schema.map((item) => [item.label, item]))
  const addRelationship = (label: string, relationship: SchemaRelationship) => {
    const item = byLabel.get(label)
    if (
      item &&
      !item.relationships.some(
        (existing) =>
          existing.direction === relationship.direction &&
          existing.label === relationship.label &&
          existing.type === relationship.type
      )
    ) {
      item.relationships.push(relationship)
    }
  }
  for (const relationship of native.relationships ?? []) {
    const properties = relationship.properties?.length ? relationship.properties : undefined
    addRelationship(relationship.sourceLabel, {
      label: relationship.targetLabel,
      type: relationship.type,
      direction: 'out',
      count: relationship.count,
      properties
    })
    if (relationship.sourceLabel !== relationship.targetLabel) {
      addRelationship(relationship.targetLabel, {
        label: relationship.sourceLabel,
        type: relationship.type,
        direction: 'in',
        count: relationship.count,
        properties
      })
    }
  }

  const indexMap = new Map<string, SchemaVectorIndex[]>()
  for (const index of (vectorIndexes.indexes ?? []).map(toEmbeddingIndex)) {
    const key = `${index.label}|${index.propertyName}`
    const indexes = indexMap.get(key) ?? []
    indexes.push({
      id: String(index.id ?? ''),
      name: String(index.name ?? ''),
      sourceType: String(index.sourceType ?? 'external'),
      similarityFunction: String(index.similarityFunction ?? 'cosine'),
      dimensions: Number(index.dimensions ?? 0),
      status: String(index.status ?? 'pending'),
      modelKey: String(index.modelKey ?? '')
    })
    indexMap.set(key, indexes)
  }
  for (const item of schema) {
    item.relationships.sort((a, b) =>
      `${a.direction}|${a.label}|${a.type}`.localeCompare(`${b.direction}|${b.label}|${b.type}`)
    )
    for (const property of item.properties) {
      const indexes = indexMap.get(`${item.label}|${property.name}`)
      if (indexes?.length) {
        property.vectorIndexes = indexes
      }
    }
  }
  schema.sort((a, b) => b.count - a.count)
  return labels?.length ? schema.filter((item) => labels.includes(item.label)) : schema
}

/** The schema as compact Markdown tables, for an LLM to read. */
export const buildSchemaMarkdown = (schema: SchemaItem[]): string => {
  const esc = (s: string) => String(s).replace(/\|/g, '\\|').replace(/`/g, '\\`')
  const MAX_DISPLAY_VALUES = 5
  const MAX_VALUE_LEN = 48
  const truncate = (s: string) => (s.length > MAX_VALUE_LEN ? s.slice(0, MAX_VALUE_LEN) + '\u2026' : s)

  const fmtValues = (prop: SchemaProperty): string => {
    const t = (prop.type || '').toLowerCase()
    if (t === 'number' || t === 'datetime') {
      return prop.min !== undefined && prop.max !== undefined ? `\`${prop.min}\`..\`${prop.max}\`` : '—'
    }
    if (Array.isArray(prop.values) && prop.values.length > 0) {
      const shown = prop.values.slice(0, MAX_DISPLAY_VALUES)
      const tail =
        prop.values.length > MAX_DISPLAY_VALUES ? ` (+${prop.values.length - MAX_DISPLAY_VALUES} more)` : ''
      return shown.map((v) => `\`${esc(truncate(String(v)))}\``).join(', ') + tail
    }
    return '—'
  }

  let md = `# Graph Schema\n\n## Labels\n\n| Label | Count |\n|-------|------:|\n`
  for (const item of schema) {
    md += `| \`${esc(item.label)}\` | ${item.count} |\n`
  }
  md += `\n`
  for (const item of schema) {
    const recordWord = item.count === 1 ? 'record' : 'records'
    md += `---\n\n## \`${esc(item.label)}\` (${item.count} ${recordWord})\n\n`
    if (item.properties.length > 0) {
      md += `### Properties\n\n`
      md += `| Property | Type | Values / Range | Semantic Search |\n|----------|------|----------------|-----------------|\n`
      for (const p of item.properties) {
        const semanticCell =
          p.vectorIndexes?.length ?
            p.vectorIndexes
              .map(
                (vi) => `\`${vi.name}\` (${vi.sourceType}, ${vi.similarityFunction}, ${vi.dimensions}d) [${vi.status}]`
              )
              .join(', ')
          : '—'
        const propertyType = p.isArray ? `${p.type}[]` : p.type
        md += `| \`${esc(p.name)}\` | ${esc(propertyType)} | ${fmtValues(p)} | ${semanticCell} |\n`
      }
      md += `\n`
    }
    if (item.relationships.length > 0) {
      md += `### Relationships\n\n`
      md += `| Traversal | Count | Edge Properties |\n|-----------|------:|-----------------|\n`
      for (const r of item.relationships) {
        const edgeProperties =
          r.properties?.length ? r.properties.map((p) => `\`${esc(p.name)}:${esc(p.type)}\``).join(', ') : '—'
        const pattern =
          r.direction === 'out' ?
            `(${item.label})-[:${r.type}]->(${r.label})`
          : `(${item.label})<-[:${r.type}]-(${r.label})`
        const count = typeof r.count === 'number' ? String(r.count) : '—'
        md += `| \`${esc(pattern)}\` | ${count} | ${edgeProperties} |\n`
      }
      md += `\n`
    }
  }
  return md.trim()
}
