import React, { useLayoutEffect } from "react";
import { Box } from "native-base";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Feather } from "@expo/vector-icons";
import { useMMKVBoolean } from "react-native-mmkv";

import Section from "./components/Section";

import { Fab, StatusBar } from "@/components";
import type { RootTabScreenProps } from "@/navigation/types";

export const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  const [tasksWithoutDateAsToday] = useMMKVBoolean(
    "tasks-without-date-as-today"
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: (i) => (
        <HeaderButtons>
          <Item
            color={i.tintColor}
            iconName="compass"
            iconSize={23}
            style={{ marginEnd: 10 }}
            IconComponent={Feather}
            title="Overview"
            onPress={() => true}
          />
        </HeaderButtons>
      )
    });
  }, [navigation]);

  return (
    <Box flex={1}>
      <StatusBar />
      <Section options={{ tasksWithoutDateAsToday }} />
      <Fab onPress={() => true} />
    </Box>
  );
};
