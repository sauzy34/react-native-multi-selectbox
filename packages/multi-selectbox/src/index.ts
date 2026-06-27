/**
 * Public entry for `react-native-multi-selectbox`.
 * Single source of truth: `packages/multi-selectbox/src` (legacy root `/lib` removed in Phase 3).
 * Implementation is still JS; Phase 4 converts modules to TypeScript with full prop types.
 */
import SelectBox from './SelectBox'

export default SelectBox
export { SelectBox }
export type { SelectBoxProps, SelectOption } from './SelectBox'
