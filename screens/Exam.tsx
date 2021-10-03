import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../routes/HomeStack";
import Carousel from "react-native-snap-carousel";
import { scale, verticalScale } from "react-native-size-matters";
import { Question } from "./Exam/Question";
import { theme } from "../styles/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { AnswerMap, IUserAnswer, IQuestion } from "../types";
import { examContext } from "../context/examContext";
import { useEffect } from "react";
import { pad } from "../modules/padTimeComponent";
import { solve } from "../modules/exam";
import _ from "lodash";
import DialogConfirm from "../components/DialogConfirm";
import Dialog from "../components/Dialog";

type Props = NativeStackScreenProps<HomeStackParamList, "Exam">;

const WINDOW_WIDTH = Dimensions.get("window").width;

export default function ExamSession({ route, navigation }: Props) {
  const { exam } = route.params;
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [timer, setTimer] = useState(3600);
  const [clrInterval, setClrInterval] = useState<NodeJS.Timer | null>(null);
  const [autoSumit, setAutoSubmit] = useState(false);

  useEffect(() => {
    if (!clrInterval) {
      startTimer();
    }

    return function cleanup() {
      stopTimer();
    };
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      stopTimer();
      setAutoSubmit(true);
    }
  }, [timer]);

  const addAnswer = (answer: IUserAnswer) => {
    setAnswers((old) => ({
      ...old,
      [answer.questionId]: {
        userAnswerId: answer.userAnswerId,
      },
    }));
  };

  const startTimer = () => {
    if (clrInterval) {
      return;
    }

    const clr = setInterval(() => setTimer((old) => old - 1), 1000);
    setClrInterval(clr);
  };

  const stopTimer = () => {
    if (!clrInterval) {
      return;
    }
    clearInterval(clrInterval);
    // setClrInterval(null);
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    stopTimer();
    const _answers = { ...answers };

    exam.forEach((q) => {
      if (!(q.id in _answers)) {
        _answers[q.id] = { userAnswerId: undefined };
      }
    });

    const summary = solve(exam, _answers);

    navigation.replace("Score", { summary, questions: exam });
    setShowModal(false);
  };

  const handleCancel = () => setShowModal(false);

  return (
    <examContext.Provider value={{ addAnswer, answers }}>
      <DialogConfirm
        title="Confirmar término de exame?"
        visible={showModal}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
      <Dialog
        title="Tempo esgotado"
        visible={autoSumit}
        handleClick={handleConfirm}
      />

      <View style={styles.container}>
        <ScrollView style={styles.body}>
          <View style={styles.wrapper}>
            <View style={styles.action}>
              <View style={styles.timer}>
                <MaterialIcons
                  name="timer"
                  color={theme.light.icons}
                  size={20}
                />
                <Text style={styles.timerText}>
                  {pad(Math.floor(timer / 60))}: {pad(timer % 60)}
                </Text>
              </View>
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.btnSubmit}>
                  <MaterialIcons
                    name="outlined-flag"
                    color={theme.light.secondary}
                    size={20}
                  />
                  <Text style={styles.buttonText}>Terminar</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Carousel
              style={styles.carousel}
              data={exam}
              renderItem={({
                item,
                index,
              }: {
                item: IQuestion;
                index: number;
              }) => <Question question={item} count={index} />}
              sliderWidth={WINDOW_WIDTH - 32}
              itemWidth={WINDOW_WIDTH - 48}
            />
          </View>
        </ScrollView>
      </View>
    </examContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.primary,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(24),
    width: WINDOW_WIDTH - 32,
  },
  timer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    marginLeft: scale(4),
  },
  btnSubmit: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: scale(4),
    paddingHorizontal: scale(8),
    backgroundColor: theme.light.borderOptionWrong,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: "ws-bold",
    fontSize: scale(12),
    marginLeft: scale(4),
    color: theme.light.secondary,
  },
  body: {
    flex: 1,
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(32),
  },
  wrapper: {
    alignItems: "center",
    marginBottom: verticalScale(96),
  },
  carousel: {
    alignItems: "center",
  },
});
