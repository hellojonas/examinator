import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View, Modal } from 'react-native';

export interface IAppModalProps {
  children?: React.ReactNode;
  visible?: boolean;
  handleClose?: () => void;
}

const WIDTH = Dimensions.get('window').width;

export default function AppModal({
  visible,
  children,
  handleClose,
}: IAppModalProps) {
  return (
    <Modal
      visible={visible}
      onRequestClose={handleClose}
      transparent
      animationType="slide"
    >
      <View style={styles.constainer}>{children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  constainer: {
    width: WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: '#00000055',
  },
});
