import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { globalStyles } from '../styles/global';
import { theme } from '../styles/theme';

const illustration = require('../assets/illustrations/rules.png');

export default function Rules() {
  return (
    <View style={styles.rules}>
      <View style={styles.header}>
        <View style={styles.imageWrapper}>
          <Image source={illustration} style={styles.image} />
        </View>
        <Text style={styles.title}>Rules</Text>
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.wrapper}>
          <View style={styles.ruleCard}>
            <Text style={styles.text}>
              Cada exame contem um conjunto de 25 perguntas que devem ser
              respondidas num periódo de 60min.
            </Text>
            <Text style={{ ...styles.text, ...styles.textBottom }}>
              Aprovação: 18 ou mais respostas correctas
            </Text>
          </View>
          <View>
            <Button title="Inicar exame" handlePress={() => {}} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rules: {
    flex: 1,
  },
  header: {
    height: '60%',
    paddingBottom: 30,
    backgroundColor: theme.light.tertiary,
    paddingHorizontal: 16,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    marginBottom: 10,
    height: '70%',
  },
  image: {
    resizeMode: 'contain',
    height: '100%',
  },
  title: {
    ...globalStyles.heading2,
  },
  scroll: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    height: '100%',
    width: '100%',
  },
  wrapper: {
    marginTop: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.light.primary,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 16,
    paddingTop: '20%',
    paddingBottom: '30%',
  },
  ruleCard: {
    ...globalStyles.shadowElements,
    backgroundColor: theme.light.secondary,
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  text: {
    ...globalStyles.body1,
  },
  textBottom: {
    marginTop: 10,
  },
});
