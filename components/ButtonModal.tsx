import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { globalStyles } from '../styles/global';
import { theme } from '../styles/theme';

export interface IButtonModal {
  handlePress?: () => void;
  title: string;
  color?: string;
  backgroundColor?: string;
}

export default function ButtonModal({
  title,
  handlePress,
  color,
  backgroundColor,
}: IButtonModal) {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ ...styles.button, backgroundColor }}>
        <Text style={{ ...styles.text, color }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(4),
    paddingHorizontal: scale(8),
    backgroundColor: theme.light.accent,
    borderRadius: 8,
  },
  text: {
    fontFamily: 'ws-bold',
    fontSize: scale(12),
    marginLeft: scale(4),
    color: '#333',
  },
});
