import React, { useState, memo, useMemo } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, DimensionValue, FlatListProps } from 'react-native'
import { Option, SelectBoxProps } from './src/types'
import Colors from './src/constants/Colors'
import Icon from './src/components/Icon'
import OptionItem from './src/components/OptionItem'
import SelectedItem from './src/components/SelectedItem'
import SearchHeader from './src/components/SearchHeader'

const hitSlop = { top: 14, bottom: 14, left: 14, right: 14 }

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    paddingTop: 6,
    paddingRight: 20,
    paddingBottom: 8,
  },
  label: {
    fontSize: 12,
    color: 'rgba(60, 60, 67, 0.6)',
    paddingBottom: 4,
  },
  selectedItem: {
    fontSize: 17,
  },
  optionsHeight: {
    width: '100%',
    maxHeight: 180,
  },
  optionListView: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 4,
  },
  listEmpty: {
    fontSize: 17,
    color: 'rgba(60, 60, 67, 0.6)',
  },
  multiListEmpty: {
    fontSize: 17,
    color: 'rgba(60, 60, 67, 0.3)',
  },
})

const SelectBox = (props: SelectBoxProps) => {
  const {
    label = 'Label',
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
    isMulti = false,
    width = '100%',
    inputPlaceholder = 'Select',
    hideInputFilter = true,
    selectedValues = [],
    arrowIconColor = Colors.primary,
    searchIconColor = Colors.primary,
    toggleIconColor = Colors.primary,
    options = [],
    multiSelectInputFieldProps = {},
    listOptionProps = (props.listOptionProps || {}) as FlatListProps<Option>,
    selectIcon,
    value,
    searchInputProps,
    onChange,
    onMultiSelect,
    onTapClose,
  } = props

  const [inputValue, setInputValue] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  const filteredSuggestions = useMemo(
    () => options.filter((suggestion) => suggestion.item.toLowerCase().includes(inputValue.toLowerCase())),
    [inputValue, options]
  )

  const onChangeText = (value: string) => setInputValue(value)
  const onPressShowOptions = () => setShowOptions(!showOptions)
  const keyExtractor = (item: Option) => item.id

  const renderMultiItem = ({ item }: { item: Option }) => (
    <SelectedItem
      item={item}
      onRemove={() => onTapClose?.(item)}
      labelStyle={multiOptionsLabelStyle}
      containerStyle={multiOptionContainerStyle}
    />
  )

  const renderOption = ({ item }: { item: Option }) => (
    <OptionItem
      item={item}
      isMulti={isMulti}
      onPress={
        isMulti
          ? () => onMultiSelect?.(item)
          : () => {
              setShowOptions(false)
              onChange?.(item)
            }
      }
      onToggle={isMulti ? () => onMultiSelect?.(item) : undefined}
      checked={isMulti ? selectedValues.some((selected) => selected.id === item.id) : undefined}
      optionLabelStyle={optionsLabelStyle}
      optionContainerStyle={optionContainerStyle}
    />
  )

  const renderEmpty = () => (
    <View style={styles.optionListView}>
      <Text style={[styles.listEmpty, listEmptyLabelStyle]}>{listEmptyText}</Text>
    </View>
  )

  const renderMultiEmpty = () => (
    <TouchableOpacity
      style={{ flexGrow: 1, width: '100%' }}
      hitSlop={hitSlop}
      onPress={onPressShowOptions}
    >
      <Text style={[styles.multiListEmpty, multiListEmptyLabelStyle]}>{inputPlaceholder}</Text>
    </TouchableOpacity>
  )

  return (
    <>
      <View style={{ width: width as DimensionValue }}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        <View style={[styles.container, containerStyle]}>
          <View style={{ paddingRight: 20, flexGrow: 1 }}>
            {isMulti ? (
              <FlatList
                data={selectedValues}
                keyExtractor={keyExtractor}
                renderItem={renderMultiItem}
                horizontal
                ListEmptyComponent={renderMultiEmpty}
                {...multiSelectInputFieldProps}
              />
            ) : (
              <TouchableOpacity hitSlop={hitSlop} onPress={onPressShowOptions}>
                <Text
                  style={[
                    styles.selectedItem,
                    { color: value?.item ? '#000' : 'rgba(60, 60, 67, 0.3)' },
                    selectedItemStyle,
                  ]}
                >
                  {value?.item || inputPlaceholder}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={onPressShowOptions} hitSlop={hitSlop}>
            {selectIcon || (
              <Icon name={showOptions ? 'upArrow' : 'downArrow'} fill={arrowIconColor} />
            )}
          </TouchableOpacity>
        </View>
        {showOptions && (
          <FlatList
            {...listOptionProps}
            data={filteredSuggestions}
            keyExtractor={keyExtractor}
            renderItem={renderOption}
            ListEmptyComponent={renderEmpty}
            ListHeaderComponent={
              <SearchHeader
                inputPlaceholder={inputPlaceholder}
                inputValue={inputValue}
                onChangeText={onChangeText}
                searchIconColor={searchIconColor}
                searchInputProps={searchInputProps}
                inputFilterContainerStyle={inputFilterContainerStyle}
                inputFilterStyle={inputFilterStyle}
                hideInputFilter={hideInputFilter}
              />
            }
            style={[styles.optionsHeight, (listOptionProps as any)?.style]}
          />
        )}
      </View>
    </>
  )
}

export default memo(SelectBox)
