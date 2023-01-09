import React, { useCallback, useLayoutEffect } from "react";
import { Box, Icon, Text } from "native-base";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Feather } from "@expo/vector-icons";
import { Pressable, SectionList, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import dayjs from "dayjs";
import { Q } from "@nozbe/watermelondb";
import { useMMKVBoolean } from "react-native-mmkv";
import { useNavigation } from "@react-navigation/native";

import { Checkbox, Fab, StatusBar } from "@/components";
import type {
  RootTabScreenProps,
  useNavigationProps
} from "@/navigation/types";
import withDB from "@/db/models/withDB";
import type Task from "@/db/models/Task";
import { getDateInterval, queryTasks } from "@/db/queries";
import { Columns } from "@/db/models/schema";

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

// const today = [
//   { day: "24/01/2023", task: "Feed the rams", isCompleted: true },
//   { day: "25/01/2023", task: "Feed the dogs", isCompleted: false }
// ];

// const tomorrow = [
//   { day: "26/01/2023", task: "Feed the llamas", isCompleted: false },
//   { day: "27/01/2023", task: "Feed the hyenas", isCompleted: false }
// ];

interface RawSectionProps {
  today: Task[];
  tomorrow: Task[];
}
function RawSection({ today, tomorrow }: RawSectionProps) {
  const navigation = useNavigation<useNavigationProps>();
  const onPress = useCallback(async (task: Task) => {
    const list = await task.list.fetch();
    if (!list) {
      return;
    }
    navigation.navigate("Task", { taskID: task.id, theme: list.theme });
  }, []);
  return (
    <SectionList
      sections={[
        { data: today, key: "today" },
        { data: tomorrow, key: "tomorrow" }
      ]}
      style={{ paddingHorizontal: 20 }}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 80 }}
      renderSectionHeader={({ section }) => {
        return (
          <Box
            flexDir="row"
            py="1"
            mb="2"
            bg="background"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              color="blue.400"
              bold
              textTransform="uppercase"
              _light={{ color: "blue.500 " }}
              textAlign="justify"
              fontSize="xl"
            >
              {section.key}
            </Text>
            <TouchableOpacity
              activeOpacity={0.4}
              style={{ padding: 8 }}
              onPress={() =>
                navigation.navigate("AddTask", {
                  date: dayjs()
                    .add(section.key === "today" ? 0 : 1, "day")
                    .valueOf()
                })
              }
            >
              <Icon
                as={Feather}
                name="plus"
                size={20}
                color="blue.400"
                _light={{ color: "blue.500 " }}
              />
            </TouchableOpacity>
          </Box>
        );
      }}
      stickySectionHeadersEnabled
      renderItem={({ item: task }) => {
        return (
          <TaskCard key={task.id} onPress={() => onPress(task)} task={task} />
        );
      }}
    />
  );
}

interface TaskCardProps {
  task: any;
  onPress: () => void;
  animationDelay?: number;
}
function TaskCard({ task, onPress, ...options }: TaskCardProps) {
  // const accent = useAccent(theme)
  return (
    <Pressable onPress={onPress}>
      <MotiView
        from={{ top: 20, opacity: 0.25 }}
        exit={{ height: 0, opacity: 0, marginBottom: -1, paddingVertical: 0 }}
        animate={{ top: 0, opacity: task.isCompleted ? 0.6 : 1 }}
        transition={{
          delay: options?.animationDelay,
          damping: 20,
          stiffness: 200
        }}
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <Box pt="1" alignSelf="flex-start">
          <Checkbox value={task.isCompleted} withTint color={"#BAE2A7"} />
        </Box>
        <Box flexDir="row" alignItems="center" flex={1} flexWrap="wrap">
          <Text
            color="em.1:alpha.80"
            textAlign="left"
            textDecorationLine={task.isCompleted ? "line-through" : undefined}
            fontSize="lg"
          >
            {task.task}
          </Text>
          {/* {!task.reminder ? null : } */}
        </Box>
      </MotiView>
    </Pressable>
  );
}

interface Options {
  tasksWithoutDateAsToday?: boolean;
}
interface TaskSectionListProps {
  today: Task[];
  upcoming: Task[];
  tomorrow: Task[];
  other: Task[];
  options: Options;
}
const Section = withDB<TaskSectionListProps, TaskSectionListProps>(
  RawSection,
  ["options"],
  ({ options }) => ({
    today: queryTasks(
      {
        ...getDateInterval({ day: dayjs().valueOf() }),
        withNull: options.tasksWithoutDateAsToday
      },
      Q.sortBy(Columns.task.reminder, "asc")
    ),
    tomorrow: queryTasks(
      getDateInterval({ day: dayjs().add(1, "day").valueOf() }),
      Q.sortBy(Columns.task.reminder, "asc")
    ),
    upcoming: queryTasks(
      getDateInterval({ daysAfter: 2 }),
      Q.sortBy(Columns.task.reminder, "asc")
    ),
    other: queryTasks({
      ...getDateInterval({ daysBefore: 1 }),
      withNull: !options.tasksWithoutDateAsToday
    })
  })
);
