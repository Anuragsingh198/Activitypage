import { StyleSheet } from 'react-native'

export function getStyles(theme) {
  const hsl = (v) => `hsl(${v})`
  const palette = theme === 'dark'
    ? {
        background: hsl('0,0%,7%'),
        foreground: hsl('0,0%,95%'),
        border: hsl('220,13%,18%'),
        card: hsl('220,13%,12%'),
        cardForeground: hsl('0,0%,95%'),
        input: hsl('220,13%,32%'),
        primary: hsl('0,0%,96%'),
        primaryForeground: hsl('0,0%,0%'),
        secondary: hsl('220,13%,20%'),
        secondaryForeground: hsl('0,0%,95%'),
        muted: hsl('220,13%,18%'),
        mutedForeground: hsl('0,0%,65%'),
      }
    : {
        background: hsl('218,28%,97%'),
        foreground: hsl('208,41%,15%'),
        border: hsl('0,0%,88%'),
        card: hsl('0,0%,100%'),
        cardForeground: hsl('208,41%,15%'),
        input: hsl('0,0%,88%'),
        primary: hsl('193,98%,45%'),
        primaryForeground: hsl('0,0%,100%'),
        secondary: hsl('220,14%,95%'),
        secondaryForeground: hsl('208,41%,15%'),
        muted: hsl('220,12%,94%'),
        mutedForeground: hsl('205,12%,60%'),
      }

  return StyleSheet.create({
    container: { flex: 1, backgroundColor: palette.background },
    headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
    title: { fontSize: 22, fontWeight: '600', color: palette.foreground },
    filters: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, marginTop: 12 },
    search: { flex: 1, borderWidth: 1, borderColor: palette.input, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, color: palette.foreground },
    link: { color: palette.mutedForeground },
    card: { borderWidth: 1, borderColor: palette.border, borderRadius: 12, padding: 12, marginBottom: 12, backgroundColor: palette.card },
    cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4, color: palette.cardForeground },
    muted: { color: palette.mutedForeground },
    row: { color: palette.foreground, marginTop: 4 },
    label: { color: palette.mutedForeground, fontWeight: '600' },
    progressBarBg: { height: 8, backgroundColor: palette.border, borderRadius: 6, overflow: 'hidden' },
    progressBarFill: { height: 8, backgroundColor: palette.primary },
    primaryBtn: { backgroundColor: palette.primary, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
    primaryBtnText: { color: palette.primaryForeground, fontWeight: '600' },
    secondaryBtn: { backgroundColor: palette.secondary, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
    secondaryBtnText: { color: palette.secondaryForeground, fontWeight: '600' },
    themeBtn: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1, borderColor: palette.border },
    themeBtnText: { color: palette.foreground, fontWeight: '600' },
    chip: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, borderWidth: 1, borderColor: palette.border },
    chipActive: { backgroundColor: palette.primary, borderColor: palette.primary },
    chipText: { color: palette.mutedForeground, fontSize: 12, fontWeight: '600' },
    chipTextActive: { color: palette.primaryForeground },
  })
}
