import React, { useLayoutEffect } from "react";
import { Box } from "native-base";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Feather } from "@expo/vector-icons";

import { Fab, StatusBar } from "@/components";
import type { RootTabScreenProps } from "@/navigation/types";

export const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  useLayoutEffect(() => {
    navigation.setOptions({
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
      {/* <Section /> */}
      <Fab onPress={() => true} />
    </Box>
  );
};

// interface Options {
//   tasksWithoutDateAsToday?: boolean;
// }
// interface TaskSectionListProps {
//   today: Task[];
//   upcoming: Task[];
//   tomorrow: Task[];
//   other: Task[];
//   options: Options;
// }
// const Section = withDB<TaskSectionListProps, TaskSectionListProps>(
//   RawSection,
//   ["options"],
//   ({ options }) => ({
//     today: queryTasks(
//       {
//         ...getDateHelper({ day: dayjs().valueOf() }),
//         withNull: options.tasksWithoutDateAsToday
//       },
//       Q.sortBy(Columns.task.reminder, "asc")
//     ),
//     tomorrow: queryTasks(
//       getDateHelper({ day: dayjs().add(1, "day").valueOf() }),
//       Q.sortBy(Columns.task.reminder, "asc")
//     ),
//     upcoming: queryTasks(
//       getDateHelper({ afterDays: 2 }),
//       Q.sortBy(Columns.task.reminder, "asc")
//     ),
//     other: queryTasks({
//       ...getDateHelper({ beforeDays: 1 }),
//       withNull: !options.tasksWithoutDateAsToday
//     })
//   })
// );
