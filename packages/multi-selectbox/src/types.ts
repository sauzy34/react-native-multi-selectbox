import type { ReactNode } from 'react'
import type {
  DimensionValue,
  FlatListProps,
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
 * Extra props for the options panel list.
 * When `virtualized` is true (default), this is a vertical FlatList (bounded height + nestedScrollEnabled).
 * When `virtualized` is false, this is a ScrollView (no VirtualizedList nesting warning).
 */
export type OptionsListProps = Omit<
  FlatListProps<SelectOption>,
  'data' | 'renderItem' | 'keyExtractor' | 'ListHeaderComponent' | 'ListEmptyComponent'
>

/** Extra props when options render as a non-virtualized ScrollView (`virtualized={false}`). */
export type OptionsScrollViewProps = Omit<ScrollViewProps, 'children'>

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
  /**
   * Called when the options panel opens or closes. Use with a parent ScrollView:
   * `scrollEnabled={!anyDropdownOpen}` to avoid fighting the options list scroll.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * When true (default), options use a vertical FlatList with maxHeight + nestedScrollEnabled
   * for better performance on large lists. May log RN’s nested VirtualizedList warning if the
   * SelectBox sits in a parent ScrollView with the same orientation — set to false to use
   * ScrollView+map instead (no virtualization, no that warning).
   */
  virtualized?: boolean
  /** Horizontal chips list props (multi mode). */
  multiSelectInputFieldProps?: MultiSelectFieldProps
  /** Dropdown options list props (FlatList when virtualized, else ignored for item rendering). */
  listOptionProps?: OptionsListProps
  /** Used only when `virtualized={false}` for the options panel ScrollView. */
  listScrollViewProps?: OptionsScrollViewProps
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
