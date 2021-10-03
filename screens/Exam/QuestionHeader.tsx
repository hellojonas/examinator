import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { globalStyles } from "../../styles/global";
import { theme } from "../../styles/theme";

interface IQuestionHeaderProps {
  image: string;
  questionText: string;
  count: number;
}

export default function QuestionHeader({
  image,
  questionText,
  count,
}: IQuestionHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
          />
        </View>
        <Text style={styles.count}>{count + 1} / 25</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.questionText}>{questionText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: verticalScale(32),
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(16),
  },
  imageWrapper: {
    ...globalStyles.shadowElements,
    height: scale(60),
    width: scale(60),
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  count: {
    ...globalStyles.body2,
  },
  textWrapper: {
    ...globalStyles.shadowElements,
    padding: scale(10),
    minHeight: verticalScale(80),
    backgroundColor: theme.light.secondary,
    borderRadius: 6,
  },
  questionText: {
    ...globalStyles.body2,
    fontFamily: "ws-bold",
  },
});
