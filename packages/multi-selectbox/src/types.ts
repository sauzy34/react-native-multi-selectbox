import type { ReactNode } from 'react'
import type {
  DimensionValue,
  FlatListProps,
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
  multiSelectInputFieldProps?: Partial<FlatListProps<SelectOption>>
  listOptionProps?: Partial<FlatListProps<SelectOption>>
  inputFilterContainerStyle?: StyleProp<ViewStyle>
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
  /** Selected option in single-select mode. Empty object is treated as no selection. */
  value?: SelectOption | Record<string, never> | null
  onChange?: (option: SelectOption) => void
  selectedValues?: never
  onMultiSelect?: never
  onTapClose?: never
}

export type SelectBoxMultiProps = SelectBoxSharedProps & {
  isMulti: true
  selectedValues?: SelectOption[]
  onMultiSelect?: (option: SelectOption) => void
  onTapClose?: (option: SelectOption) => void
  value?: never
  onChange?: never
}

/** Discriminated union: `isMulti: true` vs single-select. */
export type SelectBoxProps = SelectBoxSingleProps | SelectBoxMultiProps
