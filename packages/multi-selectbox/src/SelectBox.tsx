import { memo, useCallback, useEffect, useMemo, useRef, useState, type ReactElement } from 'react'
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
    activeOptionsLabelStyle,
    optionContainerStyle,
    multiOptionContainerStyle,
    multiOptionsLabelStyle,
    multiListEmptyLabelStyle,
    listEmptyLabelStyle,
    selectedItemStyle,
    listEmptyText = 'No results found',
    selectIcon,
    hideDropdownIcon = false,
    editable = true,
    defaultOpen = false,
    onOpenChange,
    optionsMaxHeight,
    optionsAlign,
    label = 'Label',
    inputPlaceholder = 'Select',
    hideInputFilter,
    width = '100%',
    isMulti = false,
    options: optionsProp,
    optionIdKey = 'id',
    optionLabelKey = 'item',
    arrowIconColor = Colors.primary,
    searchIconColor = Colors.primary,
    toggleIconColor = Colors.primary,
    searchInputProps,
    multiSelectInputFieldProps,
    listOptionProps,
    listScrollViewProps,
    virtualized = false,
    hideChipClose = false,
    renderMultiChipLeading,
  } = props

  const options = useMemo(
    () => normalizeOptions(optionsProp, optionIdKey, optionLabelKey),
    [optionsProp, optionIdKey, optionLabelKey],
  )
  const selectedValuesProp = isMulti
    ? (props as Extract<SelectBoxProps, { isMulti: true }>).selectedValues
    : undefined
  const selectedValues = useMemo(
    () =>
      isMulti ? normalizeOptions(selectedValuesProp, optionIdKey, optionLabelKey) : EMPTY_OPTIONS,
    [isMulti, optionIdKey, optionLabelKey, selectedValuesProp],
  )
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
  const maxSelected = isMulti
    ? (props as Extract<SelectBoxProps, { isMulti: true }>).maxSelected
    : undefined

  const resolvedListOptionProps = (listOptionProps ?? EMPTY_OBJECT) as OptionsListProps

  const [inputValue, setInputValue] = useState('')
  const [showOptions, setShowOptions] = useState(defaultOpen)
  const mountedRef = useRef(true)
  const onOpenChangeRef = useRef(onOpenChange)
  onOpenChangeRef.current = onOpenChange

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const setOpen = useCallback((next: boolean) => {
    if (!mountedRef.current) {
      return
    }
    setShowOptions((prev) => {
      if (prev === next) {
        return prev
      }
      if (!next) {
        setInputValue('')
      }
      onOpenChangeRef.current?.(next)
      return next
    })
  }, [])

  const filteredSuggestions = useMemo(
    () => filterOptions(options, inputValue),
    [inputValue, options],
  )

  const selectedIdSet = useMemo(
    () => (isMulti ? buildSelectedIdSet(selectedValues) : EMPTY_ID_SET),
    [isMulti, selectedValues],
  )

  const singleSelectedId =
    !isMulti && value && typeof value === 'object' && 'id' in value ? value.id : undefined

  const optionLabelById = useMemo(() => buildOptionLabelById(options), [options])

  const selectedItemText = readSelectedItemText(value)

  const toggleOptions = useCallback(() => {
    if (!editable) {
      return
    }
    setShowOptions((open) => {
      if (!mountedRef.current) {
        return open
      }
      const next = !open
      if (!next) {
        setInputValue('')
      }
      onOpenChangeRef.current?.(next)
      return next
    })
  }, [editable])

  const handleSelectOption = useCallback(
    (item: SelectOption) => {
      if (isMulti) {
        const already = selectedIdSet.has(item.id)
        if (
          !already &&
          typeof maxSelected === 'number' &&
          maxSelected >= 0 &&
          selectedValues.length >= maxSelected
        ) {
          return
        }
        onMultiSelect?.(item)
        return
      }
      setOpen(false)
      onChange?.(item)
    },
    [isMulti, maxSelected, onChange, onMultiSelect, selectedIdSet, selectedValues.length, setOpen],
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
        hideDropdownIcon={hideDropdownIcon}
        editable={editable}
        arrowIconColor={arrowIconColor}
        containerStyle={containerStyle}
        selectedItemStyle={selectedItemStyle}
        optionLabelById={optionLabelById}
        selectedValues={selectedValues}
        multiOptionContainerStyle={multiOptionContainerStyle}
        multiOptionsLabelStyle={multiOptionsLabelStyle}
        multiListEmptyLabelStyle={multiListEmptyLabelStyle}
        multiSelectInputFieldProps={multiSelectInputFieldProps}
        hideChipClose={hideChipClose}
        renderMultiChipLeading={renderMultiChipLeading}
        onTapClose={onTapClose}
        onToggleOpen={toggleOptions}
      />
      {showOptions && (
        <OptionsPanel
          options={filteredSuggestions}
          selectedIdSet={selectedIdSet}
          singleSelectedId={singleSelectedId}
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
          activeOptionsLabelStyle={activeOptionsLabelStyle}
          optionContainerStyle={optionContainerStyle}
          listEmptyLabelStyle={listEmptyLabelStyle}
          optionsAlign={optionsAlign}
          optionsMaxHeight={optionsMaxHeight}
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
