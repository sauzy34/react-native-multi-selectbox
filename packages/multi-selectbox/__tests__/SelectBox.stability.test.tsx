import { createElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { ScrollView } from 'react-native'
import SelectBox from '../src/SelectBox'
import { OPTIONS_MUTABLE } from './test-utils/fixtures'
import { renderSelectBox } from './test-utils/renderSelectBox'
import { TEST_IDS } from '../src/testIDs'

describe('SelectBox stability', () => {
  it('uses FlatList for the options panel by default (virtualized)', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      onChange: jest.fn(),
    })

    fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
    const panel = screen.getByTestId(TEST_IDS.optionsList)
    // FlatList renders as RCTScrollView / VirtualizedList host in RN test renderer
    expect(panel).toBeTruthy()
    expect(panel.props.data).toEqual(OPTIONS_MUTABLE)
  })

  it('uses ScrollView when virtualized={false} (nested ScrollView-safe, no VL data prop)', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      virtualized: false,
      onChange: jest.fn(),
    })

    fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
    const panel = screen.getByTestId(TEST_IDS.optionsList)
    expect(panel.type).toBe('RCTScrollView')
    expect(panel.props.data).toBeUndefined()
  })

  it('applies inputFilterStyle color on the filter TextInput', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      inputFilterStyle: { color: '#ffffff' },
      onChange: jest.fn(),
    })

    fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
    const input = screen.getByTestId(TEST_IDS.filterInput)
    const styleProp = input.props.style
    const flat = Array.isArray(styleProp)
      ? Object.assign({}, ...styleProp.filter(Boolean))
      : styleProp
    expect(flat.color).toBe('#ffffff')
  })

  it('reflects controlled value updates from the parent', () => {
    const { rerender } = render(
      <SelectBox
        label="Team"
        options={OPTIONS_MUTABLE}
        value={{ id: 'JUVE', item: 'Juventus' }}
        onChange={jest.fn()}
      />,
    )

    expect(screen.getByTestId(TEST_IDS.singleTrigger)).toHaveTextContent('Juventus')

    rerender(
      createElement(SelectBox, {
        label: 'Team',
        options: OPTIONS_MUTABLE,
        value: { id: 'RM', item: 'Real Madrid' },
        onChange: jest.fn(),
      }),
    )

    expect(screen.getByTestId(TEST_IDS.singleTrigger)).toHaveTextContent('Real Madrid')
  })

  it('renders options inside an outer ScrollView and still selects (virtualized default)', () => {
    const onChange = jest.fn()
    const { getByTestId } = render(
      <ScrollView>
        <SelectBox label="Nested" options={OPTIONS_MUTABLE} onChange={onChange} />
      </ScrollView>,
    )

    fireEvent.press(getByTestId(TEST_IDS.dropdownToggle))
    fireEvent.press(getByTestId(TEST_IDS.option('JUVE')))
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ id: 'JUVE' }))
  })

  it('renders options inside an outer ScrollView with virtualized={false}', () => {
    const onChange = jest.fn()
    const { getByTestId } = render(
      <ScrollView>
        <SelectBox
          label="Nested"
          options={OPTIONS_MUTABLE}
          virtualized={false}
          onChange={onChange}
        />
      </ScrollView>,
    )

    fireEvent.press(getByTestId(TEST_IDS.dropdownToggle))
    fireEvent.press(getByTestId(TEST_IDS.option('JUVE')))
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ id: 'JUVE' }))
  })
})

it('opens options in an overlay (not inline under the field)', () => {
  renderSelectBox({
    label: 'Team',
    options: OPTIONS_MUTABLE,
    onChange: jest.fn(),
  })

  expect(screen.queryByTestId(TEST_IDS.optionsOverlay)).toBeNull()
  fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
  expect(screen.getByTestId(TEST_IDS.optionsOverlay)).toBeTruthy()
  expect(screen.getByTestId(TEST_IDS.optionsOverlayBackdrop)).toBeTruthy()
  expect(screen.getByTestId(TEST_IDS.optionsList)).toBeTruthy()
})

it('closes overlay when backdrop is pressed', () => {
  renderSelectBox({
    label: 'Team',
    options: OPTIONS_MUTABLE,
    onChange: jest.fn(),
  })

  fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
  fireEvent.press(screen.getByTestId(TEST_IDS.optionsOverlayBackdrop))
  expect(screen.queryByTestId(TEST_IDS.optionsOverlay)).toBeNull()
})
