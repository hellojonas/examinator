import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Rules from '../screens/Rules';
import { theme } from '../styles/theme';
import Exam from '../screens/Exam';
import { IAnswer, IQuestion, Summary } from '../types';
import Score from '../screens/Score';

export type HomeStackParamList = {
  Home: undefined;
  Rules: undefined;
  Exam: { exam: IQuestion[] };
  Score: { summary: Summary };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: { backgroundColor: theme.light.tertiary },
          title: 'Início',
        }}
      />
      <Stack.Screen
        name="Rules"
        component={Rules}
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.light.tertiary },
        }}
      />
      <Stack.Screen
        name="Exam"
        component={Exam}
        options={{
          headerBackVisible: false,
          title: 'Exame',
          headerStyle: { backgroundColor: theme.light.tertiary },
        }}
      />
      <Stack.Screen
        name="Score"
        component={Score}
        options={{
          title: 'Exame',
          headerStyle: { backgroundColor: theme.light.tertiary },
        }}
      />
    </Stack.Navigator>
  );
}
