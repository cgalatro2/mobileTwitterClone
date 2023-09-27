import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "@rneui/themed";

type Props = {
  route: { params: { content: string; username: string } };
  navigation: any;
};

export default function Tweet({ navigation, route }: Props) {
  const { content, username } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: "Post",
    });
  }, []);

  return (
    <View>
      <Text h3>{username}</Text>
      <Text>{content}</Text>
      <Text>Soon to be comments</Text>
    </View>
  );
}
