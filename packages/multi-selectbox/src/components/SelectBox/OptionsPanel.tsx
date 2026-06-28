import type { ReactElement } from 'react'
import { ScrollView, type StyleProp, type TextStyle, type ViewStyle } from 'react-native'
import { optionsPanelStyle } from '../../constants/layout'
import { isOptionSelected } from '../../utils/options'
import { TEST_IDS } from '../../testIDs'
import type { OptionsListProps, SelectOption } from '../../types'
import { OptionsListEmpty } from './EmptyStates'
import { FilterInput } from './FilterInput'
import { OptionRow } from './OptionRow'
import type { TextInputProps } from 'react-native'

export type OptionsPanelProps = {
  options: SelectOption[]
  selectedValues: SelectOption[]
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

export function OptionsPanel({
  options,
  selectedValues,
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
  listOptionProps = {},
  onSelectOption,
}: OptionsPanelProps): ReactElement {
  const {
    style: listOptionStyle,
    contentContainerStyle: listContentStyle,
    keyboardShouldPersistTaps = 'handled',
    nestedScrollEnabled = true,
    ...restListOptionProps
  } = listOptionProps

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
            checked={isMulti ? isOptionSelected(selectedValues, item) : false}
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
