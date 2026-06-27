import { memo, useMemo, useState, type ReactElement } from 'react'
import { isEmpty, find } from 'lodash'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import Colors from './constants/Colors'
import Icon from './components/Icon'
import Toggle from './components/Toggle'
import type { SelectBoxProps, SelectOption } from './types'
import { TEST_IDS } from './testIDs'

const hitSlop = { top: 14, bottom: 14, left: 14, right: 14 } as const

const kOptionsHeight: ViewStyle = { width: '100%', maxHeight: 180 }

const kOptionListViewStyle: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  paddingVertical: 4,
}

const renderItemStyle: ViewStyle = { flexShrink: 1 }

const DEFAULT_OPTIONS: SelectOption[] = []

function normalizeOptions(options: SelectOption[] | undefined): SelectOption[] {
  return Array.isArray(options) ? options : DEFAULT_OPTIONS
}

function readSelectedItemText(
  value: SelectOption | Record<string, never> | null | undefined,
): string {
  if (value && typeof value === 'object' && 'item' in value && typeof value.item === 'string') {
    return value.item
  }
  return ''
}

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
    listOptionProps = {},
  } = props

  const options = normalizeOptions(optionsProp)
  const selectedValues = isMulti
    ? normalizeOptions((props as Extract<SelectBoxProps, { isMulti: true }>).selectedValues)
    : DEFAULT_OPTIONS
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

  const [inputValue, setInputValue] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  const filteredSuggestions = useMemo(() => {
    const q = inputValue.toLowerCase()
    return options.filter((suggestion) => suggestion.item.toLowerCase().includes(q))
  }, [inputValue, options])

  const selectedItemText = readSelectedItemText(value)

  const toggleOptions = () => {
    setShowOptions((open) => {
      const next = !open
      if (!next) {
        setInputValue('')
      }
      return next
    })
  }

  function renderLabel(itemLabel: string) {
    const kOptionsLabelStyle: StyleProp<TextStyle> = [
      {
        fontSize: 17,
        color: 'rgba(60, 60, 67, 0.6)',
      },
      optionsLabelStyle,
    ]
    return <Text style={kOptionsLabelStyle}>{itemLabel}</Text>
  }

  function renderOptionRow(item: SelectOption) {
    const kOptionContainerStyle: StyleProp<ViewStyle> = [
      {
        borderColor: '#dadada',
        borderBottomWidth: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingRight: 10,
        justifyContent: 'space-between',
      },
      optionContainerStyle,
    ]

    if (isMulti) {
      const checked = selectedValues.some((i) => item.id === i.id)
      const onPressMulti = () => {
        onMultiSelect?.(item)
      }
      return (
        <View key={String(item.id)} style={kOptionContainerStyle}>
          <TouchableOpacity
            testID={TEST_IDS.option(item.id)}
            hitSlop={hitSlop}
            style={renderItemStyle}
            onPress={onPressMulti}
          >
            {renderLabel(item.item)}
          </TouchableOpacity>
          <Toggle iconColor={toggleIconColor} checked={checked} onTouch={onPressMulti} />
        </View>
      )
    }

    const onPressSingle = () => {
      setShowOptions(false)
      setInputValue('')
      onChange?.(item)
    }

    return (
      <View key={String(item.id)} style={kOptionContainerStyle}>
        <TouchableOpacity
          testID={TEST_IDS.option(item.id)}
          hitSlop={hitSlop}
          style={renderItemStyle}
          onPress={onPressSingle}
        >
          {renderLabel(item.item)}
          <View />
        </TouchableOpacity>
      </View>
    )
  }

  function renderChip(item: SelectOption) {
    const matched = find(options, (o) => o.id === item.id)
    const chipLabel = matched?.item ?? item.item
    const kMultiOptionContainerStyle: StyleProp<ViewStyle> = [
      {
        flexDirection: 'row',
        borderRadius: 20,
        paddingVertical: 5,
        paddingRight: 5,
        paddingLeft: 10,
        marginRight: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        flexGrow: 1,
      },
      multiOptionContainerStyle,
    ]
    const kMultiOptionsLabelStyle: StyleProp<TextStyle> = [
      {
        fontSize: 10,
        color: '#fff',
      },
      multiOptionsLabelStyle,
    ]
    return (
      <View
        key={String(item.id)}
        style={kMultiOptionContainerStyle}
        testID={TEST_IDS.multiChip(item.id)}
      >
        <Text style={kMultiOptionsLabelStyle}>{chipLabel}</Text>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          hitSlop={hitSlop}
          onPress={() => onTapClose?.(item)}
        >
          <Icon name="closeCircle" fill="#fff" width={21} height={21} />
        </TouchableOpacity>
      </View>
    )
  }

  function multiListEmpty() {
    const kMultiListEmptyLabelStyle: StyleProp<TextStyle> = [
      {
        fontSize: 17,
        color: 'rgba(60, 60, 67, 0.3)',
      },
      multiListEmptyLabelStyle,
    ]
    return (
      <TouchableOpacity
        testID={TEST_IDS.multiEmpty}
        style={{ flexGrow: 1, width: '100%' }}
        hitSlop={hitSlop}
        onPress={toggleOptions}
      >
        <Text style={kMultiListEmptyLabelStyle}>{inputPlaceholder}</Text>
      </TouchableOpacity>
    )
  }

  function optionListEmpty() {
    const kListEmptyLabelStyle: StyleProp<TextStyle> = [
      {
        fontSize: 17,
        color: 'rgba(60, 60, 67, 0.6)',
      },
      listEmptyLabelStyle,
    ]
    return (
      <View style={kOptionListViewStyle} testID={TEST_IDS.listEmpty}>
        <Text style={kListEmptyLabelStyle}>{listEmptyText}</Text>
      </View>
    )
  }

  const kLabelStyle: StyleProp<TextStyle> = [
    {
      fontSize: 12,
      color: 'rgba(60, 60, 67, 0.6)',
      paddingBottom: 4,
    },
    labelStyle,
  ]

  const kContainerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      width: '100%',
      borderColor: '#ddd',
      borderBottomWidth: 1,
      paddingTop: 6,
      paddingRight: 20,
      paddingBottom: 8,
    },
    containerStyle,
  ]

  const kSelectedItemStyleValue: StyleProp<TextStyle> = [
    {
      fontSize: 17,
      color: isEmpty(selectedItemText) ? 'rgba(60, 60, 67, 0.3)' : '#000',
    },
    selectedItemStyle,
  ]

  // Defaults first, then inputFilterStyle, then searchInputProps.style so explicit props win in order:
  // inputFilterStyle must beat hardcoded color; searchInputProps can still override if needed.
  const kInputFilterStyle: StyleProp<TextStyle> = [
    {
      paddingVertical: 14,
      paddingRight: 8,
      color: '#000',
      fontSize: 12,
      flexGrow: 1,
    },
    inputFilterStyle,
    searchInputProps?.style,
  ]
  const flattenedFilterStyle = StyleSheet.flatten(kInputFilterStyle)
  const placeholderTextColor =
    searchInputProps?.placeholderTextColor ??
    (typeof flattenedFilterStyle?.color === 'string' ? flattenedFilterStyle.color : '#000')

  const { style: searchInputStyleIgnored, ...restSearchInputProps } = searchInputProps ?? {}
  void searchInputStyleIgnored

  const kInputFilterContainerStyle: StyleProp<ViewStyle> = [
    {
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 18,
      justifyContent: 'space-between',
    },
    inputFilterContainerStyle,
  ]

  const {
    style: listOptionStyle,
    contentContainerStyle: listContentStyle,
    keyboardShouldPersistTaps = 'handled',
    nestedScrollEnabled = true,
    ...restListOptionProps
  } = listOptionProps

  const {
    style: multiFieldStyle,
    contentContainerStyle: multiFieldContentStyle,
    keyboardShouldPersistTaps: multiKbdTaps = 'handled',
    ...restMultiFieldProps
  } = multiSelectInputFieldProps ?? {}

  return (
    <View style={{ width }} testID={TEST_IDS.root}>
      <Text style={kLabelStyle} testID={TEST_IDS.label}>
        {label}
      </Text>
      <View style={kContainerStyle}>
        <View style={{ paddingRight: 20, flexGrow: 1 }}>
          {isMulti ? (
            selectedValues.length === 0 ? (
              multiListEmpty()
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps={multiKbdTaps}
                style={multiFieldStyle}
                contentContainerStyle={[{ alignItems: 'center' }, multiFieldContentStyle]}
                {...restMultiFieldProps}
              >
                {selectedValues.map(renderChip)}
              </ScrollView>
            )
          ) : (
            <TouchableOpacity
              testID={TEST_IDS.singleTrigger}
              hitSlop={hitSlop}
              onPress={toggleOptions}
            >
              <Text style={kSelectedItemStyleValue}>
                {selectedItemText || inputPlaceholder || label}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          testID={TEST_IDS.dropdownToggle}
          onPress={toggleOptions}
          hitSlop={hitSlop}
        >
          {selectIcon ? (
            selectIcon
          ) : (
            <Icon name={showOptions ? 'upArrow' : 'downArrow'} fill={arrowIconColor} />
          )}
        </TouchableOpacity>
      </View>
      {showOptions && (
        <ScrollView
          testID={TEST_IDS.optionsList}
          style={[kOptionsHeight, listOptionStyle]}
          contentContainerStyle={listContentStyle}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          nestedScrollEnabled={nestedScrollEnabled}
          {...restListOptionProps}
        >
          {!hideInputFilter && (
            <View style={kInputFilterContainerStyle}>
              <TextInput
                testID={TEST_IDS.filterInput}
                value={inputValue}
                placeholder={inputPlaceholder}
                onChangeText={setInputValue}
                style={kInputFilterStyle}
                placeholderTextColor={placeholderTextColor}
                {...restSearchInputProps}
              />
              <Icon name="searchBoxIcon" fill={searchIconColor} />
            </View>
          )}
          {filteredSuggestions.length === 0
            ? optionListEmpty()
            : filteredSuggestions.map(renderOptionRow)}
        </ScrollView>
      )}
    </View>
  )
}

export type { SelectBoxProps, SelectOption } from './types'
export default memo(SelectBox)
