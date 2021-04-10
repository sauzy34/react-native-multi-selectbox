import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SelectBox from './dist';
import {xorBy} from 'lodash';

// Options data must contain 'item' & 'id' keys

const K_OPTIONS = [
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
];

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    paddingBottom: 20,
  },
  label: {
    fontSize: 20,
    paddingBottom: 10,
  },
  spacer: {
    height: 40,
  },
});

function App() {
  const [selectedTeam, setSelectedTeam] = useState({});
  const [selectedTeams, setSelectedTeams] = useState([]);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Demos</Text>
      </View>
      <Text style={styles.label}>Select Demo</Text>
      <SelectBox
        label="Select single"
        options={K_OPTIONS}
        value={selectedTeam}
        onChange={onChange()}
        hideInputFilter={false}
      />
      <View style={styles.spacer} />
      <Text style={styles.label}>MultiSelect Demo</Text>
      <SelectBox
        label="Select multiple"
        options={K_OPTIONS}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />
    </View>
  );

  function onMultiChange() {
    return item => setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
  }

  function onChange() {
    return val => setSelectedTeam(val);
  }
}

export default App;
