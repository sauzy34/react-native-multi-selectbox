import { memo, type ReactElement, type ReactNode } from 'react'
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
  multiSelectInputFieldProps?: MultiSelectFieldProps | undefined
  hideChipClose?: boolean | undefined
  renderMultiChipLeading?: ((option: SelectOption) => ReactNode) | undefined
  onTapClose?: ((item: SelectOption) => void) | undefined
  onToggleOpen: () => void
  editable?: boolean | undefined
}

function Chip({
  item,
  label,
  multiOptionContainerStyle,
  multiOptionsLabelStyle,
  hideChipClose,
  renderMultiChipLeading,
  onTapClose,
}: {
  item: SelectOption
  label: string
  multiOptionContainerStyle?: StyleProp<ViewStyle> | undefined
  multiOptionsLabelStyle?: StyleProp<TextStyle> | undefined
  hideChipClose?: boolean | undefined
  renderMultiChipLeading?: ((option: SelectOption) => ReactNode) | undefined
  onTapClose?: ((item: SelectOption) => void) | undefined
}): ReactElement {
  // With close control: tighter right padding (icon has its own margin).
  // Without close: equal horizontal padding so the label reads centered in the pill.
  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      borderRadius: 20,
      paddingVertical: 5,
      marginRight: 4,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.primary,
      flexGrow: 0,
      flexShrink: 0,
      alignSelf: 'center',
      ...(hideChipClose ? { paddingHorizontal: 12 } : { paddingLeft: 10, paddingRight: 5 }),
    },
    multiOptionContainerStyle,
    // Re-assert balanced padding after consumer styles (often set paddingRight for the × case).
    hideChipClose ? { paddingHorizontal: 12, paddingLeft: 12, paddingRight: 12 } : null,
  ]
  const labelStyle: StyleProp<TextStyle> = [
    {
      fontSize: 10,
      color: '#fff',
      flexShrink: 0,
      textAlign: hideChipClose && !renderMultiChipLeading ? 'center' : 'left',
      includeFontPadding: false,
    },
    multiOptionsLabelStyle,
  ]

  return (
    <View style={containerStyle} testID={TEST_IDS.multiChip(item.id)}>
      {renderMultiChipLeading ? (
        <View style={{ marginRight: 6 }} testID={TEST_IDS.multiChipLeading(item.id)}>
          {renderMultiChipLeading(item)}
        </View>
      ) : null}
      <Text style={labelStyle} numberOfLines={1}>
        {label}
      </Text>
      {hideChipClose ? null : (
        <TouchableOpacity
          style={{ marginLeft: 10, flexShrink: 0 }}
          hitSlop={hitSlop}
          onPress={() => onTapClose?.(item)}
          testID={TEST_IDS.multiChipClose(item.id)}
        >
          <Icon name="closeCircle" fill="#fff" width={21} height={21} />
        </TouchableOpacity>
      )}
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
  hideChipClose,
  renderMultiChipLeading,
  onTapClose,
  onToggleOpen,
  editable = true,
}: MultiChipsRowProps): ReactElement {
  if (selectedValues.length === 0) {
    return (
      <MultiEmptyPlaceholder
        inputPlaceholder={inputPlaceholder}
        multiListEmptyLabelStyle={multiListEmptyLabelStyle}
        onPress={editable ? onToggleOpen : undefined}
      />
    )
  }

  const {
    style: multiFieldStyle,
    contentContainerStyle: multiFieldContentStyle,
    keyboardShouldPersistTaps: multiKbdTaps = 'handled',
    ...rest
  } = (multiSelectInputFieldProps ?? {}) as Record<string, unknown> & {
    style?: StyleProp<ViewStyle>
    contentContainerStyle?: StyleProp<ViewStyle>
    keyboardShouldPersistTaps?: 'always' | 'never' | 'handled'
  }
  void rest

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
            hideChipClose={hideChipClose}
            renderMultiChipLeading={renderMultiChipLeading}
            onTapClose={onTapClose}
          />
        )
      })}
    </ScrollView>
  )
}

export default memo(MultiChipsRow)
