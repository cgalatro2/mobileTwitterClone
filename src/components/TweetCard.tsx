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
  // const { _id, content, username, likes } = tweet;
  const { likeTweet } = useLikeTweet();
  const authState = useAuth();
  const userId = authState.user._id;

  const isLiked = tweet?.likes?.includes(userId) ?? false;
  const likeCount = tweet?.likes?.length ?? 0;

  return (
    <Pressable onPress={() => navigation.navigate("Tweet", { ...tweet })}>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={styles.content}>
            <Link
              text={tweet?.username}
              onPress={() =>
                navigation.navigate("User", { username: tweet?.username })
              }
            />
          </ListItem.Title>
          <Text style={styles.content}>{tweet?.content}</Text>
          <View style={styles.reactions}>
            <Icon
              name={`favorite${isLiked ? "" : "-outline"}`}
              color={"pink"}
              onPress={() => likeTweet({ _id: tweet?._id, userId, isLiked })}
            />
            <Text style={styles.likeCount}>{likeCount}</Text>
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
  likeCount: {
    marginLeft: 3,
  },
});
