import React from 'react';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { globalStyles } from '../../styles/global';
import { theme } from '../../styles/theme';
import { IQuestion } from '../../types';
import Option, { OptionEmitter } from './Option';

interface IQuestionProps {
  question: IQuestion;
  count: number;
}

interface IQuestionHeaderProps {
  image: string;
  questionText: string;
  count: number;
}

interface IOptionListProps {
  answers: {
    id: number;
    value: string;
  }[];
  handlePress?: () => any;
}

export function QuestionHeader({
  image,
  questionText,
  count,
}: IQuestionHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: `http://10.0.2.2:1337${image}`,
            }}
            style={styles.image}
          />
        </View>
        <Text style={styles.count}>{count + 1} / 25</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.questionText}>{questionText}</Text>
      </View>
    </View>
  );
}

export function OptionList({ answers }: IOptionListProps) {
  const [active, setActive] = useState<number>();

  const _handlePress: OptionEmitter = option => {
    setActive(option.id);
  };

  const optionLIst = answers.map(ans => (
    <Option
      id={ans.id}
      key={ans.id}
      text={ans.value}
      active={ans.id == active}
      handlePress={_handlePress}
    />
  ));

  return <View style={styles.optionList}>{optionLIst}</View>;
}

export function Question({ question, count }: IQuestionProps) {
  return (
    <View style={styles.question}>
      <QuestionHeader
        count={count}
        image={question.image.url}
        questionText={question.value}
      />
      <OptionList answers={question.answers} />
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    // borderWidth: 2,
    // borderColor: 'red',
  },
  header: {
    marginBottom: verticalScale(32),
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  imageWrapper: {
    ...globalStyles.shadowElements,
    height: scale(60),
    width: scale(60),
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  count: {
    ...globalStyles.body2,
  },
  textWrapper: {
    ...globalStyles.shadowElements,
    padding: scale(10),
    minHeight: verticalScale(80),
    backgroundColor: theme.light.secondary,
    borderRadius: 6,
  },
  questionText: {
    ...globalStyles.body2,
    fontFamily: 'ws-bold',
  },
  optionList: {},
});
