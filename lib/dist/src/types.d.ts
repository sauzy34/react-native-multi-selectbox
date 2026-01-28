/// <reference types="react" />
import { ViewStyle, TextStyle, TextInputProps, FlatListProps } from 'react-native';
export interface Option {
    item: string;
    id: string;
}
export interface SelectBoxProps {
    label?: string;
    labelStyle?: TextStyle;
    containerStyle?: ViewStyle;
    inputFilterContainerStyle?: ViewStyle;
    inputFilterStyle?: TextStyle;
    optionsLabelStyle?: TextStyle;
    optionContainerStyle?: ViewStyle;
    multiOptionContainerStyle?: ViewStyle;
    multiOptionsLabelStyle?: TextStyle;
    multiListEmptyLabelStyle?: TextStyle;
    listEmptyLabelStyle?: TextStyle;
    selectedItemStyle?: TextStyle;
    listEmptyText?: string;
    selectIcon?: React.ReactNode;
    inputPlaceholder?: string;
    hideInputFilter?: boolean;
    width?: string | number;
    isMulti?: boolean;
    options?: Option[];
    value?: Option | null;
    selectedValues?: Option[];
    arrowIconColor?: string;
    searchIconColor?: string;
    toggleIconColor?: string;
    searchInputProps?: TextInputProps;
    multiSelectInputFieldProps?: FlatListProps<Option>;
    listOptionProps?: FlatListProps<Option>;
    onChange?: (option: Option) => void;
    onMultiSelect?: (option: Option) => void;
    onTapClose?: (option: Option) => void;
}
//# sourceMappingURL=types.d.ts.map