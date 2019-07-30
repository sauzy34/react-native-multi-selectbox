# react-native-multi-selectbox 

Renders the Picker/SelectBox/Dropdown with common styling for iOS/Android.

## Getting started

### How to install:

### `npm install react-native-multi-selectbox`

or

### `yarn add react-native-multi-selectbox`

### How to use ?

```

import React from 'react'
import SelectBox  from 'react-native-multi-selectbox'
import { xor } from 'lodash'

class Example extends React.Component {
  state = {
    selectedLocations: [],
    selectedValues: [],
    locations: [
      { item: 'Afghanistan', id: 'AF' },
      { item: 'land Islands', id: 'AX' },
      { item: 'Albania', id: 'AL' },
      { item: 'Algeria', id: 'DZ' },
      { item: 'American Samoa', id: 'AS' },
      { item: 'AndorrA', id: 'AD' },
      { item: 'Angola', id: 'AO' },
      { item: 'Anguilla', id: 'AI' },
      { item: 'Antarctica', id: 'AQ' },
      { item: 'Antigua and Barbuda', id: 'AG' },
      { item: 'Argentina', id: 'AR' },
      { item: 'Armenia', id: 'AM' },
      { item: 'Aruba', id: 'AW' }
    ]
  }

  render() {
    const { locations, selectedLocations, selectedValues } = this.state
    return (
      <React.Fragment>
        <SelectBox
          label="Select Location"
          options={locations}
          value={selectedLocations[0]}
          onChange={val => this.setState({ selectedLocations: [val] })}
          hideInputFilter={false}
          viewMargin="0 0 20px 0"
        />
        <SelectBox
          label="Select Groups"
          options={locations}
          selectedValues={selectedValues}
          onMultiSelect={item => this.setState({ selectedValues: xor(selectedValues, [item]) })}
          onTapClose={val => this.setState({ selectedValues: xor(selectedValues, [val]) })}
          viewMargin="0 0 20px 0"
          isMulti
        />
      </React.Fragment>
    )
  }
}

```