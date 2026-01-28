import React from 'react'
import { View, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { SelectBoxProps } from '../types'
import Icon from './Icon'

const styles = StyleSheet.create({
  inputFilterContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 18,
    justifyContent: 'space-between',
  },
  inputFilter: {
    paddingVertical: 14,
    paddingRight: 8,
    color: '#000',
    fontSize: 12,
    flexGrow: 1,
  },
})

interface SearchHeaderProps {
  inputPlaceholder: string
  inputValue: string
  onChangeText: (text: string) => void
  searchIconColor: string
  searchInputProps?: SelectBoxProps['searchInputProps']
  inputFilterContainerStyle?: ViewStyle
  inputFilterStyle?: TextStyle
  hideInputFilter: boolean
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  inputPlaceholder,
  inputValue,
  onChangeText,
  searchIconColor,
  searchInputProps,
  inputFilterContainerStyle,
  inputFilterStyle,
  hideInputFilter,
}) => {
  return (
    <>
      {!hideInputFilter && (
        <View style={[styles.inputFilterContainer, inputFilterContainerStyle]}>
          <TextInput
            value={inputValue}
            placeholder={inputPlaceholder}
            onChangeText={onChangeText}
            style={[styles.inputFilter, inputFilterStyle]}
            placeholderTextColor="#000"
            {...searchInputProps}
          />
          <Icon name="searchBoxIcon" fill={searchIconColor} />
        </View>
      )}
    </>
  )
}

export default SearchHeader