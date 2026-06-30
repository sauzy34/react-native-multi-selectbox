/**
 * Example entry: switch between host patterns.
 *
 * - demos/SectionListHostDemo.tsx — SectionList (preferred for long screens)
 * - demos/ScrollViewHostDemo.tsx  — ScrollView (simple forms; library default virtualized)
 */
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import SectionListHostDemo from './demos/SectionListHostDemo'
import ScrollViewHostDemo from './demos/ScrollViewHostDemo'
import { theme } from './demos/shared/theme'

type HostDemo = 'sectionList' | 'scrollView'

export default function App() {
  const [host, setHost] = useState<HostDemo>('sectionList')

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.chrome}>
        <Text style={styles.chromeTitle}>react-native-multi-selectbox</Text>
        <Text style={styles.chromeSubtitle}>Pick a scrolling host pattern to explore</Text>
        <View style={styles.tabs}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: host === 'sectionList' }}
            onPress={() => setHost('sectionList')}
            style={[styles.tab, host === 'sectionList' && styles.tabActive]}
          >
            <Text style={[styles.tabText, host === 'sectionList' && styles.tabTextActive]}>
              SectionList
            </Text>
            <Text style={[styles.tabHint, host === 'sectionList' && styles.tabHintActive]}>
              Preferred long form
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: host === 'scrollView' }}
            onPress={() => setHost('scrollView')}
            style={[styles.tab, host === 'scrollView' && styles.tabActive]}
          >
            <Text style={[styles.tabText, host === 'scrollView' && styles.tabTextActive]}>
              ScrollView
            </Text>
            <Text style={[styles.tabHint, host === 'scrollView' && styles.tabHintActive]}>
              Simple forms
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.body}>
        {host === 'sectionList' ? <SectionListHostDemo /> : <ScrollViewHostDemo />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  chrome: {
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: theme.card,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.border,
  },
  chromeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.accentText,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  chromeSubtitle: {
    fontSize: 14,
    color: theme.muted,
    marginBottom: 12,
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: theme.bg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.border,
  },
  tabActive: {
    backgroundColor: theme.accentSoft,
    borderColor: '#C7D2FE',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 2,
  },
  tabTextActive: {
    color: theme.accentText,
  },
  tabHint: {
    fontSize: 11,
    color: theme.muted,
  },
  tabHintActive: {
    color: theme.accentText,
  },
  body: {
    flex: 1,
  },
})
