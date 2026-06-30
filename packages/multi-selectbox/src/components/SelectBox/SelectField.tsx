import { memo, type ReactElement, type ReactNode } from 'react'
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
  hideDropdownIcon?: boolean | undefined
  editable?: boolean | undefined
  arrowIconColor?: string | undefined
  containerStyle?: StyleProp<ViewStyle> | undefined
  selectedItemStyle?: StyleProp<TextStyle> | undefined
  optionLabelById: ReadonlyMap<string | number, string>
  selectedValues: SelectOption[]
  multiOptionContainerStyle?: StyleProp<ViewStyle> | undefined
  multiOptionsLabelStyle?: StyleProp<TextStyle> | undefined
  multiListEmptyLabelStyle?: StyleProp<TextStyle> | undefined
  multiSelectInputFieldProps?: MultiSelectFieldProps | undefined
  hideChipClose?: boolean | undefined
  renderMultiChipLeading?: ((option: SelectOption) => ReactNode) | undefined
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
  hideDropdownIcon = false,
  editable = true,
  arrowIconColor = Colors.primary,
  containerStyle,
  selectedItemStyle,
  optionLabelById,
  selectedValues,
  multiOptionContainerStyle,
  multiOptionsLabelStyle,
  multiListEmptyLabelStyle,
  multiSelectInputFieldProps,
  hideChipClose,
  renderMultiChipLeading,
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
      paddingRight: hideDropdownIcon ? 0 : 20,
      paddingBottom: 8,
    },
    containerStyle,
  ]

  const valueStyle: StyleProp<TextStyle> = [
    {
      fontSize: 17,
      color: selectedItemText.length === 0 ? 'rgba(60, 60, 67, 0.3)' : '#000',
    },
    selectedItemStyle,
  ]

  const onFieldPress = editable ? onToggleOpen : undefined

  return (
    <View style={rowStyle}>
      <View
        style={{
          paddingRight: hideDropdownIcon ? 0 : 20,
          flex: 1,
          flexGrow: 1,
          flexShrink: 1,
          minWidth: 0,
        }}
      >
        {isMulti ? (
          <MultiChipsRow
            optionLabelById={optionLabelById}
            selectedValues={selectedValues}
            inputPlaceholder={inputPlaceholder}
            multiOptionContainerStyle={multiOptionContainerStyle}
            multiOptionsLabelStyle={multiOptionsLabelStyle}
            multiListEmptyLabelStyle={multiListEmptyLabelStyle}
            multiSelectInputFieldProps={multiSelectInputFieldProps}
            hideChipClose={hideChipClose}
            renderMultiChipLeading={renderMultiChipLeading}
            onTapClose={onTapClose}
            onToggleOpen={onToggleOpen}
            editable={editable}
          />
        ) : onFieldPress ? (
          <TouchableOpacity
            testID={TEST_IDS.singleTrigger}
            hitSlop={hitSlop}
            onPress={onFieldPress}
          >
            <Text style={valueStyle}>{selectedItemText || inputPlaceholder || label}</Text>
          </TouchableOpacity>
        ) : (
          <View testID={TEST_IDS.singleTrigger}>
            <Text style={valueStyle}>{selectedItemText || inputPlaceholder || label}</Text>
          </View>
        )}
      </View>
      {hideDropdownIcon ? null : onFieldPress ? (
        <TouchableOpacity testID={TEST_IDS.dropdownToggle} onPress={onFieldPress} hitSlop={hitSlop}>
          {selectIcon ? (
            selectIcon
          ) : (
            <Icon name={showOptions ? 'upArrow' : 'downArrow'} fill={arrowIconColor} />
          )}
        </TouchableOpacity>
      ) : (
        <View testID={TEST_IDS.dropdownToggle} pointerEvents="none">
          {selectIcon ? (
            selectIcon
          ) : (
            <Icon name={showOptions ? 'upArrow' : 'downArrow'} fill={arrowIconColor} />
          )}
        </View>
      )}
    </View>
  )
}

export default memo(SelectField)
