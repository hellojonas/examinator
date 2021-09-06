import AsyncStorage from "@react-native-async-storage/async-storage";

export type storageKeys = "done" | "passed" | "lessons" | "reviewed";

export async function initStorage() {
  try {
    await AsyncStorage.setItem("done", "0");
    await AsyncStorage.setItem("passed", "0");
    await AsyncStorage.setItem("lessons", "0");
    await AsyncStorage.setItem("reviewed", "0");
  } catch (err) {
    console.log("failed to init storage");
  }
}

export async function increment(key: storageKeys) {
  // try {
  const data = await AsyncStorage.getItem(key);
  await AsyncStorage.setItem(key, (+data! + 1).toString());
  // } catch (err) {
  //   console.log("failed to increment ", key);
  // }
}

export async function getData(key: storageKeys): Promise<number | null> {
  let ret: number | null = null;
  // try {
  const data = await AsyncStorage.getItem(key);
  ret = parseInt(data!, 10);
  // } catch (err) {
  //   console.log(err);
  // }
  return ret;
}

export async function getAll() {
  const k: storageKeys[] = ["done", "passed", "lessons", "reviewed"];
  const dataPromises = k.map((key) => getData(key));
  const res = await Promise.all(dataPromises);

  const data = new Map<storageKeys, number | null>();

  k.forEach((key, idx) => data.set(key, res[idx]));

  return data;
}

export async function clearAll() {
  const k: storageKeys[] = ["done", "passed", "lessons", "reviewed"];
  
  const dataPromises = k.map(
    async (key) => await AsyncStorage.setItem(key, "0")
  );

  await Promise.all(dataPromises);
}

export async function deleteAll() {
  const k: storageKeys[] = ["done", "passed", "lessons", "reviewed"];
  
  const dataPromises = k.map(
    async (key) => await AsyncStorage.removeItem(key)
  );

  await Promise.all(dataPromises);
}

