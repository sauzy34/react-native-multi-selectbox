import type { ReactElement } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import Toggle from '../Toggle'
import { hitSlop, optionLabelPressStyle } from '../../constants/layout'
import { TEST_IDS } from '../../testIDs'
import type { SelectOption } from '../../types'

export type OptionRowProps = {
  item: SelectOption
  isMulti: boolean
  checked?: boolean | undefined
  toggleIconColor?: string | undefined
  optionsLabelStyle?: StyleProp<TextStyle> | undefined
  optionContainerStyle?: StyleProp<ViewStyle> | undefined
  onPress: (item: SelectOption) => void
}

export function OptionRow({
  item,
  isMulti,
  checked = false,
  toggleIconColor,
  optionsLabelStyle,
  optionContainerStyle,
  onPress,
}: OptionRowProps): ReactElement {
  const containerStyle: StyleProp<ViewStyle> = [
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

  const labelStyle: StyleProp<TextStyle> = [
    { fontSize: 17, color: 'rgba(60, 60, 67, 0.6)' },
    optionsLabelStyle,
  ]

  const handlePress = () => onPress(item)

  if (isMulti) {
    return (
      <View style={containerStyle}>
        <TouchableOpacity
          testID={TEST_IDS.option(item.id)}
          hitSlop={hitSlop}
          style={optionLabelPressStyle}
          onPress={handlePress}
        >
          <Text style={labelStyle}>{item.item}</Text>
        </TouchableOpacity>
        <Toggle iconColor={toggleIconColor} checked={checked} onTouch={handlePress} />
      </View>
    )
  }

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        testID={TEST_IDS.option(item.id)}
        hitSlop={hitSlop}
        style={optionLabelPressStyle}
        onPress={handlePress}
      >
        <Text style={labelStyle}>{item.item}</Text>
        <View />
      </TouchableOpacity>
    </View>
  )
}
