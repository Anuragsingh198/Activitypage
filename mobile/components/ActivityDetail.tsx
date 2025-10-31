import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Activity } from '../../client/src/types/activity';

type Props = {
  styles: any;
  activity: Activity;
  onBack: () => void;
  onToggleTheme: () => void;
  themeLabel: string;
};

export default function ActivityDetail({ styles, activity, onBack, onToggleTheme, themeLabel }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Activity Details</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Pressable onPress={onToggleTheme} style={styles.themeBtn}>
            <Text style={styles.themeBtnText}>{themeLabel}</Text>
          </Pressable>
          <Pressable onPress={onBack}><Text style={[styles.link, { fontWeight: '600' }]}>Back</Text></Pressable>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={[styles.card, { padding: 16 }]}> 
          <Text style={styles.cardTitle}>{activity.title}</Text>
          <Text style={styles.muted}>{activity.type} • {activity.status}</Text>
          <View style={{ height: 12 }} />
          {activity.date && <Text style={styles.row}><Text style={styles.label}>Date: </Text>{activity.date}</Text>}
          {activity.dueDate && <Text style={styles.row}><Text style={styles.label}>Due Date: </Text>{activity.dueDate}</Text>}
          {activity.duration && <Text style={styles.row}><Text style={styles.label}>Duration: </Text>{activity.duration}</Text>}
          {activity.instructorName && <Text style={styles.row}><Text style={styles.label}>Instructor: </Text>{activity.instructorName}</Text>}
          {activity.difficulty && <Text style={styles.row}><Text style={styles.label}>Difficulty: </Text>{activity.difficulty}</Text>}
          {typeof activity.points === 'number' && <Text style={styles.row}><Text style={styles.label}>Points: </Text>{activity.points}</Text>}
          {(activity.program || activity.week) && (
            <Text style={styles.row}>
              <Text style={styles.label}>Program: </Text>
              {activity.program}{activity.week ? ` • ${activity.week}` : ''}
            </Text>
          )}
          {typeof activity.progress === 'number' && (
            <View style={{ marginTop: 12 }}>
              <Text style={styles.label}>Progress</Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${Math.max(0, Math.min(100, activity.progress))}%` }]} />
              </View>
              <Text style={[styles.muted, { marginTop: 4 }]}>{activity.progress}%</Text>
            </View>
          )}
          {activity.description && (
            <View style={{ marginTop: 12 }}>
              <Text style={[styles.label, { marginBottom: 6 }]}>Description</Text>
              <Text style={{ color: styles.row.color, lineHeight: 20 }}>{activity.description}</Text>
            </View>
          )}
          {activity.resources && activity.resources.length > 0 && (
            <View style={{ marginTop: 16 }}>
              <Text style={[styles.label, { marginBottom: 8 }]}>Resources</Text>
              {activity.resources.map((r, idx: number) => (
                <View key={idx} style={{ marginBottom: 8 }}>
                  <Text style={styles.row}>
                    <Text style={styles.label}>{r.type}: </Text>
                    {r.title}
                  </Text>
                </View>
              ))}
            </View>
          )}
          {activity.lastAccessed && (
            <View style={{ marginTop: 12 }}>
              <Text style={styles.row}>
                <Text style={styles.label}>Last Accessed: </Text>
                {activity.lastAccessed}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}


