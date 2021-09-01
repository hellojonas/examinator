import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../routes/HomeStack';
import Carousel from 'react-native-snap-carousel';
import { scale, verticalScale } from 'react-native-size-matters';
import { Question } from './ExamSession/Question';
import { theme } from '../styles/theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'Exam'>;

export default function ExamSession({ route }: Props) {
  const exam = route.params.exam;

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.body}>
        <Carousel
          data={exam}
          renderItem={({ item, index }) => (
            <Question question={item} count={index} />
          )}
          sliderWidth={scale(350)}
          itemWidth={scale(300)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.light.primary,
  },
  body: {
    flex: 1,
    paddingTop: verticalScale(16),
  },
});
