import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { Option } from '../types'
import Colors from '../constants/Colors'
import Icon from './Icon'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    paddingVertical: 5,
    paddingRight: 5,
    paddingLeft: 10,
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    flexGrow: 1,
  },
  label: {
    fontSize: 10,
    color: '#fff',
  },
})

interface SelectedItemProps {
  item: Option
  onRemove: () => void
  labelStyle?: TextStyle
  containerStyle?: ViewStyle
}

const SelectedItem: React.FC<SelectedItemProps> = ({ item, onRemove, labelStyle, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{item.item}</Text>
      <TouchableOpacity style={{ marginLeft: 15 }} onPress={onRemove}>
        <Icon name="closeCircle" fill="#fff" width={21} height={21} />
      </TouchableOpacity>
    </View>
  )
}

export default SelectedItem