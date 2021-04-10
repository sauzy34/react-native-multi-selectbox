import React, {memo, PropsWithoutRef} from 'react';
import {TouchableOpacity, GestureResponderEvent} from 'react-native';
import {Color} from 'react-native-svg';
import Colors from '../constants/Colors';
import Icon from './Icon';

export type ToggleProps = PropsWithoutRef<{
  onTouch?: (event: GestureResponderEvent) => void;
  checked?: boolean;
  iconColor?: Color;
}>;

function Toggle({
  onTouch,
  checked,
  iconColor = Colors.primary,
  ...props
}: ToggleProps) {
  return (
    <TouchableOpacity
      onPress={onTouch}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      {...props}>
      <Icon name={checked ? 'deleteCircle' : 'addCircle'} fill={iconColor} />
    </TouchableOpacity>
  );
}

export default memo(Toggle);
