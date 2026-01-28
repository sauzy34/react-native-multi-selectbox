# react-native-multi-selectbox

[![npm version](https://badge.fury.io/js/react-native-multi-selectbox.svg)](https://badge.fury.io/js/react-native-multi-selectbox)
[![npm downloads](https://img.shields.io/npm/dm/react-native-multi-selectbox.svg?style=flat-square)](https://www.npmjs.com/package/react-native-multi-selectbox)

Platform independent (Android / iOS / Web) Selectbox | Picker | Multi-select | Multi-picker. The idea is to bring out the common user-interface & user-experience on both platforms. Now supports Expo with TypeScript.

![demo](https://raw.githubusercontent.com/sauzy34/react-native-multi-selectbox/master/demo.gif)

## Getting started

### Prerequisites

- Expo SDK 52+
- React Native 0.76+
- React 18+

### How to install 🎹

### `npm install react-native-multi-selectbox`

or

### `yarn add react-native-multi-selectbox`

Also install peer dependencies:

### `npm install react-native-svg`

### Usage 𖣠

```tsx
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import SelectBox, { Option } from 'react-native-multi-selectbox'

// Options data must contain 'item' & 'id' keys

const K_OPTIONS: Option[] = [
  {
    item: 'Juventus',
    id: 'JUVE',
  },
  {
    item: 'Real Madrid',
    id: 'RM',
  },
  {
    item: 'Barcelona',
    id: 'BR',
  },
  {
    item: 'PSG',
    id: 'PSG',
  },
  {
    item: 'FC Bayern Munich',
    id: 'FBM',
  },
  {
    item: 'Manchester United FC',
    id: 'MUN',
  },
  {
    item: 'Manchester City FC',
    id: 'MCI',
  },
  {
    item: 'Everton FC',
    id: 'EVE',
  },
  {
    item: 'Tottenham Hotspur FC',
    id: 'TOT',
  },
  {
    item: 'Chelsea FC',
    id: 'CHE',
  },
  {
    item: 'Liverpool FC',
    id: 'LIV',
  },
  {
    item: 'Arsenal FC',
    id: 'ARS',
  },
  {
    item: 'Leicester City FC',
    id: 'LEI',
  },
]

function App() {
  const [selectedTeam, setSelectedTeam] = useState<Option | null>(null)
  const [selectedTeams, setSelectedTeams] = useState<Option[]>([])
  return (
    <View style={{ margin: 30 }}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, paddingBottom: 20 }}>Demos</Text>
      </View>
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select Demo</Text>
      <SelectBox
        label="Select single"
        options={K_OPTIONS}
        value={selectedTeam}
        onChange={onChange}
        hideInputFilter={false}
      />
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>MultiSelect Demo</Text>
      <SelectBox
        label="Select multiple"
        options={K_OPTIONS}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange}
        onTapClose={onMultiChange}
        isMulti
      />
    </View>
  )

  function onMultiChange(item: Option) {
    const updated = selectedTeams.some(selected => selected.id === item.id)
      ? selectedTeams.filter(selected => selected.id !== item.id)
      : [...selectedTeams, item]
    setSelectedTeams(updated)
  }

  function onChange(val: Option) {
    setSelectedTeam(val)
  }
}

export default App
```

### Expo Web Demo

To run the demo on web:

```bash
npm install
npm run web
```

## Props

| Prop                      | Type                          | Default Value                                                                 | Description |
|---------------------------|-------------------------------|-------------------------------------------------------------------------------|-------------|
| `label`                   | `string`                      | `'Label'`                                                                    | The label text displayed above the select box. |
| `inputPlaceholder`        | `string`                      | `'Select'`                                                                   | Placeholder text for the input filter. |
| `listEmptyText`           | `string`                      | `'No results found'`                                                         | Text displayed when no options match the search. |
| `width`                   | `string \| number`            | `'100%'`                                                                     | Width of the select box container. |
| `isMulti`                 | `boolean`                     | `false`                                                                      | Enables multi-select mode. |
| `hideInputFilter`         | `boolean`                     | `true`                                                                       | Hides the search input filter. |
| `selectedValues`          | `Option[]`                    | `[]`                                                                         | Array of selected options for multi-select. |
| `value`                   | `Option \| null`              | `null`                                                                       | Selected option for single select. |
| `selectIcon`              | `React.ReactNode`             | `<Icon name='downArrow' />`                                                  | Custom icon for the select dropdown. |
| `labelStyle`              | `TextStyle`                   | Default style                                                                | Style for the label text. |
| `containerStyle`          | `ViewStyle`                   | Default style                                                                | Style for the main container. |
| `inputFilterContainerStyle` | `ViewStyle`                 | Default style                                                                | Style for the input filter container. |
| `inputFilterStyle`        | `TextStyle`                   | Default style                                                                | Style for the input filter text. |
| `optionsLabelStyle`       | `TextStyle`                   | Default style                                                                | Style for option labels. |
| `optionContainerStyle`    | `ViewStyle`                   | Default style                                                                | Style for individual option containers. |
| `multiOptionContainerStyle` | `ViewStyle`                 | Default style                                                                | Style for multi-select option containers. |
| `multiOptionsLabelStyle`  | `TextStyle`                   | Default style                                                                | Style for multi-select option labels. |
| `multiListEmptyLabelStyle`| `TextStyle`                   | Default style                                                                | Style for empty multi-select list. |
| `listEmptyLabelStyle`     | `TextStyle`                   | Default style                                                                | Style for empty options list. |
| `selectedItemStyle`       | `TextStyle`                   | Default style                                                                | Style for selected item text. |
| `searchInputProps`        | `TextInputProps`              | Default props                                                                | Props for the search input. |
| `multiSelectInputFieldProps` | `FlatListProps<Option>`     | Default props                                                                | Props for the multi-select FlatList. |
| `listOptionProps`         | `FlatListProps<Option>`       | Default props                                                                | Props for the options FlatList. |
| `arrowIconColor`          | `string`                      | Primary color                                                                | Color for the arrow icon. |
| `searchIconColor`         | `string`                      | Primary color                                                                | Color for the search icon. |
| `toggleIconColor`         | `string`                      | Primary color                                                                | Color for the toggle icons. |
| `options`                 | `Option[]`                    | Default options                                                              | Array of selectable options. |
| `onChange`                | `(option: Option) => void`    | -                                                                           | Callback for single select changes. |
| `onMultiSelect`          | `(option: Option) => void`    | -                                                                           | Callback for multi-select additions. |
| `onTapClose`              | `(option: Option) => void`    | -                                                                           | Callback for removing multi-select items. |

## Types

```tsx
export interface Option {
  item: string
  id: string
}

export interface SelectBoxProps {
  // See the props table for full details
}
```

## Want to be a contributor? 👷🏼‍♂️👷🏼‍♀️

Check-in `develop` branch and submit a new pull-request

## Issues or feature request? ✍🏼

You can submit a request on https://github.com/sauzy34/react-native-multi-selectbox/issues

## Support & Share 💆🏼‍♂️

Please star the repository on Github to enhance the reach to more developers.
