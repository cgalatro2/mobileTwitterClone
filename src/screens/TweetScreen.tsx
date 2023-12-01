import { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { ListItem, Text, Icon } from "@rneui/themed";
import format from "date-fns/format";

import { useTweet } from "api/queries/useTweet";
import { useAuth } from "context/AuthContext";

import Link from "components/Link";
import CommentCard from "components/CommentCard";
import LoadingScreen from "./LoadingScreen";
import { useLikeTweet } from "api/mutations/useLikeTweet";

type Props = {
  route: { params: { tweetId: string } };
  navigation: any;
};

export default function TweetScreen({ navigation, route }: Props) {
  const { tweetId } = route.params;

  const {
    currentUser: { currentUserId },
  } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      title: "Post",
    });
  }, []);

  const { data: tweet, isLoading } = useTweet(tweetId);
  const { likeTweet } = useLikeTweet(tweetId);

  if (isLoading || !tweet) {
    return <LoadingScreen />;
  }

  const {
    _id,
    content,
    user: { username, _id: userId },
    likes,
    comments,
    createdAt,
  } = tweet;

  const isLiked = tweet.likes.includes(currentUserId);
  const likeCount = likes?.length ?? 0;
  const time = createdAt
    ? format(new Date(createdAt), "Pp")
    : new Date().toLocaleDateString();

  return (
    <View>
      <Pressable>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={styles.username}>
              <Link
                text={username}
                onPress={() =>
                  navigation.navigate("User", { username, userId })
                }
                h2
              />
            </ListItem.Title>
            <Text h4 style={styles.content}>
              {content}
            </Text>
            <Text>{time}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content style={{ ...styles.row }}>
            <Link
              text={`${likeCount} likes`}
              onPress={() => navigation.navigate("Likes", { _id })}
            ></Link>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content style={{ ...styles.row }}>
            <Icon
              name={`favorite${isLiked ? "" : "-outline"}`}
              color={"pink"}
              onPress={() =>
                likeTweet({ _id: tweet._id, user: currentUserId, isLiked })
              }
              style={styles.likes}
            />
            <Icon
              name={"comment"}
              onPress={() => navigation.navigate("WriteComment", { tweet })}
            />
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
  username: {
    marginBottom: 8,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  content: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  likes: {
    marginRight: 20,
  },
});
