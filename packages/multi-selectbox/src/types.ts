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

/** Canonical option shape used internally and by most call sites. */
export type SelectOption = {
  id: string | number
  item: string
}

/** Loose option row before coercion via optionIdKey / optionLabelKey. */
export type SelectOptionInput = SelectOption | Record<string, unknown>

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

export type OptionsAlign = 'left' | 'center' | 'right'

/** Style and chrome props shared by single- and multi-select modes. */
export type SelectBoxSharedProps = {
  label?: string
  labelStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Option rows. Prefer `{ id, item }[]`. For other shapes use `optionIdKey` / `optionLabelKey`
   * (e.g. `{ id, name }` with `optionLabelKey="name"`).
   */
  options?: ReadonlyArray<SelectOptionInput>
  /** Property used as option id when coercing `options` (default `id`). */
  optionIdKey?: string
  /** Property used as option label when coercing `options` (default `item`). */
  optionLabelKey?: string
  inputPlaceholder?: string
  hideInputFilter?: boolean
  width?: DimensionValue
  selectIcon?: ReactNode
  /** Hide the field chevron entirely. */
  hideDropdownIcon?: boolean
  /** When false, the field does not open/close (read-only display). Default true. */
  editable?: boolean
  /** Start with the options panel open. */
  defaultOpen?: boolean
  /** Called when the options panel opens or closes. */
  onOpenChange?: (open: boolean) => void
  /**
   * Max height for the options panel (overrides default 180). Use a large value for a tall list;
   * pair with flex parents as needed.
   */
  optionsMaxHeight?: number
  /** Align option row labels (`left` | `center` | `right`). */
  optionsAlign?: OptionsAlign
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
  /** Label style for options that are currently selected (multi) or match single value. */
  activeOptionsLabelStyle?: StyleProp<TextStyle>
  optionContainerStyle?: StyleProp<ViewStyle>
  multiOptionContainerStyle?: StyleProp<ViewStyle>
  multiOptionsLabelStyle?: StyleProp<TextStyle>
  /** Hide the remove (×) control on multi-select chips. */
  hideChipClose?: boolean
  /** Optional leading node on each multi chip (e.g. avatar). */
  renderMultiChipLeading?: (option: SelectOption) => ReactNode
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
  maxSelected?: never
}

export type SelectBoxMultiProps = SelectBoxSharedProps & {
  isMulti: true
  /** Controlled selected options (defaults to `[]`). */
  selectedValues?: ReadonlyArray<SelectOptionInput>
  onMultiSelect?: (option: SelectOption) => void
  onTapClose?: (option: SelectOption) => void
  /** Maximum number of selected options; further adds are ignored until one is removed. */
  maxSelected?: number
  value?: never
  onChange?: never
}

/** Discriminated union: `isMulti: true` vs single-select. */
export type SelectBoxProps = SelectBoxSingleProps | SelectBoxMultiProps
