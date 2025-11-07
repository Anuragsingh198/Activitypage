import React, { useEffect, useMemo, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, useColorScheme } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getStyles } from '../theme'
import Filters from './Filters'
import ActivityCard from './ActivityCard'
import ActivityDetail from './ActivityDetail'
import { selectFilteredActivities, selectFilters, setActivities, setFilters, clearFilters, selectActivities } from '../../client/src/store/slices/activitiesSlice'
import { activities as dummy } from '../../client/src/data/dummyData'

export default function Home() {
  const dispatch = useDispatch()
  const filters = useSelector(selectFilters)
  const filtered = useSelector(selectFilteredActivities)
  const items = useSelector(selectActivities)
  const [selectedId, setSelectedId] = useState(null)
  const systemScheme = useColorScheme()
  const [theme, setTheme] = useState(systemScheme === 'dark' ? 'dark' : 'light')
  const styles = useMemo(() => getStyles(theme), [theme])

  useEffect(() => {
    dispatch(setActivities(dummy))
  }, [dispatch])

  const header = (
    <Filters
      styles={styles}
      filters={filters}
      onSearch={(t) => dispatch(setFilters({ search: t }))}
      onSetType={(t) => dispatch(setFilters({ type: t }))}
      onSetStatus={(s) => dispatch(setFilters({ status: s }))}
      onClear={() => dispatch(clearFilters())}
    />
  )

  if (selectedId != null) {
    const activity = items.find((a) => a.id === selectedId)
    if (!activity) {
      setSelectedId(null)
      return null
    }
    return (
      <SafeAreaView style={styles.container}>
        <ActivityDetail
          styles={styles}
          activity={activity}
          onBack={() => setSelectedId(null)}
          onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          themeLabel={theme === 'light' ? 'Dark' : 'Light'}
        />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ActivityCard styles={styles} theme={theme} item={item} onPress={() => setSelectedId(item.id)} />
        )}
        ListHeaderComponent={(
          <>
            <View style={styles.headerRow}>
              <Text style={styles.title}>Activity Hub</Text>
              <View style={styles.themeBtn}><Text onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')} style={styles.themeBtnText}>{theme === 'light' ? 'Dark' : 'Light'}</Text></View>
            </View>
            {header}
          </>
        )}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  )
}
