import { useEffect, useReducer } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, User } from "react-native-feather";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import HomeScreen from "@screens/HomeScreen";
import ProfileScreen from "@screens/ProfileScreen";
import SignupScreen from "@screens/SignupScreen";
import LoginScreen from "@screens/LoginScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const getAuthToken = async () => {
      let userToken: string;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        console.log(`Error getting token: ${e}`);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    getAuthToken();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {state.userToken == null ? (
          <Stack.Navigator>
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        ) : (
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
        )}
      </NavigationContainer>
    </QueryClientProvider>
  );
}

registerRootComponent(App);
