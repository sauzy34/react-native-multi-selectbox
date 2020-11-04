import React, { memo } from 'react'
import { View } from 'react-native'
import Svg, { Path, G, Ellipse, Polygon, Circle } from 'react-native-svg'

const Icon = ({ name, fill, width, height, viewBox, ...otherProps }) => {
  const graphics = {
    downArrow: {
      width: 12,
      height: 9,
      viewBox: '0 0 12 9',
      content: (
        <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <Polygon id="down" fill={fill || '#4A90E2'} points="5.625 9 11.25 0 0 0" />
        </G>
      ),
    },
    upArrow: {
      width: 12,
      height: 9,
      viewBox: '0 0 12 9',
      content: (
        <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <Polygon
            id="up"
            fill={fill || '#4A90E2'}
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
      content: (
        <G fill="none" fillRule="evenodd">
          <Circle cx="10" cy="10" r="10" fill={fill || '#E02020'} />
          <Path stroke="#FFF" strokeWidth="2" d="M16.451 10.451H3.55" />
        </G>
      ),
    },
    searchBoxIcon: {
      width: width || 18,
      height: height || 16,
      viewBox: '0 0 18 16',
      content: (
        <G fill="none" fillRule="evenodd" stroke={fill || '#0575E6'} strokeWidth="1.2" transform="translate(1.4 1.16)">
          <Ellipse cx="5.921" cy="6.178" rx="5.921" ry="6.178" />
          <Path d="M10.812 9.782L15.96 13.9" />
        </G>
      ),
    },

    addCircle: {
      width: 22,
      height: 22,
      viewBox: '0 0 22 22',
      content: (
        <G fill="none" fillRule="evenodd" stroke={fill || '#0575E6'} strokeWidth=".8" transform="translate(1 1)">
          <Circle cx="10" cy="10" r="10" />
          <Path d="M10 3.2v12.903M16.451 9.651H3.55" />
        </G>
      ),
    },
    closeCircle: {
      width: width || 24,
      height: height || 20,
      viewBox: '0 0 23 23',
      content: (
        <G id="mobile" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <G id="close" transform="translate(1.000000, 1.000000)" stroke={fill || '#0575E6'}>
            <Circle id="Oval" cx="10.5" cy="10.5" r="10.5" />
            <Path
              d="M5,10.5 L16.8436214,10.5"
              id="Path-2"
              transform="translate(10.921811, 10.500000) rotate(-315.000000) translate(-10.921811, -10.500000) "
            />
            <Path
              d="M5,10.5 L16.8436214,10.5"
              id="Path-2-Copy"
              transform="translate(10.921811, 10.500000) rotate(-585.000000) translate(-10.921811, -10.500000) "
            />
          </G>
        </G>
      ),
    },
  }

  return (
    <View pointerEvents="none">
      <Svg
        width={width || graphics[name].width}
        height={height || graphics[name].height}
        viewBox={viewBox || graphics[name].viewBox}
        x={0}
        y={0}
        {...otherProps}>
        {graphics[name].content}
      </Svg>
    </View>
  )
}

export default memo(Icon)
