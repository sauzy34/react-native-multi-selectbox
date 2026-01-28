import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { Option } from '../types'
import Toggle from './Toggle'

const styles = StyleSheet.create({
  optionContainer: {
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
})

interface OptionItemProps {
  item: Option
  isMulti: boolean
  onPress: () => void
  onToggle?: () => void
  checked?: boolean
  optionLabelStyle?: TextStyle
  optionContainerStyle?: ViewStyle
}

const OptionItem: React.FC<OptionItemProps> = ({
  item,
  isMulti,
  onPress,
  onToggle,
  checked,
  optionLabelStyle,
  optionContainerStyle,
}) => {
  return (
    <View style={[styles.optionContainer, optionContainerStyle]}>
      {isMulti ? (
        <>
          <TouchableOpacity style={{ flexShrink: 1 }} onPress={onPress}>
            <Text style={optionLabelStyle}>{item.item}</Text>
          </TouchableOpacity>
          <Toggle checked={checked!} onTouch={onToggle!} />
        </>
      ) : (
        <TouchableOpacity style={{ flexShrink: 1 }} onPress={onPress}>
          <Text style={optionLabelStyle}>{item.item}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default OptionItem