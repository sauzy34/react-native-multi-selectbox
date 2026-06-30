import type { SelectOption } from '../types'

const EMPTY_OPTIONS: SelectOption[] = []

/** Stable empty object for default prop objects (avoids breaking memo). */
export const EMPTY_OBJECT = {} as const

/** Coerce non-arrays (e.g. loading/API mistakes) to a safe empty list. */
export function normalizeOptions(options: SelectOption[] | undefined): SelectOption[] {
  return Array.isArray(options) ? options : EMPTY_OPTIONS
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
