import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, User } from "react-native-feather";
import axios from "axios";

import HomeScreen from "@screens/HomeScreen";
import ProfileScreen from "@screens/ProfileScreen";

const Tab = createBottomTabNavigator();

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
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              const strokeWidth = focused ? 3 : 1;
              return route.name === "Profile" ? (
                <User strokeWidth={strokeWidth} />
              ) : (
                <Home strokeWidth={strokeWidth} />
              );
            },
            tabBarShowLabel: false,
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Feed" }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "Profile" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

registerRootComponent(App);
