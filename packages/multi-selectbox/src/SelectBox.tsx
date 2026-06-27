import { memo, useMemo, useState, type ReactElement } from 'react'
import { isEmpty, find } from 'lodash'
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  type ListRenderItem,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import Colors from './constants/Colors'
import Icon from './components/Icon'
import Toggle from './components/Toggle'
import type { SelectBoxProps, SelectOption } from './types'

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

  const selectedItemText =
    value && typeof value === 'object' && 'item' in value && typeof value.item === 'string'
      ? value.item
      : ''

  function renderLabel(itemLabel: string) {
    const kOptionsLabelStyle: StyleProp<TextStyle> = {
      fontSize: 17,
      color: 'rgba(60, 60, 67, 0.6)',
      ...(optionsLabelStyle as object),
    }
    return <Text style={kOptionsLabelStyle}>{itemLabel}</Text>
  }

  const renderItem: ListRenderItem<SelectOption> = ({ item }) => {
    const kOptionContainerStyle: StyleProp<ViewStyle> = {
      borderColor: '#dadada',
      borderBottomWidth: 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingVertical: 12,
      paddingRight: 10,
      justifyContent: 'space-between',
      ...(optionContainerStyle as object),
    }

    if (isMulti) {
      const checked = selectedValues.some((i) => item.id === i.id)
      const onPressMulti = () => {
        onMultiSelect?.(item)
      }
      return (
        <View style={kOptionContainerStyle}>
          <TouchableOpacity hitSlop={hitSlop} style={renderItemStyle} onPress={onPressMulti}>
            {renderLabel(item.item)}
          </TouchableOpacity>
          <Toggle iconColor={toggleIconColor} checked={checked} onTouch={onPressMulti} />
        </View>
      )
    }

    const onPressSingle = () => {
      setShowOptions(false)
      onChange?.(item)
    }

    return (
      <View style={kOptionContainerStyle}>
        <TouchableOpacity hitSlop={hitSlop} style={renderItemStyle} onPress={onPressSingle}>
          {renderLabel(item.item)}
          <View />
        </TouchableOpacity>
      </View>
    )
  }

  const renderGroupItem: ListRenderItem<SelectOption> = ({ item }) => {
    const matched = find(options, (o) => o.id === item.id)
    const chipLabel = matched?.item ?? item.item
    const kMultiOptionContainerStyle: StyleProp<ViewStyle> = {
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
      ...(multiOptionContainerStyle as object),
    }
    const kMultiOptionsLabelStyle: StyleProp<TextStyle> = {
      fontSize: 10,
      color: '#fff',
      ...(multiOptionsLabelStyle as object),
    }
    return (
      <View style={kMultiOptionContainerStyle}>
        <Text style={kMultiOptionsLabelStyle}>{chipLabel}</Text>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          hitSlop={hitSlop}
          onPress={() => onTapClose?.(item)}>
          <Icon name="closeCircle" fill="#fff" width={21} height={21} />
        </TouchableOpacity>
      </View>
    )
  }

  function multiListEmptyComponent() {
    const kMultiListEmptyLabelStyle: StyleProp<TextStyle> = {
      fontSize: 17,
      color: 'rgba(60, 60, 67, 0.3)',
      ...(multiListEmptyLabelStyle as object),
    }
    return (
      <TouchableOpacity
        style={{ flexGrow: 1, width: '100%' }}
        hitSlop={hitSlop}
        onPress={() => setShowOptions((open) => !open)}>
        <Text style={kMultiListEmptyLabelStyle}>{inputPlaceholder}</Text>
      </TouchableOpacity>
    )
  }

  function optionListEmpty() {
    const kListEmptyLabelStyle: StyleProp<TextStyle> = {
      fontSize: 17,
      color: 'rgba(60, 60, 67, 0.6)',
      ...(listEmptyLabelStyle as object),
    }
    return (
      <View style={kOptionListViewStyle}>
        <Text style={kListEmptyLabelStyle}>{listEmptyText}</Text>
      </View>
    )
  }

  const kLabelStyle: StyleProp<TextStyle> = {
    fontSize: 12,
    color: 'rgba(60, 60, 67, 0.6)',
    paddingBottom: 4,
    ...(labelStyle as object),
  }

  const kContainerStyle: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    width: '100%',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    paddingTop: 6,
    paddingRight: 20,
    paddingBottom: 8,
    ...(containerStyle as object),
  }

  const kSelectedItemStyleValue: StyleProp<TextStyle> = {
    fontSize: 17,
    color: isEmpty(selectedItemText) ? 'rgba(60, 60, 67, 0.3)' : '#000',
    ...(selectedItemStyle as object),
  }

  function HeaderComponent() {
    const kInputFilterContainerStyle: StyleProp<ViewStyle> = {
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 18,
      justifyContent: 'space-between',
      ...(inputFilterContainerStyle as object),
    }
    const kInputFilterStyle: StyleProp<TextStyle> = {
      paddingVertical: 14,
      paddingRight: 8,
      color: '#000',
      fontSize: 12,
      flexGrow: 1,
      ...(inputFilterStyle as object),
    }
    return (
      <>
        {!hideInputFilter && (
          <View style={kInputFilterContainerStyle}>
            <TextInput
              value={inputValue}
              placeholder={inputPlaceholder}
              onChangeText={setInputValue}
              style={kInputFilterStyle}
              placeholderTextColor="#000"
              {...searchInputProps}
            />
            <Icon name="searchBoxIcon" fill={searchIconColor} />
          </View>
        )}
        <ScrollView keyboardShouldPersistTaps="always" />
      </>
    )
  }

  const keyExtractor = (o: SelectOption) => String(o.id)

  const { style: listOptionStyle, ...restListOptionProps } = listOptionProps

  return (
    <View style={{ width }}>
      <Text style={kLabelStyle}>{label}</Text>
      <View style={kContainerStyle}>
        <View style={{ paddingRight: 20, flexGrow: 1 }}>
          {isMulti ? (
            <FlatList
              data={selectedValues}
              extraData={{ inputValue, showOptions }}
              keyExtractor={keyExtractor}
              renderItem={renderGroupItem}
              horizontal
              ListEmptyComponent={multiListEmptyComponent}
              {...multiSelectInputFieldProps}
            />
          ) : (
            <TouchableOpacity hitSlop={hitSlop} onPress={() => setShowOptions((open) => !open)}>
              <Text style={kSelectedItemStyleValue}>
                {selectedItemText || inputPlaceholder || label}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => setShowOptions((open) => !open)} hitSlop={hitSlop}>
          {selectIcon ? (
            selectIcon
          ) : (
            <Icon name={showOptions ? 'upArrow' : 'downArrow'} fill={arrowIconColor} />
          )}
        </TouchableOpacity>
      </View>
      {showOptions && (
        <FlatList
          data={filteredSuggestions}
          extraData={options}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={1}
          horizontal={false}
          initialNumToRender={5}
          maxToRenderPerBatch={20}
          windowSize={10}
          ListEmptyComponent={optionListEmpty}
          style={[kOptionsHeight, listOptionStyle]}
          ListHeaderComponent={HeaderComponent}
          {...restListOptionProps}
        />
      )}
    </View>
  )
}

export type { SelectBoxProps, SelectOption } from './types'
export default memo(SelectBox)
