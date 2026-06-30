import type { ReactNode } from 'react'
import { Text, View } from 'react-native'
import { demoStyles } from './theme'

export function DemoCard({
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
    <View style={demoStyles.card}>
      <Text style={demoStyles.cardEyebrow}>{eyebrow}</Text>
      <Text style={demoStyles.cardTitle}>{title}</Text>
      <Text style={demoStyles.cardDescription}>{description}</Text>
      <View style={demoStyles.cardBody}>{children}</View>
    </View>
  )
}

export function SelectionSummary({ label, value }: { label: string; value: string }) {
  return (
    <View style={demoStyles.summary}>
      <Text style={demoStyles.summaryLabel}>{label}</Text>
      <Text style={demoStyles.summaryValue} numberOfLines={2}>
        {value || '—'}
      </Text>
    </View>
  )
}

export function HostCallout({ title, body }: { title: string; body: string }) {
  return (
    <View style={demoStyles.callout}>
      <Text style={demoStyles.calloutTitle}>{title}</Text>
      <Text style={demoStyles.calloutBody}>{body}</Text>
    </View>
  )
}
