"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const Colors_1 = __importDefault(require("../constants/Colors"));
const Icon_1 = __importDefault(require("./Icon"));
const Toggle = (_a) => {
    var { onTouch, checked, iconColor = Colors_1.default.primary } = _a, props = __rest(_a, ["onTouch", "checked", "iconColor"]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, Object.assign({ onPress: onTouch, hitSlop: { top: 10, bottom: 10, left: 10, right: 10 } }, props, { children: (0, jsx_runtime_1.jsx)(Icon_1.default, { name: checked ? 'deleteCircle' : 'addCircle', fill: iconColor }) })));
};
exports.default = (0, react_1.memo)(Toggle);
//# sourceMappingURL=Toggle.js.map