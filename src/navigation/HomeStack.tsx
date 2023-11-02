import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FeedScreen from "screens/FeedScreen";
import UserScreen from "screens/UserScreen";
import TweetScreen from "screens/TweetScreen";
import LikesScreen from "screens/LikesScreen";
import FollowersScreen from "screens/FollowersScreen";
import FollowingScreen from "screens/FollowingScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="User" component={UserScreen} />
      <Stack.Screen name="Tweet" component={TweetScreen} />
      <Stack.Screen name="Likes" component={LikesScreen} />
      <Stack.Screen name="Followers" component={FollowersScreen} />
      <Stack.Screen name="Following" component={FollowingScreen} />
    </Stack.Navigator>
  );
}
