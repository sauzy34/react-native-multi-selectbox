import { fireEvent, screen } from '@testing-library/react-native'
import { TouchableOpacity } from 'react-native'
import { OPTIONS_MUTABLE } from './test-utils/fixtures'
import { renderSelectBox } from './test-utils/renderSelectBox'
import { TEST_IDS } from './testIDs'

describe('SelectBox multi select', () => {
  it('calls onMultiSelect when an option is pressed', () => {
    const onMultiSelect = jest.fn()
    renderSelectBox({
      isMulti: true,
      label: 'Teams',
      options: OPTIONS_MUTABLE,
      selectedValues: [],
      onMultiSelect,
    })

    fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
    fireEvent.press(screen.getByTestId(TEST_IDS.option('BR')))

    expect(onMultiSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'BR', item: 'Barcelona' }),
    )
  })

  it('renders selected chips and invokes onTapClose from chip close control', () => {
    const onTapClose = jest.fn()
    renderSelectBox({
      isMulti: true,
      label: 'Teams',
      options: OPTIONS_MUTABLE,
      selectedValues: [{ id: 'JUVE', item: 'Juventus' }],
      onMultiSelect: jest.fn(),
      onTapClose,
    })

    expect(screen.getByTestId(TEST_IDS.multiChip('JUVE'))).toBeTruthy()

    const touchables = screen.UNSAFE_getAllByType(TouchableOpacity)
    const closeBtn = touchables.find(
      (n) => (n.props.style as { marginLeft?: number } | undefined)?.marginLeft === 15,
    )
    expect(closeBtn).toBeDefined()
    fireEvent.press(closeBtn!)
    expect(onTapClose).toHaveBeenCalledWith(expect.objectContaining({ id: 'JUVE' }))
  })
})
