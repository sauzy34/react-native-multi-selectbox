import { memo, type ReactElement } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import Colors from '../../constants/Colors'
import Icon from '../Icon'
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

function OptionRow({
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
      paddingLeft: 0,
      justifyContent: 'space-between',
    },
    optionContainerStyle,
  ]

  const labelStyle: StyleProp<TextStyle> = [
    {
      fontSize: 17,
      color: 'rgba(60, 60, 67, 0.6)',
      flex: 1,
      flexShrink: 1,
      paddingRight: 12,
    },
    optionsLabelStyle,
  ]

  const handlePress = () => onPress(item)
  const iconColor = toggleIconColor ?? Colors.primary

  // Entire row is pressable (not only the label text).
  return (
    <TouchableOpacity
      testID={TEST_IDS.option(item.id)}
      style={containerStyle}
      onPress={handlePress}
      activeOpacity={0.65}
      accessibilityRole="button"
      accessibilityState={isMulti ? { checked } : undefined}
    >
      <Text style={labelStyle}>{item.item}</Text>
      {isMulti ? (
        <View pointerEvents="none">
          <Icon
            name={checked ? 'deleteCircle' : 'addCircle'}
            fill={iconColor}
            width={22}
            height={22}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  )
}

function optionRowPropsAreEqual(prev: OptionRowProps, next: OptionRowProps): boolean {
  return (
    prev.item.id === next.item.id &&
    prev.item.item === next.item.item &&
    prev.isMulti === next.isMulti &&
    prev.checked === next.checked &&
    prev.toggleIconColor === next.toggleIconColor &&
    prev.optionsLabelStyle === next.optionsLabelStyle &&
    prev.optionContainerStyle === next.optionContainerStyle &&
    prev.onPress === next.onPress
  )
}

export default memo(OptionRow, optionRowPropsAreEqual)
