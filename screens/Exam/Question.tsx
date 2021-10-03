import React from "react";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { examContext } from "../../context/examContext";
import { IQuestion } from "../../types";
import { OptionList } from "./OptionList";
import QuestionHeader from "./QuestionHeader";

interface IQuestionProps {
  question: IQuestion;
  count: number;
}

export function Question({ question, count }: IQuestionProps) {
  const { addAnswer } = useContext(examContext);
  return (
    <View style={styles.question}>
      <QuestionHeader
        count={count}
        image={question.picture}
        questionText={question.value}
      />
      <OptionList
        answers={question.answers}
        handlePress={({ id }) => {
          addAnswer && addAnswer({ questionId: question.id, userAnswerId: id });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  question: {},
});
