import { memo } from 'react'
import { Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native'

export type IconName =
  'downArrow' | 'upArrow' | 'deleteCircle' | 'searchBoxIcon' | 'addCircle' | 'closeCircle'

export type IconProps = {
  name: IconName
  /** Paint color for glyph / ring (replaces former SVG fill/stroke). */
  fill?: string
  width?: number
  height?: number
  /** Ignored — kept for call-site compatibility with the old SVG API. */
  viewBox?: string
}

const DEFAULT_COLORS: Record<IconName, string> = {
  downArrow: '#4A90E2',
  upArrow: '#4A90E2',
  deleteCircle: '#E02020',
  searchBoxIcon: '#0575E6',
  addCircle: '#0575E6',
  closeCircle: '#0575E6',
}

const GLYPHS: Record<IconName, string> = {
  downArrow: '▾',
  upArrow: '▴',
  deleteCircle: '−',
  searchBoxIcon: '⌕',
  addCircle: '+',
  closeCircle: '×',
}

/** Outlined circle icons (add / delete / close) use a ring + centered glyph. */
const RING_ICONS: ReadonlySet<IconName> = new Set(['addCircle', 'deleteCircle', 'closeCircle'])

function Icon({ name, fill, width, height }: IconProps) {
  const color = fill ?? DEFAULT_COLORS[name]
  const size = Math.max(width ?? 18, height ?? 18)
  const glyph = GLYPHS[name]

  if (RING_ICONS.has(name)) {
    const ringSize = width ?? height ?? 22
    const fontSize = name === 'closeCircle' ? ringSize * 0.55 : ringSize * 0.5
    const ringStyle: ViewStyle = {
      width: ringSize,
      height: ringSize,
      borderRadius: ringSize / 2,
      borderWidth: name === 'deleteCircle' ? 0 : 1.5,
      borderColor: color,
      backgroundColor: name === 'deleteCircle' ? color : 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    }
    const textStyle: TextStyle = {
      color: name === 'deleteCircle' ? '#fff' : color,
      fontSize,
      fontWeight: '600',
      lineHeight: fontSize * 1.1,
      textAlign: 'center',
      includeFontPadding: false,
    }
    return (
      <View pointerEvents="none" style={ringStyle}>
        <Text style={textStyle}>{glyph}</Text>
      </View>
    )
  }

  const fontSize = size * (name === 'searchBoxIcon' ? 0.95 : 0.85)
  const textStyle: StyleProp<TextStyle> = {
    color,
    fontSize,
    lineHeight: fontSize * 1.15,
    textAlign: 'center',
    includeFontPadding: false,
  }

  return (
    <View
      pointerEvents="none"
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={textStyle}>{glyph}</Text>
    </View>
  )
}

export default memo(Icon)
