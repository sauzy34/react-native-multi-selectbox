import { createElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { ScrollView } from 'react-native'
import SelectBox from '../src/SelectBox'
import { OPTIONS_MUTABLE } from './test-utils/fixtures'
import { renderSelectBox } from './test-utils/renderSelectBox'
import { TEST_IDS } from '../src/testIDs'

describe('SelectBox stability', () => {
  it('uses ScrollView for the options panel by default (host-safe, no VL data prop)', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      onChange: jest.fn(),
    })

    fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
    const panel = screen.getByTestId(TEST_IDS.optionsList)
    expect(panel.type).toBe('RCTScrollView')
    expect(panel.props.data).toBeUndefined()
  })

  it('uses FlatList when virtualized={true} (windowed options)', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      virtualized: true,
      onChange: jest.fn(),
    })

    fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
    const panel = screen.getByTestId(TEST_IDS.optionsList)
    expect(panel).toBeTruthy()
    expect(panel.props.data).toEqual(OPTIONS_MUTABLE)
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

  it('renders options inside an outer ScrollView and still selects (default host-safe)', () => {
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

  it('renders options inside an outer ScrollView with virtualized={true}', () => {
    const onChange = jest.fn()
    const { getByTestId } = render(
      <ScrollView>
        <SelectBox
          label="Nested"
          options={OPTIONS_MUTABLE}
          virtualized={true}
          onChange={onChange}
        />
      </ScrollView>,
    )

    fireEvent.press(getByTestId(TEST_IDS.dropdownToggle))
    fireEvent.press(getByTestId(TEST_IDS.option('JUVE')))
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ id: 'JUVE' }))
  })
})
