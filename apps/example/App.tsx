/**
 * Example entry: switch between host patterns and API demos.
 *
 * - demos/SectionListHostDemo.tsx — SectionList host
 * - demos/ScrollViewHostDemo.tsx  — ScrollView host
 * - demos/AdditionalApisDemo.tsx  — 2.0.2+ control APIs
 */
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import AdditionalApisDemo from './demos/AdditionalApisDemo'
import SectionListHostDemo from './demos/SectionListHostDemo'
import ScrollViewHostDemo from './demos/ScrollViewHostDemo'
import { theme } from './demos/shared/theme'

type DemoTab = 'sectionList' | 'scrollView' | 'apis'

export default function App() {
  const [tab, setTab] = useState<DemoTab>('sectionList')

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.chrome}>
        <Text style={styles.chromeTitle}>react-native-multi-selectbox</Text>
        <Text style={styles.chromeSubtitle}>Hosts and 2.0.2+ control APIs</Text>
        <View style={styles.tabs}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: tab === 'sectionList' }}
            onPress={() => setTab('sectionList')}
            style={[styles.tab, tab === 'sectionList' && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === 'sectionList' && styles.tabTextActive]}>
              SectionList
            </Text>
            <Text style={[styles.tabHint, tab === 'sectionList' && styles.tabHintActive]}>
              Long form host
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: tab === 'scrollView' }}
            onPress={() => setTab('scrollView')}
            style={[styles.tab, tab === 'scrollView' && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === 'scrollView' && styles.tabTextActive]}>
              ScrollView
            </Text>
            <Text style={[styles.tabHint, tab === 'scrollView' && styles.tabHintActive]}>
              Simple host
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: tab === 'apis' }}
            onPress={() => setTab('apis')}
            style={[styles.tab, tab === 'apis' && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === 'apis' && styles.tabTextActive]}>APIs</Text>
            <Text style={[styles.tabHint, tab === 'apis' && styles.tabHintActive]}>2.0.2+</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.body}>
        {tab === 'sectionList' ? (
          <SectionListHostDemo />
        ) : tab === 'scrollView' ? (
          <ScrollViewHostDemo />
        ) : (
          <AdditionalApisDemo />
        )}
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
    paddingHorizontal: 16,
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
    paddingHorizontal: 8,
    backgroundColor: theme.bg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.border,
  },
  tabActive: {
    backgroundColor: theme.accentSoft,
    borderColor: '#C7D2FE',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 2,
  },
  tabTextActive: {
    color: theme.accentText,
  },
  tabHint: {
    fontSize: 10,
    color: theme.muted,
  },
  tabHintActive: {
    color: theme.accentText,
  },
  body: {
    flex: 1,
  },
})
