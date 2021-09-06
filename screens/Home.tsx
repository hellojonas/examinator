import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Button from "../components/Button";
import StatsCard from "../components/StatsCard";
import { globalStyles } from "../styles/global";
import { theme } from "../styles/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../routes/HomeStack";
import { verticalScale } from "react-native-size-matters";
import {
  getAll,
  deleteAll,
  initStorage,
  storageKeys,
  increment,
} from "../modules/stograge";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<HomeStackParamList, "Home">;

const _initStorage = async () => {
  // deleteAll()
  let data = await getAll();
  const done = data.get("done");

  if (!done) {
    await initStorage();
    data = await getAll();
  }

  return data;
};

export default function Home({ navigation }: Props) {
  const [stats, setStats] = useState<Map<storageKeys, number | null>>();
  const [examStat, setExamStat] = useState<{ key: string; value: any }[]>([]);
  const [reviewStat, setReviewStat] = useState<{ key: string; value: any }[]>(
    []
  );
  const [loadingStorage, setLoadingStorage] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setLoadingStorage(true);
      _initStorage()
        .then((data) => {
          setStats(data);
          setLoadingStorage(false);
          // increment('done')
        })
        .catch((err) => {
          console.log(err);
          setLoadingStorage(false);
        });
    }, [])
  );

  useEffect(() => {
    if (loadingStorage) {
      return;
    }

    setExamStat([
      { key: "Exames Feitos", value: stats?.get("done") },
      { key: "Aprovados", value: stats?.get("passed") },
      { key: "Reprovados", value: stats?.get("done")! - stats?.get("passed")! },
    ]);
    setReviewStat([
      { key: "Matérias", value: stats?.get("lessons") },
      { key: "Revistas", value: stats?.get("reviewed") },
    ]);
  }, [stats, loadingStorage]);

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
          <StatsCard items={examStat} icon="emoji-events" />
          <View style={styles.button}>
            <Button
              title="Fazer exame"
              handlePress={() => {
                navigation.navigate("Rules");
              }}
            />
          </View>
        </View>
        <View style={styles.reviewStats}>
          <StatsCard items={reviewStat} icon="school" />
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
    backgroundColor: "transparent",
    marginBottom: verticalScale(64),
  },
  sub: {
    textAlign: "center",
    color: theme.light.textBody,
  },
  brand: {
    textAlign: "center",
    color: theme.light.textHeading,
  },
  content: {
    flex: 1,
    justifyContent: "space-around",
    paddingBottom: verticalScale(128),
  },
  examStats: {
    marginBottom: verticalScale(40),
  },
  reviewStats: {},
  button: {
    marginTop: verticalScale(24),
    alignItems: "center",
  },
});
