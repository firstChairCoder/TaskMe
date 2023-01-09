import React from "react";
import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Icon, Pressable } from "native-base";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: "100%"
  }
});

type CheckboxProps = {
  value: boolean;
  onToggle?: (i: boolean) => void;
  color: string;
  iconColor?: string;
  size?: number;
  withTint?: boolean;
};
const Checkbox = ({
  value,
  onToggle: toggle,
  color,
  size = 22,
  iconColor = "em.10",
  withTint
}: CheckboxProps) => {
  return (
    <Pressable
      hitSlop={15}
      borderRadius={size}
      borderWidth={value ? 0 : 2}
      style={{ marginEnd: 18, marginStart: 1, width: size, height: size }}
      borderColor={color}
      bg={withTint ? `${color}:alpha.10` : "transparent"}
      justifyContent="center"
      alignItems="center"
      onPress={() => {
        toggle && toggle(!value);
      }}
    >
      <MotiView
        style={[
          {
            backgroundColor: color,

            borderRadius: size
          },
          styles.box
        ]}
        animate={{
          scale: value ? 1 : 0.3,
          opacity: value ? 1 : 0
        }}
        transition={{ damping: 10 }}
      >
        <Icon as={Feather} name="check" color={iconColor} size={0.7 * size} />
      </MotiView>
    </Pressable>
  );
};

export default Checkbox;
