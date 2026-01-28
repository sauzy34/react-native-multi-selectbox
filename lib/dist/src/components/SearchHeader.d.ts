import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { SelectBoxProps } from '../types';
interface SearchHeaderProps {
    inputPlaceholder: string;
    inputValue: string;
    onChangeText: (text: string) => void;
    searchIconColor: string;
    searchInputProps?: SelectBoxProps['searchInputProps'];
    inputFilterContainerStyle?: ViewStyle;
    inputFilterStyle?: TextStyle;
    hideInputFilter: boolean;
}
declare const SearchHeader: React.FC<SearchHeaderProps>;
export default SearchHeader;
//# sourceMappingURL=SearchHeader.d.ts.map