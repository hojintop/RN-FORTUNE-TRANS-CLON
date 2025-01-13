import { StatusBar } from "expo-status-bar";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useFonts } from 'expo-font';

import { useTranslation } from "./src/use-translation";
import Button from "./src/Button";
import { useFortune } from "./src/use-fortune";
import LoadingView from "./src/LoadingView";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { t, locale, setLocale, format } = useTranslation();
  const { fortuneKey, setFortuneKey, getRandomFortuneKey } = useFortune();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState();

  const year = dayjs().year();
  const mon = dayjs().month() + 1;
  const day = dayjs().date();

  const todayText = `${format(t("today_is"), year, mon, day)}`;

  const [fontsLoaded, error] = useFonts({
    'RIDIBatang': require('./assets/fonts/RIDIBatang.otf'),
  });

  useEffect(() => {
    if (locale !== null) {
      setIsLoaded(true);
    }
  }, [locale]);

  useEffect(() => {
    if (isLoaded && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded, fontsLoaded]);

  function onRefresh(){
    setIsRefreshing(true);
  }

  useEffect(()=> {
    if(isRefreshing){
      setFortuneKey(getRandomFortuneKey);
    }
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  },[isRefreshing])

  if (fortuneKey === "") return <LoadingView />;

  return (
    <SafeAreaProvider>
      {/* 배경 */}
      <View
        style={{ flex: 1, position: "absolute", width: "100%", height: "100%" }}
      >
        <LottieView
          autoPlay
          style={{
            width: "100%", // 화면 너비에 맞게 꽉 차게
            height: "100%", // 화면 높이에 맞게 꽉 차게
          }}
          source={require("./assets/background.json")}
          resizeMode="cover"
        ></LottieView>
      </View>

      {/* 본문 */}
      <SafeAreaView
        style={styles.container}
        edges={["top","bottom", "left", "right"]}
      >

        <ScrollView
          contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center',}}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor={"lightblue"}/>}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title_text_day}>{todayText}</Text>
          <Text style={styles.title_text}>{t(fortuneKey)}</Text>
        </ScrollView>

      </SafeAreaView>
      <Button islocale={locale} setIslocale={setLocale} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title_text_day: {
    fontFamily: "RIDIBatang",
    position: 'absolute',
    top:100,
    color: "gray",
    fontWeight: "bold",
    fontSize: 20,
  },
  title_text: {
    fontFamily: "RIDIBatang",
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
