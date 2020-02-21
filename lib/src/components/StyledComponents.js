import styled from 'styled-components'
import { View, TouchableOpacity, TextInput } from 'react-native'

const FlexWrapper = styled(View)(
  props => `
  flex-direction: ${props.direction || 'column'};
  justify-content: ${props.justifyContent || 'flex-start'};
  align-items: ${props.alignItems || 'flex-start'};
  margin: ${props.viewMargin || '0px'};
  padding: ${props.viewPadding || '0px'};
  width: ${props.width || 'auto'};
  height: ${props.height || 'auto'};
  flex-basis: ${props.flexBasis || 'auto'};
  flex-wrap: ${props.flexWrap || 'nowrap'};
  background: ${props.background || 'transparent'};
  position: ${props.position || 'relative'};
  border-radius: ${props.borderRadius || '0px'};
  border-width: ${props.borderWidth || '0px'};
  border-color: ${props.borderColor || '#fff'};
`
)
const TouchableFlex = styled(TouchableOpacity)(
  props => `
  flex-direction: ${props.direction || 'column'};
  justify-content: ${props.justifyContent || 'flex-start'};
  align-items: ${props.alignItems || 'flex-start'};
  margin: ${props.viewMargin || '0px'};
  padding: ${props.viewPadding || '0px'};
  width: ${props.width || 'auto'};
  height: ${props.height || 'auto'};
  flex-basis: ${props.flexBasis || 'auto'};
  flex-wrap: ${props.flexWrap || 'nowrap'};
  background: ${props.background || 'transparent'};
  position: ${props.position || 'relative'};
  border-radius: ${props.borderRadius || '0px'};
  border-width: ${props.borderWidth || '0px'};
  border-color: ${props.borderColor || '#fff'};
`
)
const Input = styled(TextInput)`
  padding: 14px 8px 14px 0px;
  color: ${props => props.color || '#000'};
  font-size: 12px;
  flex-grow: 1;
`
const InputWrapper = styled(FlexWrapper)`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  flex-direction: row;
  align-items: center;
  padding-right: 18px;
  justify-content: space-between;
`
export { FlexWrapper, TouchableFlex, Input, InputWrapper }
