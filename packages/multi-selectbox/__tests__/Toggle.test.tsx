import { fireEvent, render, screen } from '@testing-library/react-native'
import Toggle from '../src/components/Toggle'

describe('Toggle', () => {
  it('invokes onTouch when pressed', () => {
    const onTouch = jest.fn()
    render(<Toggle onTouch={onTouch} testID="toggle" />)
    fireEvent.press(screen.getByTestId('toggle'))
    expect(onTouch).toHaveBeenCalledTimes(1)
  })

  it('renders add glyph when unchecked and delete glyph when checked', () => {
    const { rerender, toJSON } = render(<Toggle checked={false} testID="toggle" />)
    const unchecked = JSON.stringify(toJSON())
    expect(unchecked).toContain('+')

    rerender(<Toggle checked testID="toggle" />)
    const checked = JSON.stringify(toJSON())
    // deleteCircle glyph (minus), not closeCircle (×)
    expect(checked).toContain('−')
  })

  it('uses iconColor for the glyph fill', () => {
    const { toJSON } = render(<Toggle checked iconColor="#112233" testID="toggle" />)
    const tree = JSON.stringify(toJSON())
    expect(tree).toContain('#112233')
  })
})
