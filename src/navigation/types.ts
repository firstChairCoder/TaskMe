import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type {
  CompositeScreenProps,
  NavigatorScreenParams
} from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";

export type RootTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Lists: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  //   AddTask: { defaultList?: string; date?: number } | undefined;
  //   Overview: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, Screen>;
export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    StackScreenProps<RootStackParamList, "Root">,
    BottomTabScreenProps<RootTabParamList, Screen>
  >;

// export type ListStackScreenProps<Screen extends keyof ListStackType> = Omit<
//   CompositeScreenProps<
//     RootTabScreenProps<"Lists">,
//     StackScreenProps<ListStackType, Screen>
//   >,
//   "route"
// > & {
//   route: StackScreenProps<ListStackType, Screen>["route"];
// };

// export type useNavigationProps = CompositeNavigationProp<
//   StackNavigationProp<RootStackParamList>,
//   CompositeNavigationProp<
//     StackNavigationProp<RootTabParamList>
//     // StackNavigationProp<ListStackType>
//   >
// >;
