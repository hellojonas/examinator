import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { globalStyles } from '../styles/global';

export interface IStatsCardProps {
  items: { key: string; value: string }[];
  icon: 'emoji-events' | 'school';
}

export default function StatsCard({ items, icon }: IStatsCardProps) {
  const itemList = items.map((item, idx) => {
    const last = idx === items.length - 1;

    return (
      <Text
        key={item.key}
        style={
          !last ? { ...globalStyles.body2, ...styles.item } : globalStyles.body2
        }
      >
        {item.key}: {item.value}
      </Text>
    );
  });
  return (
    <View style={styles.card}>
      <View style={styles.icon}>
        <MaterialIcons name={icon} color={theme.light.icons} size={32} />
      </View>

      <View style={styles.items}>{itemList}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: theme.light.secondary,
    padding: 10,
    height: 120,
    ...globalStyles.shadowElements,
  },
  icon: {
    marginRight: 24,
    backgroundColor: theme.light.tertiary,
    padding: 20,
    borderRadius: 50,
  },
  items: {
    justifyContent: 'space-around',
  },
  item: {
    marginBottom: 10,
  },
});
