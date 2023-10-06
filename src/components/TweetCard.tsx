L;

import { StyleSheet, Pressable, View } from "react-native";
import { ListItem, Text, Icon } from "@rneui/themed";

import { useLikeTweet } from "api/mutations/useLikeTweet";
import { useAuth } from "context/AuthContext";
import Link from "./Link";

type Props = {
  _id: string;
  content: string;
  username: string;
  likes: string[];
  navigation: any;
};

export default function Tweet({
  navigation,
  content,
  username,
  likes,
  _id,
}: Props) {
  const { likeTweet } = useLikeTweet();
  const authState = useAuth();
  const userId = authState.user._id;

  const isLiked = likes?.includes(userId);
  const likeCount = likes?.length ?? 0;

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
          <View style={styles.reactions}>
            <Icon
              name={`favorite${isLiked ? "" : "-outline"}`}
              color={"pink"}
              onPress={() => likeTweet({ _id, userId, isLiked })}
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
