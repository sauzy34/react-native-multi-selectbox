import React from 'react';
import { SvgProps } from 'react-native-svg';
export type IconName = 'downArrow' | 'upArrow' | 'deleteCircle' | 'searchBoxIcon' | 'addCircle' | 'closeCircle';
interface IconProps {
    name: IconName;
    fill?: string;
    width?: number;
    height?: number;
    viewBox?: string;
}
declare const _default: React.NamedExoticComponent<IconProps & Omit<SvgProps, keyof IconProps>>;
export default _default;
//# sourceMappingURL=Icon.d.ts.map