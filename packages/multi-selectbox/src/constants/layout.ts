import type { ViewStyle } from 'react-native'

export const hitSlop = { top: 14, bottom: 14, left: 14, right: 14 } as const

export const optionsPanelStyle: ViewStyle = { width: '100%', maxHeight: 180 }

export const optionListEmptyStyle: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  paddingVertical: 4,
}

export const optionLabelPressStyle: ViewStyle = { flexShrink: 1 }
