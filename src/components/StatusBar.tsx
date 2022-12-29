/* eslint-disable react-native/split-platform-components */
import React, { useMemo } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useColorModeValue } from "native-base";
import type {
  StatusBarPropsAndroid,
  StatusBarPropsIOS,
  StatusBarStyle
} from "react-native";
import { StatusBar as RNStatusBar } from "react-native";

type StatusBarProps = StatusBarPropsAndroid &
  StatusBarPropsIOS & {
    barStyle?: StatusBarStyle;
    _dark?: StatusBarStyle;
    _light?: StatusBarStyle;
    animated?: boolean;
  };

export default function StatusBar({
  _dark,
  _light,
  barStyle,
  ...props
}: StatusBarProps) {
  const isDarkMode = useColorModeValue(false, true);
  const style = useMemo(() => {
    if (_dark && isDarkMode) {
      return _dark;
    }
    if (_light && !isDarkMode) {
      return _light;
    }
    if (typeof barStyle !== "undefined") {
      return barStyle;
    }

    return !isDarkMode ? "dark-content" : "light-content";
  }, [_dark, _light, barStyle, isDarkMode]);
  const isFocused = useIsFocused();

  if (isFocused) {
    return <RNStatusBar {...props} barStyle={style} />;
  }
  return null;
}
