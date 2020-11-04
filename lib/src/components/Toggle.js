import React, { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'
import Icon from './Icon'

function Toggle({ onTouch, checked, ...props }) {
  return (
    <TouchableOpacity onPress={onTouch} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} {...props}>
      <Icon name={checked ? 'deleteCircle' : 'addCircle'} fill={Colors.primary} />
    </TouchableOpacity>
  )
}

export default memo(Toggle)
