import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { globalStyles } from "../styles/global";
import { theme } from "../styles/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../routes/HomeStack";
import { verticalScale } from "react-native-size-matters";
import _ from "lodash";
import { useLoadExam } from "../modules/useFetch";

const illustration = require("../assets/illustrations/rules.png");

type RulesProps = NativeStackScreenProps<HomeStackParamList, "Rules">;

export default function Rules({ navigation }: RulesProps) {
  // const ids = _.range(1, 26);
  const { data: questions, loading, error } = useLoadExam();

  // useEffect(() => {
  //   console.log(questions, error);
  // }, [questions, error]);

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
            <Button
              title="Inicar exame"
              handlePress={() => {
                if (loading) {
                  alert("loading please wait...");
                  return;
                }
                if (!error) {
                  navigation.navigate("Exam", {
                    exam: _.shuffle(questions!),
                  });
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rules: {
    flex: 1,
    backgroundColor: theme.light.primary,
  },
  header: {
    height: "60%",
    paddingBottom: verticalScale(30),
    backgroundColor: theme.light.tertiary,
    paddingHorizontal: verticalScale(16),
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    marginBottom: verticalScale(10),
    height: "70%",
  },
  image: {
    resizeMode: "contain",
    height: "100%",
  },
  title: {
    ...globalStyles.heading2,
  },
  scroll: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    height: "100%",
    width: "100%",
  },
  wrapper: {
    marginTop: "75%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.light.primary,
    borderTopRightRadius: verticalScale(20),
    borderTopLeftRadius: verticalScale(20),
    paddingHorizontal: 16,
    paddingTop: "20%",
    paddingBottom: "25%",
  },
  ruleCard: {
    ...globalStyles.shadowElements,
    backgroundColor: theme.light.secondary,
    padding: verticalScale(16),
    borderRadius: verticalScale(20),
    marginBottom: verticalScale(32),
  },
  text: {
    ...globalStyles.body2,
  },
  textBottom: {
    marginTop: verticalScale(10),
  },
});
