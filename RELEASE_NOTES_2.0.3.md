# react-native-multi-selectbox 2.0.3

Patch release: chip layout fix when close controls are hidden, plus interactive Expo demos for all 2.0.2 control APIs.

## Fixed

- **`hideChipClose` chips** — labels use balanced horizontal padding so text looks centered in the pill (demo + library).

## Examples

Expo example app (**APIs** tab) — [`AdditionalApisDemo.tsx`](https://github.com/sauzy34/react-native-multi-selectbox/blob/master/apps/example/demos/AdditionalApisDemo.tsx):

| Prop | Demo |
| --- | --- |
| `activeOptionsLabelStyle` | Highlight selected option labels |
| `maxSelected` | Limit multi selection (e.g. 3 tags) |
| `optionIdKey` / `optionLabelKey` | Options shaped as `{ id, name }` |
| `optionsAlign` | Right-aligned option list |
| `optionsMaxHeight` | Taller options panel |
| `defaultOpen` / `onOpenChange` | Initial open + open-state callback |
| `editable` / `hideDropdownIcon` | Read-only field / no chevron |
| `hideChipClose` | Chips without × |
| `renderMultiChipLeading` | Avatar / leading node on chips |

Also: SectionList and ScrollView host demos unchanged.

## Install

```bash
npm install react-native-multi-selectbox@2.0.3
```

## Links

- [CHANGELOG](https://github.com/sauzy34/react-native-multi-selectbox/blob/master/CHANGELOG.md)
- [Package README](https://github.com/sauzy34/react-native-multi-selectbox/blob/master/packages/multi-selectbox/README.md)
- Live demo: https://sauzy34.github.io/react-native-multi-selectbox/
- Full 2.0.0 notes (breaking peers, TS monorepo): see CHANGELOG **2.0.0**

## Publish

```bash
cd packages/multi-selectbox
npm publish --access public --otp=YOUR_CODE
```
