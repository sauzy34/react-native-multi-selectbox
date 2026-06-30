/**
 * RN-preferred host for long scrolling screens: SectionList (or FlatList).
 *
 * The list owns page scrolling. Library default virtualized={false} keeps options off
 * a second vertical VirtualizedList inside section rows.
 *
 * See also: ScrollViewHostDemo.tsx
 */
import { useCallback, useMemo, useState } from 'react'
import {
  SectionList,
  Text,
  View,
  type SectionListData,
  type SectionListRenderItem,
} from 'react-native'
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

type DemoId = 'country' | 'timezone' | 'department' | 'skills' | 'channels' | 'tags'
type DemoItem = { id: DemoId }
type DemoSection = { title: string; data: DemoItem[] }

export default function SectionListHostDemo() {
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

  const sections = useMemo<DemoSection[]>(
    () => [
      {
        title: 'Single select',
        data: [{ id: 'country' }, { id: 'timezone' }, { id: 'department' }],
      },
      {
        title: 'Multi select',
        data: [{ id: 'skills' }, { id: 'channels' }, { id: 'tags' }],
      },
    ],
    [],
  )

  const renderItem = useCallback<SectionListRenderItem<DemoItem, DemoSection>>(
    ({ item }) => {
      switch (item.id) {
        case 'country':
          return (
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
                arrowIconColor={theme.accent}
                searchIconColor={theme.accent}
                selectedItemStyle={demoStyles.selectedText}
                optionsLabelStyle={demoStyles.optionText}
                containerStyle={demoStyles.fieldUnderline}
              />
              <SelectionSummary label="Selected" value={readLabel(country)} />
            </DemoCard>
          )
        case 'timezone':
          return (
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
                arrowIconColor={theme.accent}
                searchIconColor={theme.accent}
                selectedItemStyle={demoStyles.selectedText}
                optionsLabelStyle={demoStyles.optionText}
                containerStyle={demoStyles.fieldUnderline}
              />
              <SelectionSummary label="Selected" value={readLabel(timezone)} />
            </DemoCard>
          )
        case 'department':
          return (
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
                arrowIconColor={theme.accent}
                selectedItemStyle={demoStyles.selectedText}
                optionsLabelStyle={demoStyles.optionText}
                containerStyle={demoStyles.fieldUnderline}
              />
              <SelectionSummary label="Selected" value={readLabel(department)} />
            </DemoCard>
          )
        case 'skills':
          return (
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
          )
        case 'channels':
          return (
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
          )
        case 'tags':
          return (
            <DemoCard
              eyebrow="Multi select · list row"
              title="Project tags"
              description="Same pattern as other rows: SectionList host + default virtualized."
            >
              <SelectBox
                label="Tags"
                inputPlaceholder="Search tags…"
                options={PROJECT_TAGS}
                selectedValues={tags}
                onMultiSelect={(opt) => setTags((prev) => toggleById(prev, opt))}
                onTapClose={(opt) => setTags((prev) => toggleById(prev, opt))}
                isMulti
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
          )
        default:
          return null
      }
    },
    [country, timezone, department, skills, channels, tags],
  )

  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionListData<DemoItem, DemoSection> }) => (
      <Text style={demoStyles.sectionHeader}>{section.title}</Text>
    ),
    [],
  )

  const listHeader = useMemo(
    () => (
      <View style={demoStyles.hero}>
        <View style={demoStyles.badge}>
          <Text style={demoStyles.badgeText}>Host · SectionList</Text>
        </View>
        <Text style={demoStyles.title}>SectionList host</Text>
        <Text style={demoStyles.subtitle}>
          Preferred for long screens: the list owns scrolling. Each SelectBox is a row with default
          virtualized=false so options are not a nested VirtualizedList.
        </Text>
        <HostCallout
          title="Copy this pattern when"
          body="You have many fields / cards and want RN-correct virtualization for the page. Same idea works with FlatList (one section of rows)."
        />
      </View>
    ),
    [],
  )

  return (
    <SectionList
      style={demoStyles.screen}
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ListHeaderComponent={listHeader}
      ListFooterComponent={<Text style={demoStyles.footer}>demos/SectionListHostDemo.tsx</Text>}
      contentContainerStyle={demoStyles.content}
      stickySectionHeadersEnabled={false}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    />
  )
}
