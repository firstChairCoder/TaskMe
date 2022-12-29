import type { StorageManager } from "native-base";
import { extendTheme } from "native-base";
import { Appearance } from "react-native";

import { storage } from "@/components/AppProviders";

const config = {
  useSystemColorMode: false,
  initialColorMode: "light"
};

export const DARK_MODE = {
  background: "#131313",
  surface: "#323232",
  em: {
    1: "#FFF",
    2: "#EAEAEA",
    3: "#ABABAB",
    4: "#787878",
    5: "#343434",
    6: "#131313",
    10: "#000"
  },
  noti: "#F00"
};
export const LIGHT_MODE = {
  background: "#FAFAFA",
  surface: "#FFF",
  em: {
    1: "#000",
    2: "#343434",
    3: "#787878",
    4: "#ABABAB",
    5: "#EAEAEA",
    6: "#F1F1F1",
    10: "#FFF"
  },
  noti: "#F00"
};

const theme = extendTheme({
  colors: LIGHT_MODE,
  components: {
    Text: {
      fontSize: 16
    },
    Input: {
      _focus: {
        borderColor: "blue.500"
      },
      baseStyle: {
        _light: {
          selectionColor: "rgba(0,0,0,0.4)"
        },
        _dark: {
          selectionColor: "rgba(255,255,255,0.4)"
        }
      }
    }
  },
  config
});
type ITheme = typeof theme;

declare module "native-base" {
  type ICustomTheme = ITheme;
}

export default theme;

export const colorModeManager: StorageManager = {
  get: async () => {
    const colorMode = storage.getString("@color-mode");
    if (colorMode === "dark" || colorMode === "light") {
      return colorMode;
    }
    return Appearance.getColorScheme();
  },
  set: async (value) => {
    if (value !== "dark" && value !== "light") {
      storage.set("@color-mode", "system-default");
      return;
    }
    storage.set("@color-mode", value);
  }
};
