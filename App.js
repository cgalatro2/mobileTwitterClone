import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, User } from "react-native-feather";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
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
  );
}

function HomeScreen() {
  return <Text>Heyo!</Text>;
}

function ProfileScreen() {
  return <Text>Profile screen babay</Text>;
}
