"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const Icon_1 = __importDefault(require("./Icon"));
const styles = react_native_1.StyleSheet.create({
    inputFilterContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 18,
        justifyContent: 'space-between',
    },
    inputFilter: {
        paddingVertical: 14,
        paddingRight: 8,
        color: '#000',
        fontSize: 12,
        flexGrow: 1,
    },
});
const SearchHeader = ({ inputPlaceholder, inputValue, onChangeText, searchIconColor, searchInputProps, inputFilterContainerStyle, inputFilterStyle, hideInputFilter, }) => {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !hideInputFilter && ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.inputFilterContainer, inputFilterContainerStyle], children: [(0, jsx_runtime_1.jsx)(react_native_1.TextInput, Object.assign({ value: inputValue, placeholder: inputPlaceholder, onChangeText: onChangeText, style: [styles.inputFilter, inputFilterStyle], placeholderTextColor: "#000" }, searchInputProps)), (0, jsx_runtime_1.jsx)(Icon_1.default, { name: "searchBoxIcon", fill: searchIconColor })] })) }));
};
exports.default = SearchHeader;
//# sourceMappingURL=SearchHeader.js.map