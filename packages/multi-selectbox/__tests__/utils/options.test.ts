import {
  buildOptionLabelById,
  buildSelectedIdSet,
  filterOptions,
  isOptionSelected,
  normalizeOptions,
  readSelectedItemText,
} from '../../src/utils/options'
import type { SelectOption } from '../../src/types'

const sample: SelectOption[] = [
  { id: 'a', item: 'Alpha' },
  { id: 'b', item: 'Beta' },
]

describe('options utils', () => {
  it('normalizeOptions returns empty array for non-arrays', () => {
    expect(normalizeOptions(undefined)).toEqual([])
    // @ts-expect-error runtime guard
    expect(normalizeOptions(null)).toEqual([])
    // @ts-expect-error runtime guard
    expect(normalizeOptions({ length: 1 })).toEqual([])
  })

  it('normalizeOptions returns the same array reference when valid', () => {
    expect(normalizeOptions(sample)).toBe(sample)
  })

  it('readSelectedItemText handles empty and valid values', () => {
    expect(readSelectedItemText(null)).toBe('')
    expect(readSelectedItemText({})).toBe('')
    expect(readSelectedItemText({ id: 'a', item: 'Alpha' })).toBe('Alpha')
  })

  it('filterOptions is case-insensitive and no-ops on empty query', () => {
    expect(filterOptions(sample, '')).toEqual(sample)
    expect(filterOptions(sample, 'alp')).toEqual([sample[0]])
    expect(filterOptions(sample, 'BETA')).toEqual([sample[1]])
    expect(filterOptions(sample, 'zzz')).toEqual([])
  })

  it('isOptionSelected matches by id', () => {
    expect(isOptionSelected([{ id: 'a', item: 'Alpha' }], sample[0]!)).toBe(true)
    expect(isOptionSelected([{ id: 'a', item: 'Alpha' }], sample[1]!)).toBe(false)
  })

  it('buildSelectedIdSet supports O(1) has()', () => {
    const set = buildSelectedIdSet([
      { id: 'a', item: 'Alpha' },
      { id: 2, item: 'Two' },
    ])
    expect(set.has('a')).toBe(true)
    expect(set.has(2)).toBe(true)
    expect(set.has('missing')).toBe(false)
  })

  it('buildOptionLabelById maps ids to labels', () => {
    const map = buildOptionLabelById(sample)
    expect(map.get('a')).toBe('Alpha')
    expect(map.get('b')).toBe('Beta')
  })
})

it('normalizeOptions maps custom optionLabelKey / optionIdKey', () => {
  const rows = [
    { code: 'x', name: 'X-ray' },
    { code: 'y', name: 'Yankee' },
  ]
  expect(normalizeOptions(rows, 'code', 'name')).toEqual([
    { id: 'x', item: 'X-ray' },
    { id: 'y', item: 'Yankee' },
  ])
})

it('normalizeOptions skips malformed rows when coercing', () => {
  expect(normalizeOptions([{ id: 'ok', item: 'OK' }, { id: 'bad' }, null] as never)).toEqual([
    { id: 'ok', item: 'OK' },
  ])
})
