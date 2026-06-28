import { memo, type ReactElement } from 'react'
import {
  ScrollView,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
  type TextInputProps,
} from 'react-native'
import { optionsPanelStyle } from '../../constants/layout'
import { TEST_IDS } from '../../testIDs'
import type { OptionsListProps, SelectOption } from '../../types'
import { OptionsListEmpty } from './EmptyStates'
import FilterInput from './FilterInput'
import OptionRow from './OptionRow'

export type OptionsPanelProps = {
  options: SelectOption[]
  /** Precomputed selected ids for O(1) checked state (multi). */
  selectedIdSet: ReadonlySet<string | number>
  isMulti: boolean
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
  onSelectOption: (item: SelectOption) => void
}

function OptionsPanel({
  options,
  selectedIdSet,
  isMulti,
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
  onSelectOption,
}: OptionsPanelProps): ReactElement {
  const {
    style: listOptionStyle,
    contentContainerStyle: listContentStyle,
    keyboardShouldPersistTaps = 'handled',
    nestedScrollEnabled = true,
    ...restListOptionProps
  } = listOptionProps ?? {}

  return (
    <ScrollView
      testID={TEST_IDS.optionsList}
      style={[optionsPanelStyle, listOptionStyle]}
      contentContainerStyle={listContentStyle}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      nestedScrollEnabled={nestedScrollEnabled}
      {...restListOptionProps}
    >
      {!hideInputFilter && (
        <FilterInput
          value={inputValue}
          onChangeText={onChangeInput}
          placeholder={inputPlaceholder}
          searchIconColor={searchIconColor}
          inputFilterStyle={inputFilterStyle}
          inputFilterContainerStyle={inputFilterContainerStyle}
          searchInputProps={searchInputProps}
        />
      )}
      {options.length === 0 ? (
        <OptionsListEmpty listEmptyText={listEmptyText} listEmptyLabelStyle={listEmptyLabelStyle} />
      ) : (
        options.map((item) => (
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
        ))
      )}
    </ScrollView>
  )
}

export default memo(OptionsPanel)
