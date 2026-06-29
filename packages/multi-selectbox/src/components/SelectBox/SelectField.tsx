import { memo, type ReactElement, type ReactNode } from 'react'
import { isEmpty } from 'lodash'
import {
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import Colors from '../../constants/Colors'
import { hitSlop } from '../../constants/layout'
import Icon from '../Icon'
import { TEST_IDS } from '../../testIDs'
import type { MultiSelectFieldProps, SelectOption } from '../../types'
import MultiChipsRow from './MultiChipsRow'

export type SelectFieldProps = {
  isMulti: boolean
  label: string
  inputPlaceholder: string
  selectedItemText: string
  showOptions: boolean
  selectIcon?: ReactNode | undefined
  arrowIconColor?: string | undefined
  containerStyle?: StyleProp<ViewStyle> | undefined
  selectedItemStyle?: StyleProp<TextStyle> | undefined
  optionLabelById: ReadonlyMap<string | number, string>
  selectedValues: SelectOption[]
  multiOptionContainerStyle?: StyleProp<ViewStyle> | undefined
  multiOptionsLabelStyle?: StyleProp<TextStyle> | undefined
  multiListEmptyLabelStyle?: StyleProp<TextStyle> | undefined
  multiSelectInputFieldProps?: MultiSelectFieldProps | undefined
  onTapClose?: ((item: SelectOption) => void) | undefined
  onToggleOpen: () => void
}

function SelectField({
  isMulti,
  label,
  inputPlaceholder,
  selectedItemText,
  showOptions,
  selectIcon,
  arrowIconColor = Colors.primary,
  containerStyle,
  selectedItemStyle,
  optionLabelById,
  selectedValues,
  multiOptionContainerStyle,
  multiOptionsLabelStyle,
  multiListEmptyLabelStyle,
  multiSelectInputFieldProps,
  onTapClose,
  onToggleOpen,
}: SelectFieldProps): ReactElement {
  const rowStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      width: '100%',
      borderColor: '#ddd',
      borderBottomWidth: 1,
      paddingTop: 6,
      paddingRight: 20,
      paddingBottom: 8,
    },
    containerStyle,
  ]

  const valueStyle: StyleProp<TextStyle> = [
    {
      fontSize: 17,
      color: isEmpty(selectedItemText) ? 'rgba(60, 60, 67, 0.3)' : '#000',
    },
    selectedItemStyle,
  ]

  return (
    <View style={rowStyle}>
      <View style={{ paddingRight: 20, flex: 1, flexGrow: 1, flexShrink: 1, minWidth: 0 }}>
        {isMulti ? (
          <MultiChipsRow
            optionLabelById={optionLabelById}
            selectedValues={selectedValues}
            inputPlaceholder={inputPlaceholder}
            multiOptionContainerStyle={multiOptionContainerStyle}
            multiOptionsLabelStyle={multiOptionsLabelStyle}
            multiListEmptyLabelStyle={multiListEmptyLabelStyle}
            multiSelectInputFieldProps={multiSelectInputFieldProps}
            onTapClose={onTapClose}
            onToggleOpen={onToggleOpen}
          />
        ) : (
          <TouchableOpacity
            testID={TEST_IDS.singleTrigger}
            hitSlop={hitSlop}
            onPress={onToggleOpen}
          >
            <Text style={valueStyle}>{selectedItemText || inputPlaceholder || label}</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity testID={TEST_IDS.dropdownToggle} onPress={onToggleOpen} hitSlop={hitSlop}>
        {selectIcon ? (
          selectIcon
        ) : (
          <Icon name={showOptions ? 'upArrow' : 'downArrow'} fill={arrowIconColor} />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default memo(SelectField)
