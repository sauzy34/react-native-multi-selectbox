import type { ReactNode } from 'react'
import type {
  DimensionValue,
  ScrollViewProps,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native'

/** Option shape required by SelectBox (1.x / 2.0 contract). */
export type SelectOption = {
  id: string | number
  item: string
}

/**
 * Extra props for the options panel (Phase 6: ScrollView, not FlatList).
 * Prefer `style` / `contentContainerStyle` / `nestedScrollEnabled`.
 */
export type OptionsListProps = Omit<ScrollViewProps, 'children'>

/** Extra props for the multi-select chips row (horizontal ScrollView). */
export type MultiSelectFieldProps = Omit<ScrollViewProps, 'children' | 'horizontal'>

/** Style and chrome props shared by single- and multi-select modes. */
export type SelectBoxSharedProps = {
  label?: string
  labelStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  /** Defaults to `[]` when omitted or non-array at runtime. */
  options?: SelectOption[]
  inputPlaceholder?: string
  hideInputFilter?: boolean
  width?: DimensionValue
  selectIcon?: ReactNode
  arrowIconColor?: string
  searchIconColor?: string
  toggleIconColor?: string
  searchInputProps?: TextInputProps
  /** Horizontal chips scroller props (multi mode). */
  multiSelectInputFieldProps?: MultiSelectFieldProps
  /** Dropdown options panel props (ScrollView; safe inside parent ScrollViews). */
  listOptionProps?: OptionsListProps
  inputFilterContainerStyle?: StyleProp<ViewStyle>
  /** Applied to the filter TextInput (e.g. `{ color: '#fff' }` overrides default text color). */
  inputFilterStyle?: StyleProp<TextStyle>
  optionsLabelStyle?: StyleProp<TextStyle>
  optionContainerStyle?: StyleProp<ViewStyle>
  multiOptionContainerStyle?: StyleProp<ViewStyle>
  multiOptionsLabelStyle?: StyleProp<TextStyle>
  multiListEmptyLabelStyle?: StyleProp<TextStyle>
  listEmptyLabelStyle?: StyleProp<TextStyle>
  selectedItemStyle?: StyleProp<TextStyle>
  listEmptyText?: string
}

export type SelectBoxSingleProps = SelectBoxSharedProps & {
  isMulti?: false
  /** Controlled selected option. Empty object / null / missing `item` = no selection. */
  value?: SelectOption | Record<string, never> | null
  onChange?: (option: SelectOption) => void
  selectedValues?: never
  onMultiSelect?: never
  onTapClose?: never
}

export type SelectBoxMultiProps = SelectBoxSharedProps & {
  isMulti: true
  /** Controlled selected options (defaults to `[]`). */
  selectedValues?: SelectOption[]
  onMultiSelect?: (option: SelectOption) => void
  onTapClose?: (option: SelectOption) => void
  value?: never
  onChange?: never
}

/** Discriminated union: `isMulti: true` vs single-select. */
export type SelectBoxProps = SelectBoxSingleProps | SelectBoxMultiProps
