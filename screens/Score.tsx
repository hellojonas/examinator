import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { HomeStackParamList } from '../routes/HomeStack';

type ScoreProps = NativeStackScreenProps<HomeStackParamList, 'Score'>;

export default function Score({ route }: ScoreProps) {
  const summary = route.params.summary;

  useEffect(() => {
    console.log(summary);
  }, []);

  return <View></View>;
}
