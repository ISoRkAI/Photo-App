import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { View } from "react-native";

import * as SplashScreen from "expo-splash-screen";

import { store } from "./src/redux/store";
import Main from "./src/components/Main";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Main />
        <Toast />
      </View>
    </Provider>
  );
}
