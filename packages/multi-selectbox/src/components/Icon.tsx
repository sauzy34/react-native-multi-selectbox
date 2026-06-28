import { memo, type ReactElement } from 'react'
import { View } from 'react-native'
import Svg, { Path, G, Ellipse, Polygon, Circle, type SvgProps } from 'react-native-svg'

export type IconName =
  'downArrow' | 'upArrow' | 'deleteCircle' | 'searchBoxIcon' | 'addCircle' | 'closeCircle'

export type IconProps = {
  name: IconName
  fill?: string
  width?: number
  height?: number
  viewBox?: string
} & Omit<SvgProps, 'width' | 'height' | 'viewBox'>

type GraphicDef = {
  width: number
  height: number
  viewBox: string
  content: (fill: string) => ReactElement
}

const GRAPHICS: Record<IconName, GraphicDef> = {
  downArrow: {
    width: 12,
    height: 9,
    viewBox: '0 0 12 9',
    content: (fill) => (
      <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <Polygon id="down" fill={fill} points="5.625 9 11.25 0 0 0" />
      </G>
    ),
  },
  upArrow: {
    width: 12,
    height: 9,
    viewBox: '0 0 12 9',
    content: (fill) => (
      <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <Polygon
          id="up"
          fill={fill}
          transform="translate(5.625000, 4.500000) rotate(-180.000000) translate(-5.625000, -4.500000) "
          points="5.625 9 11.25 0 0 0"
        />
      </G>
    ),
  },
  deleteCircle: {
    width: 22,
    height: 22,
    viewBox: '0 0 22 22',
    content: (fill) => (
      <G fill="none" fillRule="evenodd">
        <Circle cx="10" cy="10" r="10" fill={fill} stroke="none" />
        <Path stroke="#FFF" strokeWidth="2" fill="none" d="M16.451 10.451H3.55" />
      </G>
    ),
  },
  searchBoxIcon: {
    width: 18,
    height: 16,
    viewBox: '0 0 18 16',
    content: (fill) => (
      <G fill="none" fillRule="evenodd" transform="translate(1.4 1.16)">
        <Ellipse
          cx="5.921"
          cy="6.178"
          rx="5.921"
          ry="6.178"
          fill="none"
          stroke={fill}
          strokeWidth="1.2"
        />
        <Path d="M10.812 9.782L15.96 13.9" fill="none" stroke={fill} strokeWidth="1.2" />
      </G>
    ),
  },
  // Stroked icons must set fill="none" on each shape — RN SVG defaults Circle fill to black,
  // which shows up when toggling from deleteCircle (solid) to addCircle (outline) on deselect.
  addCircle: {
    width: 22,
    height: 22,
    viewBox: '0 0 22 22',
    content: (fill) => (
      <G fill="none" fillRule="evenodd" transform="translate(1 1)">
        <Circle cx="10" cy="10" r="10" fill="none" stroke={fill} strokeWidth="0.8" />
        <Path d="M10 3.2v12.903M16.451 9.651H3.55" fill="none" stroke={fill} strokeWidth="0.8" />
      </G>
    ),
  },
  closeCircle: {
    width: 24,
    height: 20,
    viewBox: '0 0 23 23',
    content: (fill) => (
      <G fill="none" fillRule="evenodd">
        <G transform="translate(1.000000, 1.000000)">
          <Circle cx="10.5" cy="10.5" r="10.5" fill="none" stroke={fill} strokeWidth="1" />
          <Path
            d="M5,10.5 L16.8436214,10.5"
            fill="none"
            stroke={fill}
            strokeWidth="1"
            transform="translate(10.921811, 10.500000) rotate(-315.000000) translate(-10.921811, -10.500000) "
          />
          <Path
            d="M5,10.5 L16.8436214,10.5"
            fill="none"
            stroke={fill}
            strokeWidth="1"
            transform="translate(10.921811, 10.500000) rotate(-585.000000) translate(-10.921811, -10.500000) "
          />
        </G>
      </G>
    ),
  },
}

const DEFAULT_FILLS: Partial<Record<IconName, string>> = {
  downArrow: '#4A90E2',
  upArrow: '#4A90E2',
  deleteCircle: '#E02020',
  searchBoxIcon: '#0575E6',
  addCircle: '#0575E6',
  closeCircle: '#0575E6',
}

function Icon({ name, fill, width, height, viewBox, ...otherProps }: IconProps) {
  const graphic = GRAPHICS[name]
  const resolvedFill = fill ?? DEFAULT_FILLS[name] ?? '#0575E6'
  const resolvedWidth = width ?? graphic.width
  const resolvedHeight = height ?? graphic.height

  return (
    <View pointerEvents="none">
      <Svg
        width={resolvedWidth}
        height={resolvedHeight}
        viewBox={viewBox ?? graphic.viewBox}
        x={0}
        y={0}
        {...otherProps}
      >
        {graphic.content(resolvedFill)}
      </Svg>
    </View>
  )
}

export default memo(Icon)
