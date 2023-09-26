import { StyleSheet, Pressable } from "react-native";
import { ListItem, Text } from "@rneui/themed";

import Link from "./Link";

type Props = {
  content: string;
  username: string;
  navigation: any;
};

export default function Tweet({ navigation, content, username }: Props) {
  return (
    <Pressable
      onPress={() => navigation.navigate("Tweet", { content, username })}
    >
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={styles.user}>
            <Link
              text={username}
              onPress={() => navigation.navigate("User", { username })}
            />
          </ListItem.Title>
          <ListItem.Content>
            <Text>{content}</Text>
          </ListItem.Content>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  user: {
    marginBottom: 5,
  },
});
