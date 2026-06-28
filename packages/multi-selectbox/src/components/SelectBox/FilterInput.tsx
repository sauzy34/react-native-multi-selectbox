import { memo, type ReactElement } from 'react'
import {
  TextInput,
  StyleSheet,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import Icon from '../Icon'
import { TEST_IDS } from '../../testIDs'

export type FilterInputProps = {
  value: string
  onChangeText: (text: string) => void
  placeholder: string
  searchIconColor: string
  inputFilterStyle?: StyleProp<TextStyle> | undefined
  inputFilterContainerStyle?: StyleProp<ViewStyle> | undefined
  searchInputProps?: TextInputProps | undefined
}

function FilterInput({
  value,
  onChangeText,
  placeholder,
  searchIconColor,
  inputFilterStyle,
  inputFilterContainerStyle,
  searchInputProps,
}: FilterInputProps): ReactElement {
  const { style: searchInputStyle, ...restSearchInputProps } = searchInputProps ?? {}

  const inputStyle: StyleProp<TextStyle> = [
    {
      paddingVertical: 14,
      paddingRight: 8,
      color: '#000',
      fontSize: 12,
      flexGrow: 1,
    },
    inputFilterStyle,
    searchInputStyle,
  ]

  const flattened = StyleSheet.flatten(inputStyle)
  const placeholderTextColor =
    searchInputProps?.placeholderTextColor ??
    (typeof flattened?.color === 'string' ? flattened.color : '#000')

  const containerStyle: StyleProp<ViewStyle> = [
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

  return (
    <View style={containerStyle}>
      <TextInput
        testID={TEST_IDS.filterInput}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={inputStyle}
        placeholderTextColor={placeholderTextColor}
        {...restSearchInputProps}
      />
      <Icon name="searchBoxIcon" fill={searchIconColor} />
    </View>
  )
}

export default memo(FilterInput)
