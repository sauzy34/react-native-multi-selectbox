import { memo, useCallback, type ReactElement } from 'react'
import {
  FlatList,
  ScrollView,
  View,
  type ListRenderItem,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
  type TextInputProps,
} from 'react-native'
import { optionsPanelStyle } from '../../constants/layout'
import { TEST_IDS } from '../../testIDs'
import type {
  OptionsAlign,
  OptionsListProps,
  OptionsScrollViewProps,
  SelectOption,
} from '../../types'
import { OptionsListEmpty } from './EmptyStates'
import FilterInput from './FilterInput'
import OptionRow from './OptionRow'

export type OptionsPanelProps = {
  options: SelectOption[]
  selectedIdSet: ReadonlySet<string | number>
  singleSelectedId?: string | number | undefined
  isMulti: boolean
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
  activeOptionsLabelStyle?: StyleProp<TextStyle> | undefined
  optionContainerStyle?: StyleProp<ViewStyle> | undefined
  listEmptyLabelStyle?: StyleProp<TextStyle> | undefined
  optionsAlign?: OptionsAlign | undefined
  optionsMaxHeight?: number | undefined
  listOptionProps?: OptionsListProps | undefined
  listScrollViewProps?: OptionsScrollViewProps | undefined
  onSelectOption: (item: SelectOption) => void
}

function OptionsPanel({
  options,
  selectedIdSet,
  singleSelectedId,
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
  activeOptionsLabelStyle,
  optionContainerStyle,
  listEmptyLabelStyle,
  optionsAlign,
  optionsMaxHeight,
  listOptionProps,
  listScrollViewProps,
  onSelectOption,
}: OptionsPanelProps): ReactElement {
  const panelStyle: StyleProp<ViewStyle> = [
    optionsPanelStyle,
    optionsMaxHeight !== undefined ? { maxHeight: optionsMaxHeight } : null,
  ]

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

  const renderRow = useCallback(
    (item: SelectOption) => {
      const checked = isMulti ? selectedIdSet.has(item.id) : false
      const active = isMulti ? checked : singleSelectedId === item.id
      return (
        <OptionRow
          item={item}
          isMulti={isMulti}
          checked={checked}
          active={active}
          toggleIconColor={toggleIconColor}
          optionsLabelStyle={optionsLabelStyle}
          activeOptionsLabelStyle={activeOptionsLabelStyle}
          optionContainerStyle={optionContainerStyle}
          optionsAlign={optionsAlign}
          onPress={onSelectOption}
        />
      )
    },
    [
      activeOptionsLabelStyle,
      isMulti,
      onSelectOption,
      optionContainerStyle,
      optionsAlign,
      optionsLabelStyle,
      selectedIdSet,
      singleSelectedId,
      toggleIconColor,
    ],
  )

  const renderItem: ListRenderItem<SelectOption> = useCallback(
    ({ item }) => renderRow(item),
    [renderRow],
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
        style={[panelStyle, scrollStyle]}
        contentContainerStyle={contentContainerStyle}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        nestedScrollEnabled={nestedScrollEnabled}
        {...restScroll}
      >
        {filterHeader}
        {options.length === 0
          ? empty
          : options.map((item) => <View key={String(item.id)}>{renderRow(item)}</View>)}
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

  return (
    <FlatList
      testID={TEST_IDS.optionsList}
      data={options}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={filterHeader}
      ListEmptyComponent={empty}
      style={[panelStyle, listOptionStyle]}
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

// Need View import for non-virtualized map wrapper - fix OptionsPanel imports
export default memo(OptionsPanel)
