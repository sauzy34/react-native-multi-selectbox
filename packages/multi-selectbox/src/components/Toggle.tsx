import { memo } from 'react'
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'
import Colors from '../constants/Colors'
import Icon from './Icon'

export type ToggleProps = {
  onTouch?: (() => void) | undefined
  checked?: boolean | undefined
  iconColor?: string | undefined
} & Omit<TouchableOpacityProps, 'onPress'>

function Toggle({ onTouch, checked = false, iconColor, ...props }: ToggleProps) {
  // Prefer explicit toggle color; fall back to theme primary (never leave stroke icons without paint).
  const resolvedColor = iconColor ?? Colors.primary
  return (
    <TouchableOpacity
      onPress={onTouch}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      {...props}
    >
      <Icon name={checked ? 'deleteCircle' : 'addCircle'} fill={resolvedColor} />
    </TouchableOpacity>
  )
}

export default memo(Toggle)
