import React from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MMKV } from "react-native-mmkv";

import useColorMode from "@/hooks/useColorScheme";
import theme, { colorModeManager, DARK_MODE } from "@/theme";

export const storage = new MMKV();

type ProviderProps = {
  children: React.ReactNode;
};
export default function Providers({ children }: ProviderProps) {
  const { colorMode } = useColorMode();
  const t = React.useMemo(() => {
    if (colorMode === "dark") {
      return {
        ...theme,
        colors: {
          ...theme.colors,
          ...DARK_MODE
        }
      };
    }
    return theme;
  }, [colorMode]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ backgroundColor: t.colors.background }}>
        <NativeBaseProvider theme={t} colorModeManager={colorModeManager}>
          <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
