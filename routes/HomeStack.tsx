import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Rules from '../screens/Rules';
import { theme } from '../styles/theme';
import ExamSession from '../screens/ExamSession';
import { Exam } from '../types';

export type HomeStackParamList = {
  Home: undefined;
  Rules: undefined;
  Exam: { exam: Exam };
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
        component={ExamSession}
        options={{
          headerBackVisible: false,
          title: 'Exame',
          headerStyle: { backgroundColor: theme.light.tertiary },
        }}
      />
    </Stack.Navigator>
  );
}
