import React, { useEffect } from "react";
import type { Theme } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { OverflowMenuProvider } from "react-navigation-header-buttons";
import { useColorMode } from "native-base";
import { setBackgroundColorAsync } from "expo-navigation-bar";

import Root from "./RootStackNavigator";

import { DARK_MODE, LIGHT_MODE } from "@/theme";
const DarkTheme: Theme = {
  dark: true,
  colors: {
    background: DARK_MODE.background,
    text: DARK_MODE.em[1],
    primary: DARK_MODE.em[2],
    card: DARK_MODE.background,
    border: DARK_MODE.surface,
    notification: DARK_MODE.noti
  }
};

const LightTheme: Theme = {
  dark: false,
  colors: {
    background: LIGHT_MODE.background,
    text: LIGHT_MODE.em[1],
    primary: LIGHT_MODE.em[2],
    card: LIGHT_MODE.background,
    border: LIGHT_MODE.surface,
    notification: LIGHT_MODE.noti
  }
};

const AppNavigator = () => {
  const { colorMode } = useColorMode();

  useEffect(() => {
    setBackgroundColorAsync(colorMode === "dark" ? "#17161A" : "#FFF");
  }, [colorMode]);

  return (
    <NavigationContainer theme={colorMode === "dark" ? DarkTheme : LightTheme}>
      <OverflowMenuProvider>
        <Root />
      </OverflowMenuProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
