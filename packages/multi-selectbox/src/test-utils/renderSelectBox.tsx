import { render, type RenderOptions } from '@testing-library/react-native'
import SelectBox from '../SelectBox'
import type { SelectBoxProps } from '../types'

export function renderSelectBox(props: SelectBoxProps, options?: RenderOptions) {
  return render(<SelectBox {...props} />, options)
}
