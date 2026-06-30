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
 * When `virtualized` is true, this is a vertical FlatList (bounded height + nestedScrollEnabled).
 * When `virtualized` is false (default), this is a ScrollView (nested-host safe).
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
   * When false (default), options use a bounded ScrollView + `.map()` — safe inside vertical
   * ScrollView / FlatList / SectionList hosts (no nested VirtualizedList warning).
   * Set `true` for large option lists when SelectBox is **not** under another vertical scroll
   * parent (standalone field / non-scrolling modal) to use FlatList + windowing.
   */
  virtualized?: boolean
  /** Horizontal chips list props (multi mode). */
  multiSelectInputFieldProps?: MultiSelectFieldProps
  /** Dropdown options list props (FlatList when `virtualized={true}`). */
  listOptionProps?: OptionsListProps
  /** Options panel ScrollView props when `virtualized` is false (default). */
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
