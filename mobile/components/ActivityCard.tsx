import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Activity } from '../../client/src/types/activity';

type Props = {
  styles: any;
  theme: 'light' | 'dark';
  item: Activity;
  onPress: () => void;
};

export default function ActivityCard({ styles, theme, item, onPress }: Props) {
  const typeColor = styles.progressBarFill.backgroundColor;
  
  // Status dot colors matching web implementation
  const statusDot = item.status === 'Not Started' 
    ? theme === 'dark' ? 'hsl(0,0%,35%)' : 'hsl(0,0%,60%)'
    : item.status === 'In Progress' 
    ? theme === 'dark' ? 'hsl(0,0%,20%)' : 'hsl(217,91%,60%)'
    : theme === 'dark' ? 'hsl(0,0%,25%)' : 'hsl(142,76%,36%)';
    
  const dateDisplay = item.date || item.dueDate;
  const dateLabel = item.date ? 'Date' : (item.dueDate ? 'Due Date' : undefined);

  // Align action with web: status-based labels + variant
  const actionByStatus = item.status === 'Not Started'
    ? { label: 'Start Activity', variant: 'primary' as const }
    : item.status === 'In Progress'
    ? { label: 'Continue Learning', variant: 'primary' as const }
    : { label: 'Review & Reflect', variant: 'secondary' as const };

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ backgroundColor: typeColor, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 }}>
            <Text style={{ color: theme === 'dark' ? '#000' : '#fff', fontSize: 12, fontWeight: '600' }}>{item.type}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: statusDot }} />
            <Text style={[styles.muted, { fontSize: 12 }]}>{item.status}</Text>
          </View>
        </View>
      </View>
      <Text style={[styles.cardTitle, theme === 'light' && { color: '#000' }]}>{item.title}</Text>
      {item.description ? (
        <Text style={[styles.muted, { marginTop: 6 }]} numberOfLines={2}>
          {item.description}
        </Text>
      ) : null}
      <View style={{ height: 8 }} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 16, rowGap: 6 }}>
        {dateDisplay && (
          <Text style={styles.row}>
            <Text style={styles.label}>{dateLabel}: </Text>
            {dateDisplay}
          </Text>
        )}
        {item.duration && (
          <Text style={styles.row}>
            <Text style={styles.label}>Duration: </Text>
            {item.duration}
          </Text>
        )}
        {(item.program || item.week) && (
          <Text style={[styles.row, theme === 'light' && { color: '#000' }, { width: '100%' }]}>
            <Text style={styles.label}>Program: </Text>
            {item.program}{item.week ? ` • ${item.week}` : ''}
          </Text>
        )}
        {typeof item.progress === 'number' && (
          <View style={{ width: '100%', marginTop: 6 }}>
            <Text style={[styles.label, { marginBottom: 4 }]}>Progress</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${Math.max(0, Math.min(100, item.progress))}%` }]} />
            </View>
          </View>
        )}
      </View>
      <View style={{ height: 12 }} />
      <View style={{ height: 1, backgroundColor: styles.card.borderColor, marginVertical: 8 }} />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={actionByStatus.variant === 'primary' ? styles.primaryBtn : styles.secondaryBtn}>
          <Text style={actionByStatus.variant === 'primary' ? styles.primaryBtnText : styles.secondaryBtnText}>{actionByStatus.label}</Text>
        </View>
      </View>
    </Pressable>
  );
}


