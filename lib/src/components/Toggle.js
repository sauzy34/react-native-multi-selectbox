import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from './Icon'

function Toggle({ onTouch, checked, ...props }) {
  return (
    <TouchableOpacity
      onPress={() => (onTouch ? onTouch() : null)}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      {...props}>
      {checked ? <Icon name={'deleteCircle'} /> : <Icon name={'addCircle'} />}
    </TouchableOpacity>
  )
}

export default Toggle
