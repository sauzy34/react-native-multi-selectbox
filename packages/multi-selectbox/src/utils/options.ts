import type { SelectOption } from '../types'

const EMPTY_OPTIONS: SelectOption[] = []

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

export { EMPTY_OPTIONS }
