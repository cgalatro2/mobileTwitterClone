import { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { ListItem, Text } from "@rneui/themed";
import format from "date-fns/format";

import { Tweet } from "api/types/Tweet";
import { useComments } from "api/queries/useComments";

import Link from "components/Link";
import CommentCard from "components/CommentCard";

type Props = {
  route: { params: { tweet: Tweet } };
  navigation: any;
};

export default function TweetScreen({ navigation, route }: Props) {
  const { tweet } = route.params;
  const {
    _id,
    content,
    user: { username },
    createdAt,
    likes,
  } = tweet;

  const { data: comments } = useComments(_id);

  useEffect(() => {
    navigation.setOptions({
      title: "Post",
    });
  }, []);

  const likeCount = likes?.length ?? 0;
  const time = createdAt
    ? format(new Date(createdAt), "Pp")
    : new Date().toLocaleDateString();

  return (
    <View>
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
            <View style={{ ...styles.interactionRow }}>
              <Link
                text={`${likeCount} likes`}
                onPress={() => navigation.navigate("Likes", { _id })}
              ></Link>
            </View>
          </ListItem.Content>
        </ListItem>
      </Pressable>

      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <CommentCard comment={item} navigation={navigation} />
        )}
      />
    </View>
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
