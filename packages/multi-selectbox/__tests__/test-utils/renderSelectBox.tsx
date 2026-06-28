import { render, type RenderOptions } from '@testing-library/react-native'
import SelectBox from '../../src/SelectBox'
import type { SelectBoxProps } from '../../src/types'

export function renderSelectBox(props: SelectBoxProps, options?: RenderOptions) {
  return render(<SelectBox {...props} />, options)
}
