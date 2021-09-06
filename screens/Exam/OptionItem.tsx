import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { globalStyles } from "../../styles/global";
import { theme } from "../../styles/theme";

export type OptionEmitter = (option: { text: string; id: number }) => any;

export interface IOptionProps {
  handlePress?: OptionEmitter;
  text: string;
  id: number;
  active?: boolean;
  isWrong?: boolean;
}

export default function OptionItem({
  text,
  handlePress,
  id,
  active,
  isWrong,
}: IOptionProps) {
  const _handlePress = () => {
    handlePress && handlePress({ text, id });
  };

  const [color, setColor] = useState<{ backgroundColor: string }>({
    backgroundColor: "#00000000",
  });

  useEffect(() => {
    const activeColor = theme.light[!isWrong ? "optionActive" : "optionWrong"];
    setColor({
      backgroundColor: active ? activeColor : "#00000000",
    });
  }, [active]);

  return (
    <TouchableWithoutFeedback onPress={_handlePress}>
      <View style={{ ...styles.option, ...color }}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  option: {
    marginBottom: verticalScale(10),
    padding: scale(10),
    minHeight: verticalScale(60),
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.light.borderOption,
  },
  text: {
    ...globalStyles.body2,
    fontSize: scale(12),
  },
  active: {
    backgroundColor: theme.light.optionDefault,
  },
  default: {
    backgroundColor: theme.light.optionDefault,
  },
});
