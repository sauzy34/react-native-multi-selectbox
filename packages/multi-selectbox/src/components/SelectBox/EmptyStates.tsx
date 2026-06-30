import type { ReactElement } from 'react'
import { Text, TouchableOpacity, View, type StyleProp, type TextStyle } from 'react-native'
import { hitSlop, optionListEmptyStyle } from '../../constants/layout'
import { TEST_IDS } from '../../testIDs'

type MultiEmptyProps = {
  inputPlaceholder: string
  multiListEmptyLabelStyle?: StyleProp<TextStyle> | undefined
  onPress?: (() => void) | undefined
}

export function MultiEmptyPlaceholder({
  inputPlaceholder,
  multiListEmptyLabelStyle,
  onPress,
}: MultiEmptyProps): ReactElement {
  const labelStyle: StyleProp<TextStyle> = [
    { fontSize: 17, color: 'rgba(60, 60, 67, 0.3)' },
    multiListEmptyLabelStyle,
  ]
  if (!onPress) {
    return (
      <View testID={TEST_IDS.multiEmpty} style={{ flexGrow: 1, width: '100%' }}>
        <Text style={labelStyle}>{inputPlaceholder}</Text>
      </View>
    )
  }
  return (
    <TouchableOpacity
      testID={TEST_IDS.multiEmpty}
      style={{ flexGrow: 1, width: '100%' }}
      hitSlop={hitSlop}
      onPress={onPress}
    >
      <Text style={labelStyle}>{inputPlaceholder}</Text>
    </TouchableOpacity>
  )
}

type ListEmptyProps = {
  listEmptyText: string
  listEmptyLabelStyle?: StyleProp<TextStyle> | undefined
}

export function OptionsListEmpty({
  listEmptyText,
  listEmptyLabelStyle,
}: ListEmptyProps): ReactElement {
  const labelStyle: StyleProp<TextStyle> = [
    { fontSize: 17, color: 'rgba(60, 60, 67, 0.6)' },
    listEmptyLabelStyle,
  ]
  return (
    <View style={optionListEmptyStyle} testID={TEST_IDS.listEmpty}>
      <Text style={labelStyle}>{listEmptyText}</Text>
    </View>
  )
}
