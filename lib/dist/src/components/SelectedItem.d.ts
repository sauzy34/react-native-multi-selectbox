import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { Option } from '../types';
interface SelectedItemProps {
    item: Option;
    onRemove: () => void;
    labelStyle?: TextStyle;
    containerStyle?: ViewStyle;
}
declare const SelectedItem: React.FC<SelectedItemProps>;
export default SelectedItem;
//# sourceMappingURL=SelectedItem.d.ts.map