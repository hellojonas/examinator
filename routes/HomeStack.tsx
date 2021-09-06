import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Rules from "../screens/Rules";
import { theme } from "../styles/theme";
import Exam from "../screens/Exam";
import { IQuestion, Summary } from "../types";
import Score from "../screens/Score";
import ExamReview from "../screens/ExamReview";

export type HomeStackParamList = {
  Home: undefined;
  Rules: undefined;
  Exam: { exam: IQuestion[] };
  Score: { summary: Summary; questions: IQuestion[] };
  ExamReview: { summary: Summary; questions: IQuestion[] };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.light.tertiary },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Início",
        }}
      />
      <Stack.Screen
        name="Rules"
        component={Rules}
        options={{
          title: "",
          headerShadowVisible: false,
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name="Exam"
        component={Exam}
        options={{
          headerBackVisible: false,
          title: "Exame",
        }}
      />
      <Stack.Screen
        name="Score"
        component={Score}
        options={{
          title: "Exame",
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name="ExamReview"
        component={ExamReview}
        options={{
          title: "Respostas",
        }}
      />
    </Stack.Navigator>
  );
}
