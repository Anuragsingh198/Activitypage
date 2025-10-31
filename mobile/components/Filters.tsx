import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, Modal } from 'react-native';
import { ActivityType, ActivityStatus } from '../../client/src/types/activity';

type Props = {
  styles: any;
  filters: { search: string; type: ActivityType | 'All'; status: ActivityStatus | 'All' };
  onSearch: (v: string) => void;
  onSetType: (v: ActivityType | 'All') => void;
  onSetStatus: (v: ActivityStatus | 'All') => void;
  onClear: () => void;
};

export default function Filters({ styles, filters, onSearch, onSetType, onSetStatus, onClear }: Props) {
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <View style={{ backgroundColor: styles.container.backgroundColor, borderBottomWidth: 1, borderBottomColor: styles.card.borderColor }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={[styles.title, { fontSize: 16 }]}>Filters</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable onPress={() => setShowSearch(true)} style={styles.themeBtn}>
            <Text style={styles.themeBtnText}>Search</Text>
          </Pressable>
          <Pressable onPress={() => setShowFilters(true)} style={styles.themeBtn}>
            <Text style={styles.themeBtnText}>Filters</Text>
          </Pressable>
        </View>
      </View>

      <Modal visible={showSearch} transparent animationType="slide" onRequestClose={() => setShowSearch(false)}>
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ padding: 16, backgroundColor: styles.card.backgroundColor, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderTopWidth: 1, borderColor: styles.card.borderColor }}>
            <Text style={[styles.title, { fontSize: 16, marginBottom: 8 }]}>Search</Text>
            <TextInput
              placeholder="Search activities..."
              placeholderTextColor={styles.muted.color as string}
              value={filters.search}
              onChangeText={onSearch}
              style={[styles.search, { borderRadius: 10 }]}
              autoFocus
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12, gap: 8 }}>
              <Pressable onPress={() => { onClear(); setShowSearch(false); }} style={styles.themeBtn}><Text style={styles.themeBtnText}>Clear</Text></Pressable>
              <Pressable onPress={() => setShowSearch(false)} style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Done</Text></Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showFilters} transparent animationType="slide" onRequestClose={() => setShowFilters(false)}>
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ padding: 16, backgroundColor: styles.card.backgroundColor, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderTopWidth: 1, borderColor: styles.card.borderColor }}>
            <Text style={[styles.title, { fontSize: 16, marginBottom: 10 }]}>Filters</Text>
            <View style={{ marginBottom: 10 }}>
              <Text style={[styles.label, { marginBottom: 6 }]}>Type</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {(['All','Online Class','Quiz','Assignment','Discussion'] as const).map((t) => (
                  <Pressable key={t} onPress={() => onSetType(t as ActivityType | 'All')} style={[styles.chip, filters.type === t && styles.chipActive]}>
                    <Text style={[styles.chipText, filters.type === t && styles.chipTextActive]}>{t}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View>
              <Text style={[styles.label, { marginBottom: 6 }]}>Status</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {(['All','Not Started','In Progress','Completed'] as const).map((s) => (
                  <Pressable key={s} onPress={() => onSetStatus(s as ActivityStatus | 'All')} style={[styles.chip, filters.status === s && styles.chipActive]}>
                    <Text style={[styles.chipText, filters.status === s && styles.chipTextActive]}>{s}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
              {(filters.type !== 'All' || filters.status !== 'All' || filters.search !== '') ? (
                <Pressable onPress={onClear}><Text style={styles.link}>Clear Filters</Text></Pressable>
              ) : <View />}
              <Pressable onPress={() => setShowFilters(false)} style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Apply</Text></Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


