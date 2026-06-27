import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import SelectBox, { type SelectOption } from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'

const K_OPTIONS: SelectOption[] = [
  { item: 'Juventus', id: 'JUVE' },
  { item: 'Real Madrid', id: 'RM' },
  { item: 'Barcelona', id: 'BR' },
  { item: 'PSG', id: 'PSG' },
  { item: 'FC Bayern Munich', id: 'FBM' },
  { item: 'Manchester United FC', id: 'MUN' },
  { item: 'Manchester City FC', id: 'MCI' },
  { item: 'Everton FC', id: 'EVE' },
  { item: 'Tottenham Hotspur FC', id: 'TOT' },
  { item: 'Chelsea FC', id: 'CHE' },
  { item: 'Liverpool FC', id: 'LIV' },
  { item: 'Arsenal FC', id: 'ARS' },
  { item: 'Leicester City FC', id: 'LEI' },
]

export default function App() {
  const [selectedTeam, setSelectedTeam] = useState<SelectOption | Record<string, never>>({})
  const [selectedTeams, setSelectedTeams] = useState<SelectOption[]>([])

  const onChange = (val: SelectOption) => {
    setSelectedTeam(val)
  }

  const onMultiChange = (item: SelectOption) => {
    setSelectedTeams((prev) => xorBy(prev, [item], 'id'))
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.title}>Demos</Text>
        <Text style={styles.subtitle}>Expo SDK 56 · workspace package</Text>
      </View>

      <Text style={styles.section}>Select Demo</Text>
      <SelectBox
        label="Select single"
        options={K_OPTIONS}
        value={selectedTeam}
        onChange={onChange}
        hideInputFilter={false}
      />

      <View style={styles.spacer} />

      <Text style={styles.section}>MultiSelect Demo</Text>
      <SelectBox
        label="Select multiple"
        options={K_OPTIONS}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange}
        onTapClose={onMultiChange}
        isMulti
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 30,
    paddingBottom: 60,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    paddingBottom: 8,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(60, 60, 67, 0.6)',
    paddingBottom: 16,
  },
  section: {
    fontSize: 20,
    paddingBottom: 10,
    fontWeight: '500',
  },
  spacer: {
    height: 40,
  },
})
