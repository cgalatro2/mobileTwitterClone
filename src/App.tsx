import { QueryClient, QueryClientProvider } from "react-query";
import { registerRootComponent } from "expo";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppNavigation from "navigation/AppNavigation";
import { AuthProvider } from "context/AuthContext";

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(
    `https://random-data-api.com/api/v2/${queryKey[0]}?size=5`
  );
  return data;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <AppNavigation />
        </SafeAreaProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

registerRootComponent(App);
