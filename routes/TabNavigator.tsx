import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '../components/TabBar';
import Review from '../screens/Review';
import HomeStack from './HomeStack';
// import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export type RootParamList = {
  HomeStack: undefined;
  Rever: undefined;
};

const Tab = createBottomTabNavigator<RootParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="HomeStack"
        options={{
          headerShown: false,
          title: 'Início',
        }}
      >
        {() => <HomeStack />}
      </Tab.Screen>
      <Tab.Screen name="Rever" component={Review} />
    </Tab.Navigator>
  );
}
