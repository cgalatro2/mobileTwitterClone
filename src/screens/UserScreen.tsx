import { Text } from "react-native";

export default function UserScreen({ route }) {
  const { username } = route.params;

  return <Text>User screen for {username}</Text>;
}
