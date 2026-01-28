"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const Colors_1 = __importDefault(require("./src/constants/Colors"));
const Icon_1 = __importDefault(require("./src/components/Icon"));
const OptionItem_1 = __importDefault(require("./src/components/OptionItem"));
const SelectedItem_1 = __importDefault(require("./src/components/SelectedItem"));
const SearchHeader_1 = __importDefault(require("./src/components/SearchHeader"));
const hitSlop = { top: 14, bottom: 14, left: 14, right: 14 };
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        borderColor: '#ddd',
        borderBottomWidth: 1,
        paddingTop: 6,
        paddingRight: 20,
        paddingBottom: 8,
    },
    label: {
        fontSize: 12,
        color: 'rgba(60, 60, 67, 0.6)',
        paddingBottom: 4,
    },
    selectedItem: {
        fontSize: 17,
    },
    optionsHeight: {
        width: '100%',
        maxHeight: 180,
    },
    optionListView: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 4,
    },
    listEmpty: {
        fontSize: 17,
        color: 'rgba(60, 60, 67, 0.6)',
    },
    multiListEmpty: {
        fontSize: 17,
        color: 'rgba(60, 60, 67, 0.3)',
    },
});
const SelectBox = (props) => {
    const { label = 'Label', labelStyle, containerStyle, inputFilterContainerStyle, inputFilterStyle, optionsLabelStyle, optionContainerStyle, multiOptionContainerStyle, multiOptionsLabelStyle, multiListEmptyLabelStyle, listEmptyLabelStyle, selectedItemStyle, listEmptyText = 'No results found', isMulti = false, width = '100%', inputPlaceholder = 'Select', hideInputFilter = true, selectedValues = [], arrowIconColor = Colors_1.default.primary, searchIconColor = Colors_1.default.primary, toggleIconColor = Colors_1.default.primary, options = [], multiSelectInputFieldProps = {}, listOptionProps = (props.listOptionProps || {}), selectIcon, value, searchInputProps, onChange, onMultiSelect, onTapClose, } = props;
    const [inputValue, setInputValue] = (0, react_1.useState)('');
    const [showOptions, setShowOptions] = (0, react_1.useState)(false);
    const filteredSuggestions = (0, react_1.useMemo)(() => options.filter((suggestion) => suggestion.item.toLowerCase().includes(inputValue.toLowerCase())), [inputValue, options]);
    const onChangeText = (value) => setInputValue(value);
    const onPressShowOptions = () => setShowOptions(!showOptions);
    const keyExtractor = (item) => item.id;
    const renderMultiItem = ({ item }) => ((0, jsx_runtime_1.jsx)(SelectedItem_1.default, { item: item, onRemove: () => onTapClose === null || onTapClose === void 0 ? void 0 : onTapClose(item), labelStyle: multiOptionsLabelStyle, containerStyle: multiOptionContainerStyle }));
    const renderOption = ({ item }) => ((0, jsx_runtime_1.jsx)(OptionItem_1.default, { item: item, isMulti: isMulti, onPress: isMulti
            ? () => onMultiSelect === null || onMultiSelect === void 0 ? void 0 : onMultiSelect(item)
            : () => {
                setShowOptions(false);
                onChange === null || onChange === void 0 ? void 0 : onChange(item);
            }, onToggle: isMulti ? () => onMultiSelect === null || onMultiSelect === void 0 ? void 0 : onMultiSelect(item) : undefined, checked: isMulti ? selectedValues.some((selected) => selected.id === item.id) : undefined, optionLabelStyle: optionsLabelStyle, optionContainerStyle: optionContainerStyle }));
    const renderEmpty = () => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.optionListView, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.listEmpty, listEmptyLabelStyle], children: listEmptyText }) }));
    const renderMultiEmpty = () => ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { style: { flexGrow: 1, width: '100%' }, hitSlop: hitSlop, onPress: onPressShowOptions, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.multiListEmpty, multiListEmptyLabelStyle], children: inputPlaceholder }) }));
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: width }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.label, labelStyle], children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.container, containerStyle], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingRight: 20, flexGrow: 1 }, children: isMulti ? ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, Object.assign({ data: selectedValues, keyExtractor: keyExtractor, renderItem: renderMultiItem, horizontal: true, ListEmptyComponent: renderMultiEmpty }, multiSelectInputFieldProps))) : ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { hitSlop: hitSlop, onPress: onPressShowOptions, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [
                                        styles.selectedItem,
                                        { color: (value === null || value === void 0 ? void 0 : value.item) ? '#000' : 'rgba(60, 60, 67, 0.3)' },
                                        selectedItemStyle,
                                    ], children: (value === null || value === void 0 ? void 0 : value.item) || inputPlaceholder }) })) }), (0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { onPress: onPressShowOptions, hitSlop: hitSlop, children: selectIcon || ((0, jsx_runtime_1.jsx)(Icon_1.default, { name: showOptions ? 'upArrow' : 'downArrow', fill: arrowIconColor })) })] }), showOptions && ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, Object.assign({}, listOptionProps, { data: filteredSuggestions, keyExtractor: keyExtractor, renderItem: renderOption, ListEmptyComponent: renderEmpty, ListHeaderComponent: (0, jsx_runtime_1.jsx)(SearchHeader_1.default, { inputPlaceholder: inputPlaceholder, inputValue: inputValue, onChangeText: onChangeText, searchIconColor: searchIconColor, searchInputProps: searchInputProps, inputFilterContainerStyle: inputFilterContainerStyle, inputFilterStyle: inputFilterStyle, hideInputFilter: hideInputFilter }), style: [styles.optionsHeight, listOptionProps === null || listOptionProps === void 0 ? void 0 : listOptionProps.style] })))] }) }));
};
exports.default = (0, react_1.memo)(SelectBox);
//# sourceMappingURL=index.js.map