import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from './styles/global';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './routes/TabNavigator';
import { theme } from './styles/theme';
import {
  useFonts,
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_700Bold,
} from '@expo-google-fonts/work-sans';

export default function App() {
  const [fontsLoaded] = useFonts({
    'ws-light': WorkSans_300Light,
    'ws-regular': WorkSans_400Regular,
    'ws-medium': WorkSans_500Medium,
    'ws-bold': WorkSans_700Bold,
  });

  return fontsLoaded ? (
    <NavigationContainer>
      <View style={styles.app}>
        <TabNavigator />
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  ) : (
    <Text>Loading</Text>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});
