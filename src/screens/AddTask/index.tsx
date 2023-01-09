import React from "react";
import type { ITextProps } from "native-base";
import { Box, ScrollView, Text, useTheme } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { setBackgroundColorAsync } from "expo-navigation-bar";

import { StatusBar } from "@/components";

export const AddTaskScreen = () => {
  const { surface } = useTheme().colors;
  useFocusEffect(() => {
    setBackgroundColorAsync(surface);
  });
  return (
    <ScrollView
      _contentContainerStyle={{ bg: "surface", flexGrow: 1, pb: "90px" }}
    >
      <Box px="5" pt="2" bg="surface">
        <StatusBar />
        <Label l={"Task Title"} mb={2} />
        <Label l={"List"} mt="5" />

        <Box mt="5" mb={2} flexDir="row" alignItems="center">
          <Label l={"Reminders"} />
        </Box>

        <Label l={"SubTask"} mt="5" />
      </Box>
    </ScrollView>
  );
};

function Label({ l: title, ...props }: ITextProps & { l: string }) {
  return (
    <Text fontSize="md" bold {...props}>
      {title}
    </Text>
  );
}
