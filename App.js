import React from 'react'
import { Text, View } from 'react-native'
import SelectBox from './lib'
import { xorBy } from 'lodash'

export default class App extends React.Component {
  state = {
    selectedLocations: {},
    selectedValues: [],
    locations: [
      {
        item: 'Aston Villa FC',
        id: 'AVL'
      },
      {
        item: 'West Ham United FC',
        id: 'WHU'
      },
      {
        item: 'Stoke City FC',
        id: 'STK'
      },
      {
        item: 'Sunderland AFC',
        id: 'SUN'
      },
      {
        item: 'Everton FC',
        id: 'EVE'
      },
      {
        item: 'Tottenham Hotspur FC',
        id: 'TOT'
      },
      {
        item: 'Manchester City FC',
        id: 'MCI'
      },
      {
        item: 'Chelsea FC',
        id: 'CHE'
      },
      {
        item: 'West Bromwich Albion FC',
        id: 'WBA'
      },
      {
        item: 'Liverpool FC',
        id: 'LIV'
      },
      {
        item: 'Arsenal FC',
        id: 'ARS'
      },
      {
        item: 'Manchester United FC',
        id: 'MUN'
      },
      {
        item: 'Newcastle United FC',
        id: 'NEW'
      },
      {
        item: 'Norwich City FC',
        id: 'NOR'
      },
      {
        item: 'Watford FC',
        id: 'WAT'
      },
      {
        item: 'Swansea City FC',
        id: 'SWA'
      },
      {
        item: 'Crystal Palace FC',
        id: 'CRY'
      },
      {
        item: 'Leicester City FC',
        id: 'LEI'
      },
      {
        item: 'Southampton FC',
        id: 'SOU'
      },
      {
        item: 'AFC Bournemouth',
        id: 'BOU'
      }
    ]
  }
  render() {
    const { locations, selectedLocations, selectedValues } = this.state
    return (
      <View style={{ margin: 30 }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, paddingBottom: 20 }}>Demos</Text>
        </View>
        <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select Demo</Text>
        <SelectBox
          label="Select"
          options={locations}
          value={selectedLocations}
          onChange={val => this.setState({ selectedLocations: val })}
          hideInputFilter={false}
        />
        <View style={{ height: 40 }} />
        <Text style={{ fontSize: 20, paddingBottom: 10 }}>MultiSelect Demo</Text>
        <SelectBox
          label="Select Groups"
          options={locations}
          selectedValues={selectedValues}
          onMultiSelect={item => {
            this.setState({ selectedValues: xorBy(selectedValues, [item], 'id') })
          }}
          onTapClose={val => {
            this.setState({ selectedValues: xorBy(selectedValues, [val], 'id') })
          }}
          isMulti
        />
      </View>
    )
  }
}
