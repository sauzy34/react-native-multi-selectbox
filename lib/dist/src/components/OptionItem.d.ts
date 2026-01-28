import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { Option } from '../types';
interface OptionItemProps {
    item: Option;
    isMulti: boolean;
    onPress: () => void;
    onToggle?: () => void;
    checked?: boolean;
    optionLabelStyle?: TextStyle;
    optionContainerStyle?: ViewStyle;
}
declare const OptionItem: React.FC<OptionItemProps>;
export default OptionItem;
//# sourceMappingURL=OptionItem.d.ts.map