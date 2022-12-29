import { Feather } from "@expo/vector-icons";
import { Box, Icon, useTheme } from "native-base";
import type { ReactNode } from "react";
import React from "react";
import type { ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native";

interface FabProps {
  children?: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}
const Fab = ({
  children = <Icon as={Feather} name="plus" size="30px" color="em.1" />,
  style,
  onPress
}: FabProps) => {
  const { surface } = useTheme().colors;
  return (
    <Box w="100%" px="20px" pb="20px" position="absolute" bottom="0">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          {
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-end",
            elevation: 1.5,
            backgroundColor: surface
          },
          style
        ]}
        children={children}
      />
    </Box>
  );
};

export default Fab;
