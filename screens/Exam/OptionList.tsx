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
}

export function OptionList({ answers, handlePress }: IOptionListProps) {
  const [active, setActive] = useState<number>();

  const _handlePress: OptionEmitter = option => {
    setActive(option.id);
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
