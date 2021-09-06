import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../routes/HomeStack";
import { scale, verticalScale } from "react-native-size-matters";
import _ from "lodash";
import Dialog from "../components/Dialog";
import { theme } from "../styles/theme";
import Button from "../components/Button";
import OptionItem from "./Exam/OptionItem";
import { IQuestion } from "../types";
import { FlatList } from "react-native";
import { globalStyles } from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<HomeStackParamList, "ExamReview">;

const WINDOW_WIDTH = Dimensions.get("window").width;

export interface ISolutionItem {
  image: string;
  question: IQuestion;
  correctId: number | string;
  wrongId?: number | string;
  order: number;
  isCorrect: boolean;
}

export function Badge({ type }: { type: "wrong" | "correct" }) {
  const bgColor = theme.light[type === "wrong" ? "badgeWrong" : "badgeCorrect"];
  return (
    <View style={{ ...styles.badge, backgroundColor: bgColor }}>
      <MaterialIcons
        name={type === "wrong" ? "close" : "done"}
        size={20}
        color={theme.light.secondary}
      />
      <Text style={styles.badgeText}>
        {type === "wrong" ? "Errada" : "Correcta"}
      </Text>
    </View>
  );
}

export function SolutionItem({
  image,
  question,
  correctId,
  wrongId,
  order,
  isCorrect,
}: ISolutionItem) {
  const wrong = question.answers.find((ans) => ans.id == wrongId);
  const correct = question.answers.find((ans) => ans.id == correctId);

  return (
    <View style={styles.solution}>
      <View style={styles.qOrder}>
        <Text style={styles.qNumber}>Questão {order + 1}:</Text>
        <Badge type={!isCorrect ? "wrong" : "correct"} />
      </View>
      <View>
        <View style={styles.qHeader}>
          <View>
            <Image
              style={styles.qImage}
              source={{
                uri: `http://10.0.2.2:1337${image}`,
                height: verticalScale(65),
                width: scale(65),
              }}
            />
          </View>
          <View style={styles.question}>
            <Text style={styles.qText}>{question.value}</Text>
          </View>
        </View>

        <View>
          {wrong && wrong.id != correct?.id && (
            <OptionItem id={+wrong.id} text={wrong?.value} active isWrong />
          )}
          {correct && (
            <OptionItem id={+correct.id} text={correct?.value} active />
          )}
        </View>
      </View>
    </View>
  );
}

export default function ExamReview({ route, navigation }: Props) {
  const { questions, summary } = route.params;
  const { solutions } = summary;

  const handleConfirm = () => {
    navigation.push("Rules");
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
          style={styles.list}
          data={questions}
          renderItem={({ item, index }) => (
            <SolutionItem
              question={item}
              order={index}
              correctId={solutions[item.id].correctAnswerId}
              wrongId={solutions[item.id].userAnswerId}
              image={item.image.url}
              isCorrect={solutions[item.id].isCorrect}
            />
          )}
          ListFooterComponent={
            <Button title="Terminar" handlePress={handleConfirm} />
          }
          ListFooterComponentStyle={{marginBottom: verticalScale(128)}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  solution: {
    marginBottom: verticalScale(32),
  },
  badge: {
    paddingVertical: verticalScale(2),
    paddingHorizontal: scale(8),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginLeft: scale(16),
  },
  badgeText: {
    ...globalStyles.body2,
    color: theme.light.secondary,
    fontFamily: "ws-medium",
    marginLeft: scale(2),
  },
  qOrder: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  qNumber: {
    ...globalStyles.body1,
    fontFamily: "ws-bold",
  },
  qHeader: {
    marginBottom: verticalScale(16),
  },
  qImage: {
    borderRadius: 8,
  },
  question: {
    marginTop: verticalScale(8),
  },
  qText: {
    ...globalStyles.body2,
  },
  container: {
    flex: 1,
    backgroundColor: theme.light.primary,
  },
  body: {
    flex: 1,
    paddingTop: verticalScale(16),
    paddingHorizontal: scale(16),
  },
  list: {
    flex: 1,
  },
});
