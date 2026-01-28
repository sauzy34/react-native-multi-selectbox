"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const Icon = (_a) => {
    var { name, fill, width, height, viewBox } = _a, otherProps = __rest(_a, ["name", "fill", "width", "height", "viewBox"]);
    const graphics = {
        downArrow: {
            width: 12,
            height: 9,
            viewBox: '0 0 12 9',
            content: ((0, jsx_runtime_1.jsx)(react_native_svg_1.G, { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd", children: (0, jsx_runtime_1.jsx)(react_native_svg_1.Polygon, { id: "down", fill: fill || '#4A90E2', points: "5.625 9 11.25 0 0 0" }) })),
        },
        upArrow: {
            width: 12,
            height: 9,
            viewBox: '0 0 12 9',
            content: ((0, jsx_runtime_1.jsx)(react_native_svg_1.G, { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd", children: (0, jsx_runtime_1.jsx)(react_native_svg_1.Polygon, { id: "up", fill: fill || '#4A90E2', transform: "translate(5.625000, 4.500000) rotate(-180.000000) translate(-5.625000, -4.500000) ", points: "5.625 9 11.25 0 0 0" }) })),
        },
        deleteCircle: {
            width: 22,
            height: 22,
            viewBox: '0 0 22 22',
            content: ((0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { fill: "none", fillRule: "evenodd", children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: "10", cy: "10", r: "10", fill: fill || '#E02020' }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { stroke: "#FFF", strokeWidth: "2", d: "M16.451 10.451H3.55" })] })),
        },
        searchBoxIcon: {
            width: width || 18,
            height: height || 16,
            viewBox: '0 0 18 16',
            content: ((0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { fill: "none", fillRule: "evenodd", stroke: fill || '#0575E6', strokeWidth: "1.2", transform: "translate(1.4 1.16)", children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Ellipse, { cx: "5.921", cy: "6.178", rx: "5.921", ry: "6.178" }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: "M10.812 9.782L15.96 13.9" })] })),
        },
        addCircle: {
            width: 22,
            height: 22,
            viewBox: '0 0 22 22',
            content: ((0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { fill: "none", fillRule: "evenodd", stroke: fill || '#0575E6', strokeWidth: ".8", transform: "translate(1 1)", children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: "10", cy: "10", r: "10" }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: "M10 3.2v12.903M16.451 9.651H3.55" })] })),
        },
        closeCircle: {
            width: width || 24,
            height: height || 20,
            viewBox: '0 0 23 23',
            content: ((0, jsx_runtime_1.jsx)(react_native_svg_1.G, { id: "mobile", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd", children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { id: "close", transform: "translate(1.000000, 1.000000)", stroke: fill || '#0575E6', children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { id: "Oval", cx: "10.5", cy: "10.5", r: "10.5" }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: "M5,10.5 L16.8436214,10.5", id: "Path-2", transform: "translate(10.921811, 10.500000) rotate(-315.000000) translate(-10.921811, -10.500000) " }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: "M5,10.5 L16.8436214,10.5", id: "Path-2-Copy", transform: "translate(10.921811, 10.500000) rotate(-585.000000) translate(-10.921811, -10.500000) " })] }) })),
        },
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", children: (0, jsx_runtime_1.jsx)(react_native_svg_1.default, Object.assign({ width: width || graphics[name].width, height: height || graphics[name].height, viewBox: viewBox || graphics[name].viewBox, x: 0, y: 0 }, otherProps, { children: graphics[name].content })) }));
};
exports.default = (0, react_1.memo)(Icon);
//# sourceMappingURL=Icon.js.map