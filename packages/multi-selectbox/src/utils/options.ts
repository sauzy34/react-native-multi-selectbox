import type { SelectOption } from '../types'

const EMPTY_OPTIONS: SelectOption[] = []

/** Stable empty object for default prop objects (avoids breaking memo). */
export const EMPTY_OBJECT = {} as const

function readId(value: unknown): string | number | undefined {
  if (typeof value === 'string' || typeof value === 'number') {
    return value
  }
  return undefined
}

function readLabel(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  return undefined
}

/**
 * Coerce options from arrays of SelectOption or records with custom id/label keys
 * (e.g. `{ id, name }` via optionLabelKey="name"). Non-arrays become [].
 */
export function normalizeOptions(
  options: ReadonlyArray<SelectOption | Record<string, unknown>> | undefined,
  optionIdKey = 'id',
  optionLabelKey = 'item',
): SelectOption[] {
  if (!Array.isArray(options)) {
    return EMPTY_OPTIONS
  }
  const useDefaultKeys = optionIdKey === 'id' && optionLabelKey === 'item'
  if (useDefaultKeys) {
    const allValid = options.every(
      (row) =>
        row &&
        typeof row === 'object' &&
        readId((row as SelectOption).id) !== undefined &&
        typeof (row as SelectOption).item === 'string',
    )
    if (allValid) {
      return options as SelectOption[]
    }
  }
  const out: SelectOption[] = []
  for (const row of options) {
    if (!row || typeof row !== 'object') {
      continue
    }
    const rec = row as Record<string, unknown>
    const id = readId(rec[optionIdKey])
    const item = readLabel(rec[optionLabelKey])
    if (id === undefined || item === undefined) {
      continue
    }
    out.push({ id, item })
  }
  return out
}

export function readSelectedItemText(
  value: SelectOption | Record<string, never> | null | undefined,
): string {
  if (value && typeof value === 'object' && 'item' in value && typeof value.item === 'string') {
    return value.item
  }
  return ''
}

export function filterOptions(options: SelectOption[], query: string): SelectOption[] {
  const q = query.toLowerCase()
  if (!q) {
    return options
  }
  return options.filter((suggestion) => suggestion.item.toLowerCase().includes(q))
}

export function isOptionSelected(selected: SelectOption[], item: SelectOption): boolean {
  return selected.some((entry) => entry.id === item.id)
}

/** O(1) lookup for multi-select checked state across N rows. */
export function buildSelectedIdSet(selected: SelectOption[]): ReadonlySet<string | number> {
  const ids = new Set<string | number>()
  for (const entry of selected) {
    ids.add(entry.id)
  }
  return ids
}

/** Label lookup for chips when options catalog is large. */
export function buildOptionLabelById(
  options: SelectOption[],
): ReadonlyMap<string | number, string> {
  const map = new Map<string | number, string>()
  for (const option of options) {
    map.set(option.id, option.item)
  }
  return map
}

export { EMPTY_OPTIONS }
