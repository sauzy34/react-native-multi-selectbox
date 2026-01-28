import React, { memo } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import Colors from '../constants/Colors'
import Icon from './Icon'

interface ToggleProps {
  onTouch: () => void
  checked: boolean
  iconColor?: string
}

const Toggle: React.FC<ToggleProps & Omit<TouchableOpacityProps, keyof ToggleProps>> = ({ onTouch, checked, iconColor = Colors.primary, ...props }) => {
  return (
    <TouchableOpacity onPress={onTouch} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} {...props}>
      <Icon name={checked ? 'deleteCircle' : 'addCircle'} fill={iconColor} />
    </TouchableOpacity>
  )
}

export default memo(Toggle)