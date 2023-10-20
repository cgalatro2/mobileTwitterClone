import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ListItem, Text } from "@rneui/themed";
import format from "date-fns/format";

import { Tweet } from "api/types/Tweet";

import Link from "components/Link";

type Props = {
  route: { params: Tweet };
  navigation: any;
};

export default function TweetScreen({ navigation, route }: Props) {
  const { _id, content, username, timestamp, likes } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: "Post",
    });
  }, []);

  const likeCount = likes?.length ?? 0;
  const time = timestamp
    ? format(new Date(timestamp), "Pp")
    : new Date().toISOString();

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
          <Text>{time}</Text>
        </ListItem.Content>
      </ListItem>
      <ListItem>
        <ListItem.Content>
          <Pressable
            style={{ ...styles.interactionRow }}
            onPress={() => console.log("show all likers")}
          >
            <Link
              text={`${likeCount} likes`}
              onPress={() => navigation.navigate("Likes", { _id })}
            ></Link>
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
