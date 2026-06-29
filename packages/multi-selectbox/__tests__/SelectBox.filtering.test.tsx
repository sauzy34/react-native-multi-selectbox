import { fireEvent, screen } from '@testing-library/react-native'
import { OPTIONS_MUTABLE } from './test-utils/fixtures'
import { renderSelectBox } from './test-utils/renderSelectBox'
import { TEST_IDS } from '../src/testIDs'

describe('SelectBox filtering', () => {
  it('filters options by input text (case-insensitive)', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      onChange: jest.fn(),
    })

    fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
    fireEvent.changeText(screen.getByTestId(TEST_IDS.filterInput), 'real')

    expect(screen.getByTestId(TEST_IDS.option('RM'))).toBeTruthy()
    expect(screen.queryByTestId(TEST_IDS.option('JUVE'))).toBeNull()
    expect(screen.queryByTestId(TEST_IDS.option('BR'))).toBeNull()
  })

  it('shows list empty text when nothing matches', () => {
    renderSelectBox({
      label: 'Team',
      options: OPTIONS_MUTABLE,
      listEmptyText: 'No clubs found',
      onChange: jest.fn(),
    })

    fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
    fireEvent.changeText(screen.getByTestId(TEST_IDS.filterInput), 'zzzz')

    expect(screen.getByTestId(TEST_IDS.listEmpty)).toHaveTextContent('No clubs found')
  })
})

it('shows clear control when filter has text and clears on press', () => {
  renderSelectBox({
    label: 'Team',
    options: OPTIONS_MUTABLE,
    onChange: jest.fn(),
  })

  fireEvent.press(screen.getByTestId(TEST_IDS.dropdownToggle))
  expect(screen.getByTestId(TEST_IDS.filterSearchIcon)).toBeTruthy()
  expect(screen.queryByTestId(TEST_IDS.filterClear)).toBeNull()

  fireEvent.changeText(screen.getByTestId(TEST_IDS.filterInput), 'real')
  expect(screen.queryByTestId(TEST_IDS.filterSearchIcon)).toBeNull()
  expect(screen.getByTestId(TEST_IDS.filterClear)).toBeTruthy()
  expect(screen.getByTestId(TEST_IDS.option('RM'))).toBeTruthy()
  expect(screen.queryByTestId(TEST_IDS.option('JUVE'))).toBeNull()

  fireEvent.press(screen.getByTestId(TEST_IDS.filterClear))
  expect(screen.getByTestId(TEST_IDS.filterInput).props.value).toBe('')
  expect(screen.getByTestId(TEST_IDS.filterSearchIcon)).toBeTruthy()
  expect(screen.getByTestId(TEST_IDS.option('JUVE'))).toBeTruthy()
  expect(screen.getByTestId(TEST_IDS.option('RM'))).toBeTruthy()
})
