import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStyles, ThemeMode } from '../theme';
import Filters from './Filters';
import ActivityCard from './ActivityCard';
import ActivityDetail from './ActivityDetail';
import { selectFilteredActivities, selectFilters, setActivities, setFilters, clearFilters, selectActivities } from '../../client/src/store/slices/activitiesSlice';
import { activities as dummy } from '../../client/src/data/dummyData';
import { Activity } from '../../client/src/types/activity';

export default function Home() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const filtered = useSelector(selectFilteredActivities) as Activity[];
  const items = useSelector(selectActivities) as Activity[];
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>(systemScheme === 'dark' ? 'dark' : 'light');
  const styles = useMemo(() => getStyles(theme), [theme]);

  useEffect(() => {
    dispatch(setActivities(dummy as Activity[]));
  }, [dispatch]);

  const header = (
    <Filters
      styles={styles}
      filters={filters}
      onSearch={(t) => dispatch(setFilters({ search: t }))}
      onSetType={(t) => dispatch(setFilters({ type: t }))}
      onSetStatus={(s) => dispatch(setFilters({ status: s }))}
      onClear={() => dispatch(clearFilters())}
    />
  );

  if (selectedId != null) {
    const activity = items.find((a: Activity) => a.id === selectedId);
    if (!activity) {
      setSelectedId(null);
      return null;
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
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }: { item: Activity }) => (
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
  );
}


