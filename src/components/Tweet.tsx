import { StyleSheet, Pressable } from "react-native";
import { ListItem, Text, Icon } from "@rneui/themed";

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
          <ListItem.Title style={styles.content}>
            <Link
              text={username}
              onPress={() => navigation.navigate("User", { username })}
            />
          </ListItem.Title>
          <Text style={styles.content}>{content}</Text>
          <Icon name="favorite" color={"pink"} />
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    marginBottom: 5,
  },
});
