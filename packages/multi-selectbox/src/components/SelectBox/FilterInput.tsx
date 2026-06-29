import { memo, type ReactElement } from 'react'
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import Icon from '../Icon'
import { hitSlop } from '../../constants/layout'
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
  const hasQuery = value.length > 0

  const inputStyle: StyleProp<TextStyle> = [
    {
      paddingVertical: 14,
      paddingRight: 8,
      color: '#000',
      fontSize: 12,
      flexGrow: 1,
      flexShrink: 1,
      minWidth: 0,
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
      paddingRight: 12,
      justifyContent: 'space-between',
    },
    inputFilterContainerStyle,
  ]

  const clear = () => onChangeText('')

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
      {hasQuery ? (
        <TouchableOpacity
          testID={TEST_IDS.filterClear}
          onPress={clear}
          hitSlop={hitSlop}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
        >
          <Icon name="closeCircle" fill={searchIconColor} width={20} height={20} />
        </TouchableOpacity>
      ) : (
        <View pointerEvents="none" testID={TEST_IDS.filterSearchIcon}>
          <Icon name="searchBoxIcon" fill={searchIconColor} />
        </View>
      )}
    </View>
  )
}

export default memo(FilterInput)
