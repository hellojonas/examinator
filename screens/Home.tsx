import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Button from '../components/Button';
import StatsCard from '../components/StatsCard';
import { globalStyles } from '../styles/global';
import { theme } from '../styles/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../routes/HomeStack';
import { verticalScale } from 'react-native-size-matters';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  const cardItems1 = [
    { key: 'Exames Feitos', value: '23' },
    { key: 'Aprvados', value: '14' },
    { key: 'Reprovados', value: '9' },
  ];
  const cardItems2 = [
    { key: 'Materias', value: '54' },
    { key: 'Revistas', value: '18' },
  ];

  return (
    <ScrollView style={styles.home}>
      <View style={styles.header}>
        <Text style={{ ...styles.sub, ...globalStyles.body2 }}>
          Exames da INATTER
        </Text>
        <Text style={{ ...styles.brand, ...globalStyles.heading1 }}>
          EXAMINATOR
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.examStats}>
          <StatsCard items={cardItems1} icon="emoji-events" />
          <View style={styles.button}>
            <Button
              title="Fazer exame"
              handlePress={() => {
                navigation.navigate('Rules');
              }}
            />
          </View>
        </View>
        <View style={styles.reviewStats}>
          <StatsCard items={cardItems2} icon="school" />
          <View style={styles.button}>
            <Button title="Rever Materias" handlePress={() => {}} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: theme.light.primary,
    paddingHorizontal: verticalScale(24),
  },
  header: {
    paddingTop: verticalScale(32),
    paddingBottom: verticalScale(16),
    backgroundColor: 'transparent',
    marginBottom: verticalScale(64),
  },
  sub: {
    textAlign: 'center',
    color: theme.light.textBody,
  },
  brand: {
    textAlign: 'center',
    color: theme.light.textHeading,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    paddingBottom: verticalScale(128),
  },
  examStats: {
    marginBottom: verticalScale(40),
  },
  reviewStats: {},
  button: {
    marginTop: verticalScale(24),
    alignItems: 'center',
  },
});
