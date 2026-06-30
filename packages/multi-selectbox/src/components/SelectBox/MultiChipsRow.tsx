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
  optionLabelById: ReadonlyMap<string | number, string>
  selectedValues: SelectOption[]
  inputPlaceholder: string
  multiOptionContainerStyle?: StyleProp<ViewStyle> | undefined
  multiOptionsLabelStyle?: StyleProp<TextStyle> | undefined
  multiListEmptyLabelStyle?: StyleProp<TextStyle> | undefined
  /** Extra props applied to the horizontal chips ScrollView (style / contentContainerStyle / etc.). */
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
  // Chips must size to content — flexGrow: 1 made each chip expand and hide siblings in a row.
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
      flexGrow: 0,
      flexShrink: 0,
      alignSelf: 'center',
    },
    multiOptionContainerStyle,
  ]
  const labelStyle: StyleProp<TextStyle> = [
    { fontSize: 10, color: '#fff', flexShrink: 0 },
    multiOptionsLabelStyle,
  ]

  return (
    <View style={containerStyle} testID={TEST_IDS.multiChip(item.id)}>
      <Text style={labelStyle} numberOfLines={1}>
        {label}
      </Text>
      <TouchableOpacity
        style={{ marginLeft: 10, flexShrink: 0 }}
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

  // multiSelectInputFieldProps is typed for FlatList; we only pass through scroll-view-compatible keys.
  const {
    style: multiFieldStyle,
    contentContainerStyle: multiFieldContentStyle,
    keyboardShouldPersistTaps: multiKbdTaps = 'handled',
    // FlatList-only props — ignore if present
    ...rest
  } = (multiSelectInputFieldProps ?? {}) as Record<string, unknown> & {
    style?: StyleProp<ViewStyle>
    contentContainerStyle?: StyleProp<ViewStyle>
    keyboardShouldPersistTaps?: 'always' | 'never' | 'handled'
  }
  void rest

  // Horizontal ScrollView: chips size to content and scroll within the field width.
  // (Horizontal FlatList in a flex row often expands incorrectly and clips to one chip.)
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps={multiKbdTaps}
      nestedScrollEnabled
      style={[{ flexGrow: 1, flexShrink: 1, minWidth: 0, maxWidth: '100%' }, multiFieldStyle]}
      contentContainerStyle={[
        { alignItems: 'center', flexGrow: 0, flexDirection: 'row' },
        multiFieldContentStyle,
      ]}
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
