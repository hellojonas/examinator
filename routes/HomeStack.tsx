import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Rules from '../screens/Rules';
import { theme } from '../styles/theme';
import ExamSession from '../screens/ExamSession';

export type HomeStackParamList = {
  Home: undefined;
  Rules: undefined;
  Exam: undefined;
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
          headerShown: false,
          title: 'Exame',
        }}
      />
    </Stack.Navigator>
  );
}
