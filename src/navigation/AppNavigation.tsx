import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, User } from "react-native-feather";

import ProfileScreen from "@screens/ProfileScreen";
import SignupScreen from "@screens/SignupScreen";
import LoginScreen from "@screens/LoginScreen";
import HomeStack from "./HomeStack";

import { useAuth } from "context/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default () => {
  const state = useAuth();

  return (
    <NavigationContainer>
      {state.token ? (
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
            tabBarStyle: { position: "relative" },
          })}
          initialRouteName="Home"
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "Profile" }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
