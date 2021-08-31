import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Rules from '../screens/Rules';
import { theme } from '../styles/theme';

export type HomeStackParamList = {
  Home: undefined;
  Rules: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
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
    </Stack.Navigator>
  );
}
