import { fireEvent, screen } from '@testing-library/react-native'
import { OPTIONS_MUTABLE } from './test-utils/fixtures'
import { renderSelectBox } from './test-utils/renderSelectBox'
import { TEST_IDS } from '../src/testIDs'
import type { SelectOption } from '../src/types'

describe('SelectBox single select', () => {
  it('opens options and calls onChange with the selected option', () => {
    const onChange = jest.fn()
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      inputPlaceholder: 'Pick a team',
      onChange,
    })

    fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
    expect(screen.getByTestId(TEST_IDS.optionsList)).toBeTruthy()

    fireEvent.press(screen.getByTestId(TEST_IDS.option('JUVE')))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'JUVE', item: 'Juventus' } satisfies Partial<SelectOption>),
    )
  })

  it('shows controlled value text when provided', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      value: { id: 'RM', item: 'Real Madrid' },
      onChange: jest.fn(),
    })

    expect(screen.getByTestId(TEST_IDS.singleTrigger)).toHaveTextContent('Real Madrid')
  })

  it('hides filter input when hideInputFilter is true', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      hideInputFilter: true,
      onChange: jest.fn(),
    })

    fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
    expect(screen.queryByTestId(TEST_IDS.filterInput)).toBeNull()
  })
})
