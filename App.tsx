import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from './styles/global';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './routes/TabNavigator';
import { theme } from './styles/theme';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'ws-light': require('./assets/font/WorkSans-Light.ttf'),
    'ws-regular': require('./assets/font/WorkSans-Regular.ttf'),
    'ws-medium': require('./assets/font/WorkSans-Medium.ttf'),
    'ws-bold': require('./assets/font/WorkSans-Bold.ttf'),
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
