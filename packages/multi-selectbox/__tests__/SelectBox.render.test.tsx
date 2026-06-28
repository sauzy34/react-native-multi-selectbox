import { screen } from '@testing-library/react-native'
import { OPTIONS_MUTABLE } from './test-utils/fixtures'
import { renderSelectBox } from './test-utils/renderSelectBox'
import { TEST_IDS } from '../src/testIDs'

describe('SelectBox render', () => {
  it('renders label and root test id', () => {
    renderSelectBox({
      label: 'Select single',
      options: OPTIONS_MUTABLE,
      onChange: jest.fn(),
    })

    expect(screen.getByTestId(TEST_IDS.root)).toBeTruthy()
    expect(screen.getByTestId(TEST_IDS.label)).toHaveTextContent('Select single')
  })

  it('does not throw when options is not an array (runtime guard)', () => {
    expect(() =>
      renderSelectBox({
        label: 'Broken options',
        // @ts-expect-error intentional invalid runtime shape
        options: null,
        onChange: jest.fn(),
      }),
    ).not.toThrow()
    expect(screen.getByTestId(TEST_IDS.root)).toBeTruthy()
  })

  it('renders inside a ScrollView parent without throwing', () => {
    const { ScrollView } = require('react-native')
    const SelectBox = require('../src/SelectBox').default
    const { render } = require('@testing-library/react-native')

    expect(() =>
      render(
        <ScrollView>
          <SelectBox label="Nested" options={OPTIONS_MUTABLE} onChange={jest.fn()} />
        </ScrollView>,
      ),
    ).not.toThrow()
  })
})
