import { ActivityIndicator } from "react-native";
import { enableFreeze } from "react-native-screens";

import useCachedResources from "@/hooks/useCachedResources";
import AppNavigator from "@/navigation";
import Providers from "@/components/AppProviders";

enableFreeze(true);
export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <Providers>
      <AppNavigator />
    </Providers>
  );
}
