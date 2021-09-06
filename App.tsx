import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './routes/TabNavigator';
import { useFonts } from 'expo-font';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://10.0.2.2:1337/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  const [fontsLoaded] = useFonts({
    'ws-light': require('./assets/font/WorkSans-Light.ttf'),
    'ws-regular': require('./assets/font/WorkSans-Regular.ttf'),
    'ws-medium': require('./assets/font/WorkSans-Medium.ttf'),
    'ws-bold': require('./assets/font/WorkSans-Bold.ttf'),
  });

  return fontsLoaded ? (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <View style={styles.app}>
          <TabNavigator />
          <StatusBar style="auto" />
        </View>
      </ApolloProvider>
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

AppRegistry.registerComponent('Examinator', () => App);
