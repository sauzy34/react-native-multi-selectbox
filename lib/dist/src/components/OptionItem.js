"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const Toggle_1 = __importDefault(require("./Toggle"));
const styles = react_native_1.StyleSheet.create({
    optionContainer: {
        borderColor: '#dadada',
        borderBottomWidth: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingRight: 10,
        justifyContent: 'space-between',
    },
});
const OptionItem = ({ item, isMulti, onPress, onToggle, checked, optionLabelStyle, optionContainerStyle, }) => {
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles.optionContainer, optionContainerStyle], children: isMulti ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { style: { flexShrink: 1 }, onPress: onPress, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: optionLabelStyle, children: item.item }) }), (0, jsx_runtime_1.jsx)(Toggle_1.default, { checked: checked, onTouch: onToggle })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { style: { flexShrink: 1 }, onPress: onPress, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: optionLabelStyle, children: item.item }) })) }));
};
exports.default = OptionItem;
//# sourceMappingURL=OptionItem.js.map