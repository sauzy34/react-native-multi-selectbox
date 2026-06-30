import { memo, useCallback, type ReactElement } from 'react'
import {
  FlatList,
  ScrollView,
  type ListRenderItem,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
  type TextInputProps,
} from 'react-native'
import { optionsPanelStyle } from '../../constants/layout'
import { TEST_IDS } from '../../testIDs'
import type { OptionsListProps, OptionsScrollViewProps, SelectOption } from '../../types'
import { OptionsListEmpty } from './EmptyStates'
import FilterInput from './FilterInput'
import OptionRow from './OptionRow'

export type OptionsPanelProps = {
  options: SelectOption[]
  selectedIdSet: ReadonlySet<string | number>
  isMulti: boolean
  /** Prefer FlatList when true; ScrollView+map when false (default false — safer under scroll hosts). */
  virtualized?: boolean | undefined
  inputValue: string
  onChangeInput: (text: string) => void
  inputPlaceholder: string
  hideInputFilter?: boolean | undefined
  listEmptyText: string
  searchIconColor: string
  toggleIconColor?: string | undefined
  inputFilterStyle?: StyleProp<TextStyle> | undefined
  inputFilterContainerStyle?: StyleProp<ViewStyle> | undefined
  searchInputProps?: TextInputProps | undefined
  optionsLabelStyle?: StyleProp<TextStyle> | undefined
  optionContainerStyle?: StyleProp<ViewStyle> | undefined
  listEmptyLabelStyle?: StyleProp<TextStyle> | undefined
  listOptionProps?: OptionsListProps | undefined
  listScrollViewProps?: OptionsScrollViewProps | undefined
  onSelectOption: (item: SelectOption) => void
}

function OptionsPanel({
  options,
  selectedIdSet,
  isMulti,
  virtualized = false,
  inputValue,
  onChangeInput,
  inputPlaceholder,
  hideInputFilter,
  listEmptyText,
  searchIconColor,
  toggleIconColor,
  inputFilterStyle,
  inputFilterContainerStyle,
  searchInputProps,
  optionsLabelStyle,
  optionContainerStyle,
  listEmptyLabelStyle,
  listOptionProps,
  listScrollViewProps,
  onSelectOption,
}: OptionsPanelProps): ReactElement {
  const filterHeader = hideInputFilter ? null : (
    <FilterInput
      value={inputValue}
      onChangeText={onChangeInput}
      placeholder={inputPlaceholder}
      searchIconColor={searchIconColor}
      inputFilterStyle={inputFilterStyle}
      inputFilterContainerStyle={inputFilterContainerStyle}
      searchInputProps={searchInputProps}
    />
  )

  const renderItem: ListRenderItem<SelectOption> = useCallback(
    ({ item }) => (
      <OptionRow
        item={item}
        isMulti={isMulti}
        checked={isMulti ? selectedIdSet.has(item.id) : false}
        toggleIconColor={toggleIconColor}
        optionsLabelStyle={optionsLabelStyle}
        optionContainerStyle={optionContainerStyle}
        onPress={onSelectOption}
      />
    ),
    [
      isMulti,
      selectedIdSet,
      toggleIconColor,
      optionsLabelStyle,
      optionContainerStyle,
      onSelectOption,
    ],
  )

  const keyExtractor = useCallback((item: SelectOption) => String(item.id), [])

  const empty = (
    <OptionsListEmpty listEmptyText={listEmptyText} listEmptyLabelStyle={listEmptyLabelStyle} />
  )

  if (!virtualized) {
    const {
      style: scrollStyle,
      contentContainerStyle,
      keyboardShouldPersistTaps = 'handled',
      nestedScrollEnabled = true,
      ...restScroll
    } = listScrollViewProps ?? {}

    return (
      <ScrollView
        testID={TEST_IDS.optionsList}
        style={[optionsPanelStyle, scrollStyle]}
        contentContainerStyle={contentContainerStyle}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        nestedScrollEnabled={nestedScrollEnabled}
        {...restScroll}
      >
        {filterHeader}
        {options.length === 0
          ? empty
          : options.map((item) => (
              <OptionRow
                key={String(item.id)}
                item={item}
                isMulti={isMulti}
                checked={isMulti ? selectedIdSet.has(item.id) : false}
                toggleIconColor={toggleIconColor}
                optionsLabelStyle={optionsLabelStyle}
                optionContainerStyle={optionContainerStyle}
                onPress={onSelectOption}
              />
            ))}
      </ScrollView>
    )
  }

  const {
    style: listOptionStyle,
    contentContainerStyle: listContentStyle,
    keyboardShouldPersistTaps = 'handled',
    nestedScrollEnabled = true,
    initialNumToRender = 8,
    maxToRenderPerBatch = 16,
    windowSize = 5,
    ...restListOptionProps
  } = listOptionProps ?? {}

  // Bounded height + nestedScrollEnabled. Opt in with virtualized={true} for large option lists (no scroll parent).
  return (
    <FlatList
      testID={TEST_IDS.optionsList}
      data={options}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={filterHeader}
      ListEmptyComponent={empty}
      style={[optionsPanelStyle, listOptionStyle]}
      contentContainerStyle={listContentStyle}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      nestedScrollEnabled={nestedScrollEnabled}
      initialNumToRender={initialNumToRender}
      maxToRenderPerBatch={maxToRenderPerBatch}
      windowSize={windowSize}
      {...restListOptionProps}
    />
  )
}

export default memo(OptionsPanel)
