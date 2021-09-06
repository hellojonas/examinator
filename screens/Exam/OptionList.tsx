import React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import OptionItem, { OptionEmitter } from './OptionItem';

interface IOptionListProps {
  answers: {
    id: number;
    value: string;
  }[];
  handlePress?: OptionEmitter;
  permActiveId?: number;
}

export function OptionList({
  answers,
  handlePress,
  permActiveId,
}: IOptionListProps) {
  const [active, setActive] = useState(permActiveId);

  const _handlePress: OptionEmitter = option => {
    if (permActiveId) {
      return;
    }

    setActive(option.id == active ? -1 : option.id);
    handlePress && handlePress(option);
  };

  const optionLIst = answers.map(ans => (
    <OptionItem
      id={ans.id}
      key={ans.id}
      text={ans.value}
      active={ans.id == active}
      handlePress={_handlePress}
    />
  ));

  return <View style={styles.optionList}>{optionLIst}</View>;
}

const styles = StyleSheet.create({
  optionList: {},
});
