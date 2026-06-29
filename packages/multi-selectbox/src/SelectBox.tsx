import { memo, useCallback, useMemo, useState, type ReactElement } from 'react'
import { Text, View, type StyleProp, type TextStyle } from 'react-native'
import Colors from './constants/Colors'
import SelectField from './components/SelectBox/SelectField'
import OptionsPanel from './components/SelectBox/OptionsPanel'
import {
  EMPTY_OBJECT,
  EMPTY_OPTIONS,
  buildOptionLabelById,
  buildSelectedIdSet,
  filterOptions,
  normalizeOptions,
  readSelectedItemText,
} from './utils/options'
import { TEST_IDS } from './testIDs'
import type { OptionsListProps, SelectBoxProps, SelectOption } from './types'

const EMPTY_ID_SET: ReadonlySet<string | number> = new Set()

function SelectBox(props: SelectBoxProps): ReactElement {
  const {
    labelStyle,
    containerStyle,
    inputFilterContainerStyle,
    inputFilterStyle,
    optionsLabelStyle,
    optionContainerStyle,
    multiOptionContainerStyle,
    multiOptionsLabelStyle,
    multiListEmptyLabelStyle,
    listEmptyLabelStyle,
    selectedItemStyle,
    listEmptyText = 'No results found',
    selectIcon,
    label = 'Label',
    inputPlaceholder = 'Select',
    hideInputFilter,
    width = '100%',
    isMulti = false,
    options: optionsProp,
    arrowIconColor = Colors.primary,
    searchIconColor = Colors.primary,
    toggleIconColor = Colors.primary,
    searchInputProps,
    multiSelectInputFieldProps,
    listOptionProps,
    listScrollViewProps,
    virtualized = true,
  } = props

  const options = normalizeOptions(optionsProp)
  const selectedValues = isMulti
    ? normalizeOptions((props as Extract<SelectBoxProps, { isMulti: true }>).selectedValues)
    : EMPTY_OPTIONS
  const value = !isMulti
    ? ((props as Extract<SelectBoxProps, { isMulti?: false }>).value ?? null)
    : null
  const onChange = !isMulti
    ? (props as Extract<SelectBoxProps, { isMulti?: false }>).onChange
    : undefined
  const onMultiSelect = isMulti
    ? (props as Extract<SelectBoxProps, { isMulti: true }>).onMultiSelect
    : undefined
  const onTapClose = isMulti
    ? (props as Extract<SelectBoxProps, { isMulti: true }>).onTapClose
    : undefined

  const resolvedListOptionProps = (listOptionProps ?? EMPTY_OBJECT) as OptionsListProps

  const [inputValue, setInputValue] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  const filteredSuggestions = useMemo(
    () => filterOptions(options, inputValue),
    [inputValue, options],
  )

  const selectedIdSet = useMemo(
    () => (isMulti ? buildSelectedIdSet(selectedValues) : EMPTY_ID_SET),
    [isMulti, selectedValues],
  )

  const optionLabelById = useMemo(() => buildOptionLabelById(options), [options])

  const selectedItemText = readSelectedItemText(value)

  const toggleOptions = useCallback(() => {
    setShowOptions((open) => {
      const next = !open
      if (!next) {
        setInputValue('')
      }
      return next
    })
  }, [])

  const handleSelectOption = useCallback(
    (item: SelectOption) => {
      if (isMulti) {
        onMultiSelect?.(item)
        return
      }
      setShowOptions(false)
      setInputValue('')
      onChange?.(item)
    },
    [isMulti, onChange, onMultiSelect],
  )

  const fieldLabelStyle: StyleProp<TextStyle> = [
    {
      fontSize: 12,
      color: 'rgba(60, 60, 67, 0.6)',
      paddingBottom: 4,
    },
    labelStyle,
  ]

  return (
    <View style={{ width }} testID={TEST_IDS.root}>
      <Text style={fieldLabelStyle} testID={TEST_IDS.label}>
        {label}
      </Text>
      <SelectField
        isMulti={Boolean(isMulti)}
        label={label}
        inputPlaceholder={inputPlaceholder}
        selectedItemText={selectedItemText}
        showOptions={showOptions}
        selectIcon={selectIcon}
        arrowIconColor={arrowIconColor}
        containerStyle={containerStyle}
        selectedItemStyle={selectedItemStyle}
        optionLabelById={optionLabelById}
        selectedValues={selectedValues}
        multiOptionContainerStyle={multiOptionContainerStyle}
        multiOptionsLabelStyle={multiOptionsLabelStyle}
        multiListEmptyLabelStyle={multiListEmptyLabelStyle}
        multiSelectInputFieldProps={multiSelectInputFieldProps}
        onTapClose={onTapClose}
        onToggleOpen={toggleOptions}
      />
      {showOptions && (
        <OptionsPanel
          options={filteredSuggestions}
          selectedIdSet={selectedIdSet}
          isMulti={Boolean(isMulti)}
          inputValue={inputValue}
          onChangeInput={setInputValue}
          inputPlaceholder={inputPlaceholder}
          hideInputFilter={hideInputFilter}
          listEmptyText={listEmptyText}
          searchIconColor={searchIconColor}
          toggleIconColor={toggleIconColor}
          inputFilterStyle={inputFilterStyle}
          inputFilterContainerStyle={inputFilterContainerStyle}
          searchInputProps={searchInputProps}
          optionsLabelStyle={optionsLabelStyle}
          optionContainerStyle={optionContainerStyle}
          listEmptyLabelStyle={listEmptyLabelStyle}
          virtualized={virtualized}
          listOptionProps={resolvedListOptionProps}
          listScrollViewProps={listScrollViewProps}
          onSelectOption={handleSelectOption}
        />
      )}
    </View>
  )
}

export type { SelectBoxProps, SelectOption } from './types'
export default memo(SelectBox)
