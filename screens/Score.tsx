import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { filter } from "lodash";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { scale, verticalScale } from "react-native-size-matters";
import Button from "../components/Button";
import { getAll, increment } from "../modules/stograge";
import { HomeStackParamList } from "../routes/HomeStack";
import { globalStyles } from "../styles/global";
import { theme } from "../styles/theme";

type ScoreProps = NativeStackScreenProps<HomeStackParamList, "Score">;

export default function Score({ route, navigation }: ScoreProps) {
  const {summary, questions} = route.params;
  const illuSuccess = require("../assets/illustrations/success.png");
  const illuFail = require("../assets/illustrations/fail.png");
  const correctAnswers = filter(
    summary.solutions,
    (sol) => sol.isCorrect
  ).length;

  useEffect(() => {
    increment('done');

    if(summary.passed) {
      increment('passed')
    }

  }, [])


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollWrapper}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {summary.passed ? "Aprovado" : "Reprovado"}
            </Text>
          </View>

          <View style={styles.illustrarion}>
            <Image
              source={summary.passed ? illuSuccess : illuFail}
              height={scale(164)}
              resizeMode="contain"
            />
          </View>

          <View style={styles.stats}>
            <Text style={styles.statsText}>Acertou: {correctAnswers}</Text>
            <Text style={styles.statsText}>Errou: {25 - correctAnswers}</Text>
          </View>

          <View style={styles.controls}>
            <View style={styles.btnReview}>
              <Button title="Ver respostas" handlePress={() => {
                navigation.push('ExamReview', {summary, questions})
              }} />
            </View>
            <Button
              title="Novo Exame"
              handlePress={() => {navigation.replace('Rules')}}
              btnType="secondary"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.primary,
  },
  scrollWrapper: {
    flex: 1,
  },
  wrapper: {
    paddingBottom: verticalScale(128),
    paddingHorizontal: 24,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginVertical: verticalScale(40)
  },
  headerText: {
    ...globalStyles.heading2,
  },
  illustrarion: {
    marginBottom: verticalScale(24),
  },
  stats: {
    alignItems: 'center'
    ,marginBottom: verticalScale(24)
  },
  statsText: {
    ...globalStyles.body2,
    marginVertical: verticalScale(6),
  },
  controls: {},
  btnReview: {
    marginBottom: verticalScale(32)
  },
});
