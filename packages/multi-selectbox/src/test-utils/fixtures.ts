import type { SelectOption } from '../types'

export const OPTIONS = [
  { id: 'JUVE', item: 'Juventus' },
  { id: 'RM', item: 'Real Madrid' },
  { id: 'BR', item: 'Barcelona' },
] as const satisfies readonly SelectOption[]

export const OPTIONS_MUTABLE: SelectOption[] = [...OPTIONS]
