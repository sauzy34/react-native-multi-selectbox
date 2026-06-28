import { memo } from 'react'
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'
import Colors from '../constants/Colors'
import Icon from './Icon'

export type ToggleProps = {
  onTouch?: (() => void) | undefined
  checked?: boolean | undefined
  iconColor?: string | undefined
} & Omit<TouchableOpacityProps, 'onPress'>

function Toggle({ onTouch, checked = false, iconColor = Colors.primary, ...props }: ToggleProps) {
  return (
    <TouchableOpacity
      onPress={onTouch}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      {...props}
    >
      <Icon name={checked ? 'deleteCircle' : 'addCircle'} fill={iconColor} />
    </TouchableOpacity>
  )
}

export default memo(Toggle)
