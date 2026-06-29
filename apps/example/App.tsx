import { useState, type ReactNode } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import SelectBox, { type SelectOption } from 'react-native-multi-selectbox'

/** Meaningful demo catalogs (not sports clubs). */
const COUNTRIES: SelectOption[] = [
  { id: 'us', item: 'United States' },
  { id: 'ca', item: 'Canada' },
  { id: 'gb', item: 'United Kingdom' },
  { id: 'de', item: 'Germany' },
  { id: 'fr', item: 'France' },
  { id: 'in', item: 'India' },
  { id: 'jp', item: 'Japan' },
  { id: 'au', item: 'Australia' },
  { id: 'br', item: 'Brazil' },
  { id: 'sg', item: 'Singapore' },
]

const SKILLS: SelectOption[] = [
  { id: 'ts', item: 'TypeScript' },
  { id: 'rn', item: 'React Native' },
  { id: 'react', item: 'React' },
  { id: 'node', item: 'Node.js' },
  { id: 'graphql', item: 'GraphQL' },
  { id: 'sql', item: 'SQL' },
  { id: 'aws', item: 'AWS' },
  { id: 'docker', item: 'Docker' },
  { id: 'figma', item: 'Figma' },
  { id: 'a11y', item: 'Accessibility' },
]

const TIMEZONES: SelectOption[] = [
  { id: 'utc', item: 'UTC' },
  { id: 'pt', item: 'Pacific Time (PT)' },
  { id: 'mt', item: 'Mountain Time (MT)' },
  { id: 'ct', item: 'Central Time (CT)' },
  { id: 'et', item: 'Eastern Time (ET)' },
  { id: 'gmt', item: 'London (GMT/BST)' },
  { id: 'ist', item: 'India Standard Time (IST)' },
  { id: 'jst', item: 'Japan Standard Time (JST)' },
  { id: 'aest', item: 'Sydney (AEST)' },
]

const DEPARTMENTS: SelectOption[] = [
  { id: 'eng', item: 'Engineering' },
  { id: 'design', item: 'Design' },
  { id: 'product', item: 'Product' },
  { id: 'marketing', item: 'Marketing' },
  { id: 'sales', item: 'Sales' },
  { id: 'support', item: 'Customer Support' },
  { id: 'hr', item: 'People / HR' },
  { id: 'finance', item: 'Finance' },
]

const NOTIFICATION_CHANNELS: SelectOption[] = [
  { id: 'email', item: 'Email' },
  { id: 'push', item: 'Push notifications' },
  { id: 'sms', item: 'SMS' },
  { id: 'slack', item: 'Slack' },
  { id: 'inapp', item: 'In-app only' },
]

const PROJECT_TAGS: SelectOption[] = [
  { id: 'mobile', item: 'Mobile' },
  { id: 'web', item: 'Web' },
  { id: 'api', item: 'API' },
  { id: 'infra', item: 'Infrastructure' },
  { id: 'ml', item: 'Machine learning' },
  { id: 'security', item: 'Security' },
  { id: 'docs', item: 'Documentation' },
  { id: 'qa', item: 'QA / Testing' },
]

const theme = {
  bg: '#F4F5F7',
  card: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
  accent: '#4F46E5',
  accentSoft: '#EEF2FF',
  accentText: '#3730A3',
}

function toggleById(list: SelectOption[], item: SelectOption): SelectOption[] {
  return list.some((x) => x.id === item.id) ? list.filter((x) => x.id !== item.id) : [...list, item]
}

function DemoCard({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardEyebrow}>{eyebrow}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      <View style={styles.cardBody}>{children}</View>
    </View>
  )
}

function SelectionSummary({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summary}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue} numberOfLines={2}>
        {value || '—'}
      </Text>
    </View>
  )
}

