/**
 * Interactive examples for 2.0.2+ control APIs:
 * activeOptionsLabelStyle, maxSelected, optionIdKey/optionLabelKey, optionsAlign,
 * optionsMaxHeight, defaultOpen/onOpenChange, editable/hideDropdownIcon,
 * hideChipClose, renderMultiChipLeading.
 *
 * Host patterns: SectionListHostDemo.tsx / ScrollViewHostDemo.tsx
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

/** API-shaped rows using `name` instead of `item` (optionLabelKey demo). */
const CITIES = [
  { id: 'par', name: 'Paris' },
  { id: 'lyo', name: 'Lyon' },
  { id: 'mar', name: 'Marseille' },
  { id: 'tls', name: 'Toulouse' },
]

const PEOPLE: SelectOption[] = [
  { id: 'a', item: 'Alex' },
  { id: 'b', item: 'Blake' },
  { id: 'c', item: 'Casey' },
  { id: 'd', item: 'Drew' },
]

export default function AdditionalApisDemo() {
  const [skills, setSkills] = useState<SelectOption[]>([{ id: 'ts', item: 'TypeScript' }])
  const [tags, setTags] = useState<SelectOption[]>([])
  const [city, setCity] = useState<SelectOption | Record<string, never>>({})
  const [department, setDepartment] = useState<SelectOption | Record<string, never>>({})
  const [country, setCountry] = useState<SelectOption | Record<string, never>>({})
  const [timezone, setTimezone] = useState<SelectOption | Record<string, never>>({
    id: 'utc',
    item: 'UTC',
  })
  const [panelOpen, setPanelOpen] = useState(false)
  const [lockedCountry] = useState<SelectOption>({ id: 'us', item: 'United States' })
  const [channels, setChannels] = useState<SelectOption[]>([{ id: 'email', item: 'Email' }])
  const [assignees, setAssignees] = useState<SelectOption[]>([{ id: 'a', item: 'Alex' }])

  return (
    <ScrollView
      style={demoStyles.screen}
      contentContainerStyle={demoStyles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={demoStyles.hero}>
        <View style={demoStyles.badge}>
          <Text style={demoStyles.badgeText}>APIs · 2.0.2+</Text>
        </View>
        <Text style={demoStyles.title}>Additional controls</Text>
        <Text style={demoStyles.subtitle}>
          Live demos of each control added for open issues (active styles, max selection, key
          mapping, alignment, panel height, open state, editable / icons, chips).
        </Text>
        <HostCallout
          title="Where to look"
          body="Each card below names the prop(s) it exercises. Copy from here or from packages/multi-selectbox types."
        />
      </View>

      <Text style={demoStyles.sectionHeader}>activeOptionsLabelStyle</Text>
      <DemoCard
        eyebrow="Multi · selected row style"
        title="Highlight selected options"
        description="optionsLabelStyle for all rows; activeOptionsLabelStyle for selected ones in the open list."
      >
        <SelectBox
          label="Skills"
          inputPlaceholder="Add skills…"
          options={SKILLS}
          selectedValues={skills}
          onMultiSelect={(item) => setSkills((prev) => toggleById(prev, item))}
          onTapClose={(item) => setSkills((prev) => toggleById(prev, item))}
          isMulti
          optionsLabelStyle={{ color: theme.muted }}
          activeOptionsLabelStyle={{ color: theme.accent, fontWeight: '700' }}
          arrowIconColor={theme.accent}
          searchIconColor={theme.accent}
          toggleIconColor={theme.accent}
          multiOptionContainerStyle={demoStyles.chip}
          multiOptionsLabelStyle={demoStyles.chipLabel}
          containerStyle={demoStyles.fieldUnderline}
        />
        <SelectionSummary label="Selected" value={skills.map((s) => s.item).join(', ')} />
      </DemoCard>

      <Text style={demoStyles.sectionHeader}>maxSelected</Text>
      <DemoCard
        eyebrow="Multi · selection limit"
        title="Pick up to 3 tags"
        description="Further adds are ignored once maxSelected is reached; remove a chip to free a slot."
      >
        <SelectBox
          label="Tags"
          inputPlaceholder="Select tags…"
          options={PROJECT_TAGS}
          selectedValues={tags}
          maxSelected={3}
          onMultiSelect={(item) => setTags((prev) => toggleById(prev, item))}
          onTapClose={(item) => setTags((prev) => toggleById(prev, item))}
          isMulti
          arrowIconColor={theme.accent}
          searchIconColor={theme.accent}
          toggleIconColor={theme.accent}
          multiOptionContainerStyle={demoStyles.chip}
          multiOptionsLabelStyle={demoStyles.chipLabel}
          containerStyle={demoStyles.fieldUnderline}
        />
        <SelectionSummary
          label={`Selected (${tags.length}/3)`}
          value={tags.map((t) => t.item).join(', ')}
        />
      </DemoCard>

      <Text style={demoStyles.sectionHeader}>optionIdKey / optionLabelKey</Text>
      <DemoCard
        eyebrow="Custom option shape"
        title="Cities with name instead of item"
        description="API rows use { id, name }. optionLabelKey maps name → item; onChange still receives { id, item }."
      >
        <SelectBox
          label="City"
          inputPlaceholder="Search cities…"
          options={CITIES}
          optionIdKey="id"
          optionLabelKey="name"
          value={city}
          onChange={setCity}
          arrowIconColor={theme.accent}
          searchIconColor={theme.accent}
          selectedItemStyle={demoStyles.selectedText}
          optionsLabelStyle={demoStyles.optionText}
          containerStyle={demoStyles.fieldUnderline}
        />
        <SelectionSummary label="Selected (normalized)" value={readLabel(city)} />
      </DemoCard>

      <Text style={demoStyles.sectionHeader}>optionsAlign</Text>
      <DemoCard
        eyebrow="Option label alignment"
        title="Right-aligned options"
        description="optionsAlign: left | center | right (textAlign on option labels)."
      >
        <SelectBox
          label="Department"
          options={DEPARTMENTS}
          value={department}
          onChange={setDepartment}
          hideInputFilter
          optionsAlign="right"
          arrowIconColor={theme.accent}
          selectedItemStyle={demoStyles.selectedText}
          optionsLabelStyle={demoStyles.optionText}
          containerStyle={demoStyles.fieldUnderline}
        />
        <SelectionSummary label="Selected" value={readLabel(department)} />
      </DemoCard>

      <Text style={demoStyles.sectionHeader}>optionsMaxHeight</Text>
      <DemoCard
        eyebrow="Tall options panel"
        title="Panel max height 320"
        description="Overrides default maxHeight 180 on the options list container."
      >
        <SelectBox
          label="Country"
          inputPlaceholder="Search countries…"
          options={COUNTRIES}
          value={country}
          onChange={setCountry}
          optionsMaxHeight={320}
          arrowIconColor={theme.accent}
          searchIconColor={theme.accent}
          selectedItemStyle={demoStyles.selectedText}
          optionsLabelStyle={demoStyles.optionText}
          containerStyle={demoStyles.fieldUnderline}
        />
        <SelectionSummary label="Selected" value={readLabel(country)} />
      </DemoCard>

      <Text style={demoStyles.sectionHeader}>defaultOpen / onOpenChange</Text>
      <DemoCard
        eyebrow="Open state"
        title="Timezone with open callback"
        description="onOpenChange updates sibling UI. defaultOpen is only for first mount — this card starts closed so the callback is easy to see."
      >
        <SelectBox
          label="Timezone"
          inputPlaceholder="Find a timezone…"
          options={TIMEZONES}
          value={timezone}
          onChange={setTimezone}
          onOpenChange={setPanelOpen}
          arrowIconColor={theme.accent}
          searchIconColor={theme.accent}
          selectedItemStyle={demoStyles.selectedText}
          optionsLabelStyle={demoStyles.optionText}
          containerStyle={demoStyles.fieldUnderline}
        />
        <SelectionSummary label="Panel" value={panelOpen ? 'Open' : 'Closed'} />
        <SelectionSummary label="Selected" value={readLabel(timezone)} />
      </DemoCard>

      <DemoCard
        eyebrow="defaultOpen"
        title="Starts open"
        description="defaultOpen mounts with the options panel already expanded (countries)."
      >
        <SelectBox
          label="Country (default open)"
          options={COUNTRIES}
          value={country}
          onChange={setCountry}
          defaultOpen
          optionsMaxHeight={200}
          arrowIconColor={theme.accent}
          searchIconColor={theme.accent}
          selectedItemStyle={demoStyles.selectedText}
          optionsLabelStyle={demoStyles.optionText}
          containerStyle={demoStyles.fieldUnderline}
        />
      </DemoCard>

      <Text style={demoStyles.sectionHeader}>editable / hideDropdownIcon</Text>
      <DemoCard
        eyebrow="Read-only"
        title="Locked country"
        description="editable={false} blocks open/close; hideDropdownIcon removes the chevron press target."
      >
        <SelectBox
          label="Country (locked)"
          options={COUNTRIES}
          value={lockedCountry}
          onChange={() => {}}
          editable={false}
          hideDropdownIcon
          selectedItemStyle={demoStyles.selectedText}
          containerStyle={demoStyles.fieldUnderline}
        />
      </DemoCard>

      <DemoCard
        eyebrow="hideDropdownIcon"
        title="Interactive without chevron"
        description="Chevron hidden; open via the value text (single select)."
      >
        <SelectBox
          label="Country"
          options={COUNTRIES}
          value={country}
          onChange={setCountry}
          hideDropdownIcon
          arrowIconColor={theme.accent}
          searchIconColor={theme.accent}
          selectedItemStyle={demoStyles.selectedText}
          optionsLabelStyle={demoStyles.optionText}
          containerStyle={demoStyles.fieldUnderline}
        />
        <SelectionSummary label="Selected" value={readLabel(country)} />
      </DemoCard>

      <Text style={demoStyles.sectionHeader}>hideChipClose</Text>
      <DemoCard
        eyebrow="Multi chips"
        title="Chips without ×"
        description="hideChipClose — remove selections via the options list toggles instead."
      >
        <SelectBox
          label="Channels"
          inputPlaceholder="Select channels…"
          options={NOTIFICATION_CHANNELS}
          selectedValues={channels}
          onMultiSelect={(item) => setChannels((prev) => toggleById(prev, item))}
          onTapClose={(item) => setChannels((prev) => toggleById(prev, item))}
          isMulti
          hideChipClose
          arrowIconColor={theme.accent}
          searchIconColor={theme.accent}
          toggleIconColor={theme.accent}
          multiOptionContainerStyle={demoStyles.chip}
          multiOptionsLabelStyle={demoStyles.chipLabel}
          containerStyle={demoStyles.fieldUnderline}
        />
        <SelectionSummary label="Selected" value={channels.map((c) => c.item).join(', ')} />
      </DemoCard>

      <Text style={demoStyles.sectionHeader}>renderMultiChipLeading</Text>
      <DemoCard
        eyebrow="Avatar slot"
        title="Leading node on chips"
        description="renderMultiChipLeading receives the option; here we show a letter avatar."
      >
        <SelectBox
          label="Assignees"
          inputPlaceholder="Add people…"
          options={PEOPLE}
          selectedValues={assignees}
          onMultiSelect={(item) => setAssignees((prev) => toggleById(prev, item))}
          onTapClose={(item) => setAssignees((prev) => toggleById(prev, item))}
          isMulti
          renderMultiChipLeading={(option) => (
            <View
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: theme.accentSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: '700', color: theme.accentText }}>
                {option.item.slice(0, 1)}
              </Text>
            </View>
          )}
          arrowIconColor={theme.accent}
          searchIconColor={theme.accent}
          toggleIconColor={theme.accent}
          multiOptionContainerStyle={demoStyles.chip}
          multiOptionsLabelStyle={demoStyles.chipLabel}
          containerStyle={demoStyles.fieldUnderline}
        />
        <SelectionSummary label="Selected" value={assignees.map((a) => a.item).join(', ')} />
      </DemoCard>

      <Text style={demoStyles.footer}>demos/AdditionalApisDemo.tsx</Text>
    </ScrollView>
  )
}
