import type { ComponentType, ReactNode } from 'react'
import type { StyleProp, TextInputProps, TextStyle, ViewStyle, FlatListProps } from 'react-native'

export type SelectOption = {
  id: string | number
  item: string
}

/** Minimal ambient types until Phase 4 full discriminated unions. */
export type SelectBoxProps = {
  label?: string
  labelStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  options?: SelectOption[]
  value?: SelectOption | Record<string, never> | null
  selectedValues?: SelectOption[]
  isMulti?: boolean
  onChange?: (option: SelectOption) => void
  onMultiSelect?: (option: SelectOption) => void
  onTapClose?: (option: SelectOption) => void
  inputPlaceholder?: string
  hideInputFilter?: boolean
  width?: string | number
  selectIcon?: ReactNode
  arrowIconColor?: string
  searchIconColor?: string
  toggleIconColor?: string
  searchInputProps?: TextInputProps
  multiSelectInputFieldProps?: object
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

declare const SelectBox: ComponentType<SelectBoxProps>
export default SelectBox
