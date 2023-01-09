import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorMode, useTheme } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { setBackgroundColorAsync } from "expo-navigation-bar";

import type { RootStackParamList, RootTabParamList } from "./types";

import { TabBarIcons } from "@/components";
import { AddTaskScreen, HomeScreen } from "@/screens";

const { Navigator, Screen, Group } = createStackNavigator<RootStackParamList>();
function Root() {
  return (
    <Navigator>
      <Group screenOptions={{ headerShown: false }}>
        <Screen name={"Root"} component={BottomTabNavigator} />
        <Screen name={"AddTask"} component={AddTaskScreen} />
      </Group>
    </Navigator>
  );
}

const Tab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {
  const { colorMode } = useColorMode();
  const { surface, background } = useTheme().colors;

  useFocusEffect(() => {
    setBackgroundColorAsync(colorMode === "dark" ? background : surface);
  });

  return (
    <Tab.Navigator
      detachInactiveScreens
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerStyle:
          colorMode === "dark"
            ? {
                borderBottomColor: surface,
                borderBottomWidth: 1,
                elevation: 0,
                shadowOpacity: 0
              }
            : {}
      }}
    >
      <Tab.Screen
        name={"Home"}
        component={HomeScreen}
        options={{
          title: "All Tasks",
          headerShown: true,
          tabBarIcon: (props) => <TabBarIcons.Home {...props} />
        }}
      />
    </Tab.Navigator>
  );
}

export default Root;
