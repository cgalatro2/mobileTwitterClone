import { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { ListItem, Text } from "@rneui/themed";
import format from "date-fns/format";

import Link from "components/Link";
import CommentCard from "components/CommentCard";
import { useTweet } from "api/queries/useTweet";
import LoadingScreen from "./LoadingScreen";

type Props = {
  route: { params: { tweetId: string } };
  navigation: any;
};

export default function TweetScreen({ navigation, route }: Props) {
  const { tweetId } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: "Post",
    });
  }, []);

  const { data: tweet, isLoading } = useTweet(tweetId);

  if (isLoading || !tweet) {
    return <LoadingScreen />;
  }

  const {
    _id,
    content,
    user: { username },
    likes,
    comments,
    createdAt,
  } = tweet;

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
          <CommentCard
            comment={item}
            tweetId={tweet._id}
            navigation={navigation}
          />
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
