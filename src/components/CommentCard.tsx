import { StyleSheet, Pressable, View } from "react-native";
import { ListItem, Text, Icon } from "@rneui/themed";

import { useLikeComment } from "api/mutations/useLikeComment";
import { Comment } from "api/types/Comment";
import { useAuth } from "context/AuthContext";

import Link from "./Link";

type Props = {
  comment: Comment;
  tweetId: string;
  navigation: any;
};

export default function CommentCard({ navigation, comment, tweetId }: Props) {
  const { likeComment } = useLikeComment(tweetId);
  const {
    currentUser: { currentUserId },
  } = useAuth();
  const { user } = comment;

  const isLiked = comment.likes.includes(currentUserId) ?? false;
  const likeCount = comment.likes.length ?? 0;

  return (
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
        <Text style={styles.content}>{comment.content}</Text>
        <View style={styles.reactions}>
          <Icon
            name={`favorite${isLiked ? "" : "-outline"}`}
            color={"pink"}
            onPress={() =>
              likeComment({ _id: comment._id, user: currentUserId, isLiked })
            }
          />
          <Text style={styles.likeCount}>{likeCount}</Text>
        </View>
      </ListItem.Content>
    </ListItem>
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
    marginRight: 16,
  },
});
