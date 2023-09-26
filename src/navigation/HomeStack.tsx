import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FeedScreen from "screens/FeedScreen";
import UserScreen from "screens/UserScreen";
import TweetScreen from "screens/TweetScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="User" component={UserScreen} />
      <Stack.Screen name="Tweet" component={TweetScreen} />
    </Stack.Navigator>
  );
}
