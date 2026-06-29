/**
 * Familiar form host: vertical ScrollView.
 *
 * Simple for short/medium forms, but RN warns if SelectBox options use the default
 * FlatList (virtualized={true}) inside a vertical ScrollView. Always pass
 * `virtualized={false}` in this layout so options are ScrollView + map.
 *
 * See also: SectionListHostDemo.tsx (preferred for long screens).
 */
import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import SelectBox, { type SelectOption } from 'react-native-multi-selectbox'
import {
  COUNTRIES,
  DEPARTMENTS,
  NOTIFICATION_CHANNELS,
  PROJECT_TAGS,
  SKILLS,
  TIMEZONES,
  readLabel,
  toggleById,
} from './shared/data'
import { demoStyles, theme } from './shared/theme'
import { DemoCard, HostCallout, SelectionSummary } from './shared/ui'

export default function ScrollViewHostDemo() {
  const [country, setCountry] = useState<SelectOption | Record<string, never>>({})
  const [timezone, setTimezone] = useState<SelectOption | Record<string, never>>({
    id: 'utc',
    item: 'UTC',
  })
  const [department, setDepartment] = useState<SelectOption | Record<string, never>>({})
  const [skills, setSkills] = useState<SelectOption[]>([
    { id: 'ts', item: 'TypeScript' },
    { id: 'rn', item: 'React Native' },
  ])
  const [channels, setChannels] = useState<SelectOption[]>([{ id: 'email', item: 'Email' }])
  const [tags, setTags] = useState<SelectOption[]>([])

  return (
    <ScrollView
      style={demoStyles.screen}
      contentContainerStyle={demoStyles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={demoStyles.hero}>
        <View style={demoStyles.badge}>
          <Text style={demoStyles.badgeText}>Host · ScrollView</Text>
        </View>
        <Text style={demoStyles.title}>ScrollView host</Text>
        <Text style={demoStyles.subtitle}>
          Classic form layout. Keep every SelectBox on virtualized=false so options are not a
          VirtualizedList nested inside this ScrollView (RN warning + scroll fights).
        </Text>
        <HostCallout
          title="Copy this pattern when"
          body="You want a simple form ScrollView and a modest number of fields. Prefer SectionList/FlatList for very long screens."
        />
      </View>

      <Text style={demoStyles.sectionHeader}>Single select</Text>

      <DemoCard
        eyebrow="Single select"
        title="Country of residence"
        description="Searchable dropdown for one value — common on profiles and checkout forms."
      >
        <SelectBox
          label="Country"
          inputPlaceholder="Search countries…"
          options={COUNTRIES}
          value={country}
          onChange={setCountry}
          virtualized={false}
          arrowIconColor={theme.accent}
          searchIconColor={theme.accent}
          selectedItemStyle={demoStyles.selectedText}
          optionsLabelStyle={demoStyles.optionText}
          containerStyle={demoStyles.fieldUnderline}
        />
        <SelectionSummary label="Selected" value={readLabel(country)} />
      </DemoCard>

      <DemoCard
        eyebrow="Single select · preselected"
        title="Preferred timezone"
        description="Controlled value with an initial selection (UTC)."
      >
        <SelectBox
          label="Timezone"
          inputPlaceholder="Find a timezone…"
          options={TIMEZONES}
          value={timezone}
          onChange={setTimezone}
          virtualized={false}
          arrowIconColor={theme.accent}
          searchIconColor={theme.accent}
          selectedItemStyle={demoStyles.selectedText}
          optionsLabelStyle={demoStyles.optionText}
          containerStyle={demoStyles.fieldUnderline}
        />
        <SelectionSummary label="Selected" value={readLabel(timezone)} />
      </DemoCard>

      <DemoCard
        eyebrow="Single select · no search"
        title="Department"
        description="Hide the filter when the list is short using hideInputFilter."
      >
        <SelectBox
          label="Department"
          inputPlaceholder="Choose department"
          options={DEPARTMENTS}
          value={department}
          onChange={setDepartment}
          hideInputFilter
          virtualized={false}
          arrowIconColor={theme.accent}
          selectedItemStyle={demoStyles.selectedText}
          optionsLabelStyle={demoStyles.optionText}
          containerStyle={demoStyles.fieldUnderline}
        />
        <SelectionSummary label="Selected" value={readLabel(department)} />
      </DemoCard>

      <Text style={demoStyles.sectionHeader}>Multi select</Text>

      <DemoCard
        eyebrow="Multi select · preselected chips"
        title="Skills"
        description="Toggle skills in the list or remove chips (toggle-by-id helper, no lodash)."
      >
        <SelectBox
          label="Skills"
          inputPlaceholder="Add skills…"
          options={SKILLS}
          selectedValues={skills}
          onMultiSelect={(opt) => setSkills((prev) => toggleById(prev, opt))}
          onTapClose={(opt) => setSkills((prev) => toggleById(prev, opt))}
          isMulti
          virtualized={false}
          arrowIconColor={theme.accent}
          searchIconColor={theme.accent}
          toggleIconColor={theme.accent}
          multiOptionContainerStyle={demoStyles.chip}
          multiOptionsLabelStyle={demoStyles.chipLabel}
          optionsLabelStyle={demoStyles.optionText}
          containerStyle={demoStyles.fieldUnderline}
        />
        <SelectionSummary label="Selected" value={skills.map((s) => s.item).join(', ')} />
      </DemoCard>

      <DemoCard
        eyebrow="Multi select"
        title="Notification channels"
        description="Short list with search still enabled."
      >
        <SelectBox
          label="Channels"
          inputPlaceholder="Select channels…"
          options={NOTIFICATION_CHANNELS}
          selectedValues={channels}
          onMultiSelect={(opt) => setChannels((prev) => toggleById(prev, opt))}
          onTapClose={(opt) => setChannels((prev) => toggleById(prev, opt))}
          isMulti
          virtualized={false}
          arrowIconColor={theme.accent}
          searchIconColor={theme.accent}
          toggleIconColor={theme.accent}
          multiOptionContainerStyle={demoStyles.chip}
          multiOptionsLabelStyle={demoStyles.chipLabel}
          optionsLabelStyle={demoStyles.optionText}
          containerStyle={demoStyles.fieldUnderline}
        />
        <SelectionSummary label="Selected" value={channels.map((c) => c.item).join(', ')} />
      </DemoCard>

      <DemoCard
        eyebrow="Multi select · ScrollView host"
        title="Project tags"
        description="virtualized={false} is required here — default FlatList options would nest under ScrollView."
      >
        <SelectBox
          label="Tags"
          inputPlaceholder="Search tags…"
          options={PROJECT_TAGS}
          selectedValues={tags}
          onMultiSelect={(opt) => setTags((prev) => toggleById(prev, opt))}
          onTapClose={(opt) => setTags((prev) => toggleById(prev, opt))}
          isMulti
          virtualized={false}
          arrowIconColor={theme.accent}
          searchIconColor={theme.accent}
          toggleIconColor={theme.accent}
          multiOptionContainerStyle={demoStyles.chip}
          multiOptionsLabelStyle={demoStyles.chipLabel}
          optionsLabelStyle={demoStyles.optionText}
          containerStyle={demoStyles.fieldUnderline}
        />
        <SelectionSummary label="Selected" value={tags.map((t) => t.item).join(', ')} />
      </DemoCard>

      <Text style={demoStyles.footer}>demos/ScrollViewHostDemo.tsx</Text>
    </ScrollView>
  )
}
