import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import { theme } from '../styles/theme';

type callBack = () => any;
export interface IButton {
  handlePress: () => any;
  title: string;
  btnType?: 'primary' | 'secondary';
}

export default function Button({ title, handlePress, btnType }: IButton) {
  let btnStyles = {
    ...styles.button,
  };

  if (btnType === 'secondary') {
    btnStyles = { ...btnStyles, ...styles.secondary };
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={btnStyles}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    ...globalStyles.shadowElements,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.light.accent,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  secondary: {
    borderColor: theme.light.borderButtonSecondary,
    backgroundColor: theme.light.buttonSecondary,
    borderWidth: 1,
  },
  text: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: theme.light.buttonTextPrimary,
  },
});
