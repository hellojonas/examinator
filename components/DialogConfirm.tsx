import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { globalStyles } from '../styles/global';
import { theme } from '../styles/theme';
import AppModal from './AppModal';
import ButtonModal from './ButtonModal';

const WINDOW_WIDTH = Dimensions.get('window').width;

export interface IDialogConfirm {
  title: string;
  visible?: boolean;
  handleConfirm?: () => void;
  handleCancel?: () => void;
}

export default function DialogConfirm({
  title,
  visible,
  handleCancel,
  handleConfirm,
}: IDialogConfirm) {
  return (
    <AppModal visible={visible} handleClose={handleCancel}>
      <View style={styles.modal}>
        <Text style={styles.modalText}>{title}</Text>
        <View style={styles.modalControls}>
          <ButtonModal
            color={theme.light.textBody}
            backgroundColor={'#00000000'}
            title="Cancelar"
            handlePress={handleCancel}
          />
          <ButtonModal
            color={theme.light.textBody}
            backgroundColor={theme.light.accent}
            title="Confirmar"
            handlePress={handleConfirm}
          />
        </View>
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: theme.light.secondary,
    minHeight: verticalScale(128),
    width: WINDOW_WIDTH - 64,
    borderRadius: 6,
    padding: scale(16),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalText: {
    ...globalStyles.body2,
    marginBottom: verticalScale(16),
  },
  modalControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
});
