import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { ListItem, Text } from "@rneui/themed";

import { Tweet } from "api/types/Tweet";
import { Pressable } from "react-native";
import Link from "components/Link";

type Props = {
  route: { params: Tweet };
  navigation: any;
};

export default function TweetScreen({ navigation, route }: Props) {
  const { content, username, likes, timestamp } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: "Post",
    });
  }, []);

  const likeCount = likes?.length ?? 0;

  return (
    <Pressable>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={styles.row}>
            <Link
              text={username}
              onPress={() => navigation.navigate("User", { username })}
            />
          </ListItem.Title>
          <Text style={styles.row}>{content}</Text>
          <Text>{timestamp.toString()}</Text>
        </ListItem.Content>
      </ListItem>
      <ListItem>
        <ListItem.Content>
          <Pressable
            style={{ ...styles.interactionRow }}
            onPress={() => console.log("show all likers")}
          >
            <Text>{likeCount} likes</Text>
          </Pressable>
        </ListItem.Content>
      </ListItem>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  interactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    marginBottom: 8,
  },
});
