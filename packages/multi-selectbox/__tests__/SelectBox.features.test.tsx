import { fireEvent, screen } from '@testing-library/react-native'
import { Text } from 'react-native'
import { OPTIONS_MUTABLE } from './test-utils/fixtures'
import { renderSelectBox } from './test-utils/renderSelectBox'
import { TEST_IDS } from '../src/testIDs'

describe('SelectBox open-issue features', () => {
  it('applies activeOptionsLabelStyle to selected multi options', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      isMulti: true,
      selectedValues: [{ id: 'JUVE', item: 'Juventus' }],
      onMultiSelect: jest.fn(),
      onTapClose: jest.fn(),
      activeOptionsLabelStyle: { color: '#ff0000' },
    })
    fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
    const row = screen.getByTestId(TEST_IDS.option('JUVE'))
    const text = row.findAllByType(Text)[0]
    const flat = Array.isArray(text?.props.style)
      ? Object.assign({}, ...text!.props.style.filter(Boolean))
      : text?.props.style
    expect(flat.color).toBe('#ff0000')
  })

  it('honours maxSelected and ignores further multi adds', () => {
    const onMultiSelect = jest.fn()
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      isMulti: true,
      selectedValues: [
        { id: 'JUVE', item: 'Juventus' },
        { id: 'RM', item: 'Real Madrid' },
      ],
      maxSelected: 2,
      onMultiSelect,
      onTapClose: jest.fn(),
    })
    fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
    fireEvent.press(screen.getByTestId(TEST_IDS.option('BR')))
    expect(onMultiSelect).not.toHaveBeenCalled()
  })

  it('allows multi select when under maxSelected', () => {
    const onMultiSelect = jest.fn()
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      isMulti: true,
      selectedValues: [{ id: 'JUVE', item: 'Juventus' }],
      maxSelected: 2,
      onMultiSelect,
      onTapClose: jest.fn(),
    })
    fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
    fireEvent.press(screen.getByTestId(TEST_IDS.option('RM')))
    expect(onMultiSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'RM' }))
  })

  it('maps options with optionLabelKey / optionIdKey', () => {
    const onChange = jest.fn()
    renderSelectBox({
      label: 'City',
      options: [
        { id: '1', name: 'Paris' },
        { id: '2', name: 'Lyon' },
      ],
      optionLabelKey: 'name',
      onChange,
    })
    fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
    fireEvent.press(screen.getByTestId(TEST_IDS.option('1')))
    expect(onChange).toHaveBeenCalledWith({ id: '1', item: 'Paris' })
  })

  it('opens by default when defaultOpen is true', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      defaultOpen: true,
      onChange: jest.fn(),
    })
    expect(screen.getByTestId(TEST_IDS.optionsList)).toBeTruthy()
  })

  it('notifies onOpenChange when toggling', () => {
    const onOpenChange = jest.fn()
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      onChange: jest.fn(),
      onOpenChange,
    })
    fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
    expect(onOpenChange).toHaveBeenLastCalledWith(true)
    fireEvent.press(screen.getByTestId(TEST_IDS.option('JUVE')))
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
  })

  it('does not open when editable is false', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      editable: false,
      onChange: jest.fn(),
    })
    fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
    expect(screen.queryByTestId(TEST_IDS.optionsList)).toBeNull()
  })

  it('hides dropdown icon when hideDropdownIcon is true', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      hideDropdownIcon: true,
      onChange: jest.fn(),
    })
    expect(screen.queryByTestId(TEST_IDS.dropdownToggle)).toBeNull()
  })

  it('hides chip close control when hideChipClose is true', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      isMulti: true,
      selectedValues: [{ id: 'JUVE', item: 'Juventus' }],
      hideChipClose: true,
      onMultiSelect: jest.fn(),
      onTapClose: jest.fn(),
    })
    expect(screen.queryByTestId(TEST_IDS.multiChipClose('JUVE'))).toBeNull()
    expect(screen.getByTestId(TEST_IDS.multiChip('JUVE'))).toBeTruthy()
  })

  it('renders multi chip leading content (avatar slot)', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      isMulti: true,
      selectedValues: [{ id: 'JUVE', item: 'Juventus' }],
      renderMultiChipLeading: () => <Text testID="avatar">A</Text>,
      onMultiSelect: jest.fn(),
      onTapClose: jest.fn(),
    })
    expect(screen.getByTestId(TEST_IDS.multiChipLeading('JUVE'))).toBeTruthy()
    expect(screen.getByTestId('avatar')).toBeTruthy()
  })

  it('applies optionsAlign text alignment on option labels', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      optionsAlign: 'right',
      defaultOpen: true,
      onChange: jest.fn(),
    })
    const row = screen.getByTestId(TEST_IDS.option('JUVE'))
    const text = row.findAllByType(Text)[0]
    const flat = Array.isArray(text?.props.style)
      ? Object.assign({}, ...text!.props.style.filter(Boolean))
      : text?.props.style
    expect(flat.textAlign).toBe('right')
  })

  it('applies optionsMaxHeight on the options panel', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      defaultOpen: true,
      optionsMaxHeight: 320,
      onChange: jest.fn(),
    })
    const panel = screen.getByTestId(TEST_IDS.optionsList)
    const flatten = (style: unknown): Record<string, unknown> => {
      if (!style) return {}
      if (Array.isArray(style)) {
        return Object.assign({}, ...style.map(flatten).filter((x) => x && typeof x === 'object'))
      }
      return typeof style === 'object' ? (style as Record<string, unknown>) : {}
    }
    expect(flatten(panel.props.style).maxHeight).toBe(320)
  })
})
