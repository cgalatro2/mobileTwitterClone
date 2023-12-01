import { StyleSheet, Pressable, View } from "react-native";
import { ListItem, Text, Icon } from "@rneui/themed";

import { useLikeTweet } from "api/mutations/useLikeTweet";
import { Tweet } from "api/types/Tweet";
import { useAuth } from "context/AuthContext";

import Link from "./Link";

type Props = {
  tweet: Tweet;
  navigation: any;
};

export default function TweetCard({ navigation, tweet }: Props) {
  const { likeTweet } = useLikeTweet();
  const {
    currentUser: { currentUserId },
  } = useAuth();
  const { user } = tweet;

  const isLiked = tweet?.likes?.includes(currentUserId);
  const likeCount = tweet?.likes?.length;
  const commentCount = tweet?.comments?.length;

  return (
    <Pressable
      onPress={() => navigation.navigate("Tweet", { tweetId: tweet?._id })}
    >
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={styles.content}>
            <Link
              text={user.username}
              onPress={() =>
                navigation.navigate("User", {
                  username: user.username,
                  userId: user._id,
                })
              }
            />
          </ListItem.Title>
          <Text style={styles.content}>{tweet?.content}</Text>
          <View style={styles.reactions}>
            <Icon
              name={`favorite${isLiked ? "" : "-outline"}`}
              color={"pink"}
              onPress={() =>
                likeTweet({ _id: tweet?._id, user: currentUserId, isLiked })
              }
            />
            <Text style={styles.count}>{likeCount}</Text>
            <Icon
              name={"comment"}
              onPress={() => navigation.navigate("WriteComment", { tweet })}
            />
            <Text style={styles.count}>{commentCount}</Text>
          </View>
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
  reactions: {
    flexDirection: "row",
    alignItems: "center",
  },
  count: {
    marginLeft: 3,
    marginRight: 16,
  },
});
