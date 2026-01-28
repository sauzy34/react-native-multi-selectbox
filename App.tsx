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
    <View style={{ margin: 30, backgroundColor: '#f0f0f0' }}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, paddingBottom: 20 }}>Demos</Text>
      </View>
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select Demo</Text>
      <SelectBox
        label="Select single"
        options={K_OPTIONS}
        value={selectedTeam}
        onChange={onChange()}
        hideInputFilter={false}
      />
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>MultiSelect Demo</Text>
      <SelectBox
        label="Select multiple"
        options={K_OPTIONS}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />
    </View>
  )

  function onMultiChange() {
    return (item: Option) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
  }

  function onChange() {
    return (val: Option) => setSelectedTeam(val)
  }
}

const xorBy = <T,>(array: T[], items: T[], key: keyof T): T[] => {
  const ids = new Set(items.map(i => i[key]))
  return array.filter(a => !ids.has(a[key])).concat(items.filter(i => !array.some(a => a[key] === i[key])))
}

export default App