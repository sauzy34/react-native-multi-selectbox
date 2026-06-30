import type { SelectOption } from 'react-native-multi-selectbox'

/** Meaningful demo catalogs (not sports clubs). */
export const COUNTRIES: SelectOption[] = [
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

export const SKILLS: SelectOption[] = [
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

export const TIMEZONES: SelectOption[] = [
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

export const DEPARTMENTS: SelectOption[] = [
  { id: 'eng', item: 'Engineering' },
  { id: 'design', item: 'Design' },
  { id: 'product', item: 'Product' },
  { id: 'marketing', item: 'Marketing' },
  { id: 'sales', item: 'Sales' },
  { id: 'support', item: 'Customer Support' },
  { id: 'hr', item: 'People / HR' },
  { id: 'finance', item: 'Finance' },
]

export const NOTIFICATION_CHANNELS: SelectOption[] = [
  { id: 'email', item: 'Email' },
  { id: 'push', item: 'Push notifications' },
  { id: 'sms', item: 'SMS' },
  { id: 'slack', item: 'Slack' },
  { id: 'inapp', item: 'In-app only' },
]

export const PROJECT_TAGS: SelectOption[] = [
  { id: 'mobile', item: 'Mobile' },
  { id: 'web', item: 'Web' },
  { id: 'api', item: 'API' },
  { id: 'infra', item: 'Infrastructure' },
  { id: 'ml', item: 'Machine learning' },
  { id: 'security', item: 'Security' },
  { id: 'docs', item: 'Documentation' },
  { id: 'qa', item: 'QA / Testing' },
]

export function toggleById(list: SelectOption[], item: SelectOption): SelectOption[] {
  return list.some((x) => x.id === item.id) ? list.filter((x) => x.id !== item.id) : [...list, item]
}

export function readLabel(value: SelectOption | Record<string, never>): string {
  return 'item' in value && value.item ? value.item : ''
}
