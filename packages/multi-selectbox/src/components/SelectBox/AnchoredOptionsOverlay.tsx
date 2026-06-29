import { memo, useMemo, type ReactElement } from 'react'
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native'
import { TEST_IDS } from '../../testIDs'
import OptionsPanel, { type OptionsPanelProps } from './OptionsPanel'

/** Anchor rect from measureInWindow (field row). */
export type AnchorRect = {
  x: number
  y: number
  width: number
  height: number
}

export type AnchoredOptionsOverlayProps = {
  visible: boolean
  anchor: AnchorRect | null
  onRequestClose: () => void
  panelProps: OptionsPanelProps
  maxPanelHeight?: number
}

const GAP = 4
const H_MARGIN = 8

/**
 * Isolated presentation: options list in a transparent Modal, positioned under (or above)
 * the field so it is not nested under a parent ScrollView. A future bottom-sheet presentation
 * can sit alongside this module without rewriting OptionsPanel.
 */
function AnchoredOptionsOverlay({
  visible,
  anchor,
  onRequestClose,
  panelProps,
  maxPanelHeight = 280,
}: AnchoredOptionsOverlayProps): ReactElement | null {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions()

  const panelLayout = useMemo(() => {
    if (!anchor || anchor.width <= 0) {
      return null
    }
    const spaceBelow = windowHeight - (anchor.y + anchor.height) - GAP - H_MARGIN
    const spaceAbove = anchor.y - GAP - H_MARGIN
    const placeBelow = spaceBelow >= Math.min(maxPanelHeight, 160) || spaceBelow >= spaceAbove
    const available = Math.max(120, placeBelow ? spaceBelow : spaceAbove)
    const height = Math.min(maxPanelHeight, available)
    const top = placeBelow
      ? anchor.y + anchor.height + GAP
      : Math.max(H_MARGIN, anchor.y - GAP - height)
    const left = Math.min(
      Math.max(H_MARGIN, anchor.x),
      Math.max(H_MARGIN, windowWidth - H_MARGIN - anchor.width),
    )
    const width = Math.min(anchor.width, windowWidth - H_MARGIN * 2)

    return { top, left, width, height }
  }, [anchor, windowHeight, windowWidth, maxPanelHeight])

  if (!visible) {
    return null
  }

  const panelHeight = panelLayout?.height ?? maxPanelHeight

  const panelStyle: StyleProp<ViewStyle> = [
    styles.panelBase,
    panelLayout
      ? {
          top: panelLayout.top,
          left: panelLayout.left,
          width: panelLayout.width,
          height: panelLayout.height,
        }
      : styles.panelFallback,
    Platform.select({
      ios: styles.shadowIos,
      android: styles.shadowAndroid,
      default: {},
    }),
  ]

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
      statusBarTranslucent
      testID={TEST_IDS.optionsOverlay}
    >
      <View style={styles.root} testID={TEST_IDS.optionsOverlayRoot}>
        <Pressable
          style={styles.backdrop}
          onPress={onRequestClose}
          accessibilityRole="button"
          accessibilityLabel="Dismiss options"
          testID={TEST_IDS.optionsOverlayBackdrop}
        />
        <View style={panelStyle} testID={TEST_IDS.optionsOverlayPanel}>
          <OptionsPanel
            {...panelProps}
            listOptionProps={{
              ...panelProps.listOptionProps,
              style: [{ flex: 1, maxHeight: panelHeight }, panelProps.listOptionProps?.style],
            }}
            listScrollViewProps={{
              ...panelProps.listScrollViewProps,
              style: [{ maxHeight: panelHeight, flex: 1 }, panelProps.listScrollViewProps?.style],
            }}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17, 24, 39, 0.12)',
  },
  panelBase: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  panelFallback: {
    top: '28%',
    left: H_MARGIN,
    right: H_MARGIN,
    height: 280,
  },
  shadowIos: {
    shadowColor: '#111827',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  shadowAndroid: {
    elevation: 8,
  },
})

export default memo(AnchoredOptionsOverlay)