export default function App() {
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

  const countryLabel = 'item' in country && country.item ? country.item : ''
  const timezoneLabel = 'item' in timezone && timezone.item ? timezone.item : ''
  const departmentLabel = 'item' in department && department.item ? department.item : ''
  const skillsLabel = skills.map((s) => s.item).join(', ')
  const channelsLabel = channels.map((c) => c.item).join(', ')
  const tagsLabel = tags.map((t) => t.item).join(', ')

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>react-native-multi-selectbox</Text>
          </View>
          <Text style={styles.title}>Component demos</Text>
          <Text style={styles.subtitle}>
            Practical single- and multi-select patterns with sample product data. Built with Expo
            SDK 56 and the workspace package.
          </Text>
        </View>

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
            selectedItemStyle={styles.selectedText}
            optionsLabelStyle={styles.optionText}
            containerStyle={styles.fieldUnderline}
          />
          <SelectionSummary label="Selected" value={countryLabel} />
        </DemoCard>

        <DemoCard
          eyebrow="Single select · preselected"
          title="Preferred timezone"
          description="Controlled value with an initial selection (UTC). Change it to see updates below."
        >
          <SelectBox
            label="Timezone"
            inputPlaceholder="Find a timezone…"
            options={TIMEZONES}
            value={timezone}
            onChange={setTimezone}
            arrowIconColor={theme.accent}
            searchIconColor={theme.accent}
            selectedItemStyle={styles.selectedText}
            optionsLabelStyle={styles.optionText}
            containerStyle={styles.fieldUnderline}
          />
          <SelectionSummary label="Selected" value={timezoneLabel} />
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
            arrowIconColor={theme.accent}
            selectedItemStyle={styles.selectedText}
            optionsLabelStyle={styles.optionText}
            containerStyle={styles.fieldUnderline}
          />
          <SelectionSummary label="Selected" value={departmentLabel} />
        </DemoCard>

        <DemoCard
          eyebrow="Multi select · preselected chips"
          title="Skills"
          description="Toggle skills in the list or remove chips. Parent state uses a small toggle-by-id helper (no lodash)."
        >
          <SelectBox
            label="Skills"
            inputPlaceholder="Add skills…"
            options={SKILLS}
            selectedValues={skills}
            onMultiSelect={(item) => setSkills((prev) => toggleById(prev, item))}
            onTapClose={(item) => setSkills((prev) => toggleById(prev, item))}
            isMulti
            arrowIconColor={theme.accent}
            searchIconColor={theme.accent}
            toggleIconColor={theme.accent}
            multiOptionContainerStyle={styles.chip}
            multiOptionsLabelStyle={styles.chipLabel}
            optionsLabelStyle={styles.optionText}
            containerStyle={styles.fieldUnderline}
          />
          <SelectionSummary label="Selected" value={skillsLabel} />
        </DemoCard>

        <DemoCard
          eyebrow="Multi select"
          title="Notification channels"
          description="Choose how the product may reach the user. Short list with search still enabled."
        >
          <SelectBox
            label="Channels"
            inputPlaceholder="Select channels…"
            options={NOTIFICATION_CHANNELS}
            selectedValues={channels}
            onMultiSelect={(item) => setChannels((prev) => toggleById(prev, item))}
            onTapClose={(item) => setChannels((prev) => toggleById(prev, item))}
            isMulti
            arrowIconColor={theme.accent}
            searchIconColor={theme.accent}
            toggleIconColor={theme.accent}
            multiOptionContainerStyle={styles.chip}
            multiOptionsLabelStyle={styles.chipLabel}
            optionsLabelStyle={styles.optionText}
            containerStyle={styles.fieldUnderline}
          />
          <SelectionSummary label="Selected" value={channelsLabel} />
        </DemoCard>

        <DemoCard
          eyebrow="Multi select · in a scrolling form"
          title="Project tags"
          description="Nested in this page ScrollView. Options open in an anchored overlay (not inside the ScrollView), so FlatList is safe."
        >
          <SelectBox
            label="Tags"
            inputPlaceholder="Search tags…"
            options={PROJECT_TAGS}
            selectedValues={tags}
            onMultiSelect={(item) => setTags((prev) => toggleById(prev, item))}
            onTapClose={(item) => setTags((prev) => toggleById(prev, item))}
            isMulti
            arrowIconColor={theme.accent}
            searchIconColor={theme.accent}
            toggleIconColor={theme.accent}
            multiOptionContainerStyle={styles.chip}
            multiOptionsLabelStyle={styles.chipLabel}
            optionsLabelStyle={styles.optionText}
            containerStyle={styles.fieldUnderline}
          />
          <SelectionSummary label="Selected" value={tagsLabel} />
        </DemoCard>

        <Text style={styles.footer}>Workspace package · pnpm example / example:web</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 48,
    flexGrow: 1,
  },
  hero: {
    marginBottom: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 12,
  },
  badgeText: {
    color: theme.accentText,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.text,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: theme.muted,
    maxWidth: 520,
  },
  card: {
    backgroundColor: theme.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.border,
    // subtle elevation on native
    shadowColor: '#111827',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: theme.muted,
    marginBottom: 14,
  },
  cardBody: {
    gap: 12,
  },
  fieldUnderline: {
    borderBottomColor: theme.border,
    paddingTop: 4,
  },
  selectedText: {
    fontSize: 16,
    color: theme.text,
    fontWeight: '500',
  },
  optionText: {
    fontSize: 15,
    color: theme.text,
  },
  chip: {
    backgroundColor: theme.accent,
    borderRadius: 999,
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 6,
    marginRight: 6,
  },
  chipLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  summary: {
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.border,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 14,
    color: theme.text,
    lineHeight: 20,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: theme.muted,
    marginTop: 8,
  },
})
