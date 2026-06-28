import { memo, type ReactElement } from 'react'
import {
  ScrollView,
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
import { MultiEmptyPlaceholder } from './EmptyStates'

export type MultiChipsRowProps = {
  /** id → display label (from full options catalog). */
  optionLabelById: ReadonlyMap<string | number, string>
  selectedValues: SelectOption[]
  inputPlaceholder: string
  multiOptionContainerStyle?: StyleProp<ViewStyle> | undefined
  multiOptionsLabelStyle?: StyleProp<TextStyle> | undefined
  multiListEmptyLabelStyle?: StyleProp<TextStyle> | undefined
  multiSelectInputFieldProps?: MultiSelectFieldProps | undefined
  onTapClose?: ((item: SelectOption) => void) | undefined
  onToggleOpen: () => void
}

function Chip({
  item,
  label,
  multiOptionContainerStyle,
  multiOptionsLabelStyle,
  onTapClose,
}: {
  item: SelectOption
  label: string
  multiOptionContainerStyle?: StyleProp<ViewStyle> | undefined
  multiOptionsLabelStyle?: StyleProp<TextStyle> | undefined
  onTapClose?: ((item: SelectOption) => void) | undefined
}): ReactElement {
  const containerStyle: StyleProp<ViewStyle> = [
    {
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
    multiOptionContainerStyle,
  ]
  const labelStyle: StyleProp<TextStyle> = [{ fontSize: 10, color: '#fff' }, multiOptionsLabelStyle]

  return (
    <View style={containerStyle} testID={TEST_IDS.multiChip(item.id)}>
      <Text style={labelStyle}>{label}</Text>
      <TouchableOpacity
        style={{ marginLeft: 15 }}
        hitSlop={hitSlop}
        onPress={() => onTapClose?.(item)}
      >
        <Icon name="closeCircle" fill="#fff" width={21} height={21} />
      </TouchableOpacity>
    </View>
  )
}

function MultiChipsRow({
  optionLabelById,
  selectedValues,
  inputPlaceholder,
  multiOptionContainerStyle,
  multiOptionsLabelStyle,
  multiListEmptyLabelStyle,
  multiSelectInputFieldProps,
  onTapClose,
  onToggleOpen,
}: MultiChipsRowProps): ReactElement {
  if (selectedValues.length === 0) {
    return (
      <MultiEmptyPlaceholder
        inputPlaceholder={inputPlaceholder}
        multiListEmptyLabelStyle={multiListEmptyLabelStyle}
        onPress={onToggleOpen}
      />
    )
  }

  const {
    style: multiFieldStyle,
    contentContainerStyle: multiFieldContentStyle,
    keyboardShouldPersistTaps: multiKbdTaps = 'handled',
    ...restMultiFieldProps
  } = multiSelectInputFieldProps ?? {}

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps={multiKbdTaps}
      style={multiFieldStyle}
      contentContainerStyle={[{ alignItems: 'center' }, multiFieldContentStyle]}
      {...restMultiFieldProps}
    >
      {selectedValues.map((item) => {
        const chipLabel = optionLabelById.get(item.id) ?? item.item
        return (
          <Chip
            key={String(item.id)}
            item={item}
            label={chipLabel}
            multiOptionContainerStyle={multiOptionContainerStyle}
            multiOptionsLabelStyle={multiOptionsLabelStyle}
            onTapClose={onTapClose}
          />
        )
      })}
    </ScrollView>
  )
}

export default memo(MultiChipsRow)
