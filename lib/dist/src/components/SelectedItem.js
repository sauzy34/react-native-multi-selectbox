"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const Colors_1 = __importDefault(require("../constants/Colors"));
const Icon_1 = __importDefault(require("./Icon"));
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 20,
        paddingVertical: 5,
        paddingRight: 5,
        paddingLeft: 10,
        marginRight: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors_1.default.primary,
        flexGrow: 1,
    },
    label: {
        fontSize: 10,
        color: '#fff',
    },
});
const SelectedItem = ({ item, onRemove, labelStyle, containerStyle }) => {
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.container, containerStyle], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.label, labelStyle], children: item.item }), (0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { style: { marginLeft: 15 }, onPress: onRemove, children: (0, jsx_runtime_1.jsx)(Icon_1.default, { name: "closeCircle", fill: "#fff", width: 21, height: 21 }) })] }));
};
exports.default = SelectedItem;
//# sourceMappingURL=SelectedItem.js.map