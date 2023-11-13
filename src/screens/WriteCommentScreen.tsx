import { useEffect, useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { Text, Input, Divider } from "@rneui/themed";

import { usePostComment } from "api/mutations/usePostComment";
import { useAuth } from "context/AuthContext";
import { Tweet } from "api/types/Tweet";

type Props = {
  navigation: any;
  route: { params: { tweet: Tweet } };
};

export default function WriteComment({ navigation, route }: Props) {
  const {
    tweet: {
      content: tweetContent,
      user: { username: tweetUsername },
      timestamp,
      _id: tweetId,
    },
  } = route.params;

  const [content, setContent] = useState("");

  const { postComment } = usePostComment();

  const {
    user: { _id: userId },
  } = useAuth();

  const postCommentAndClose = () => {
    postComment({ content, user: userId, tweetId });
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title={"Post"} onPress={postCommentAndClose} />
      ),
    });
  }, [navigation, content]);

  return (
    <View>
      <View style={styles.tweet}>
        <Text h4 style={styles.tweetUsername}>
          {tweetUsername}
        </Text>
        <Text>{tweetContent}</Text>
        <Divider style={styles.divider} />
      </View>
      <Input
        value={content}
        onChangeText={setContent}
        placeholder="Post your reply"
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tweet: {
    margin: 10,
  },
  tweetUsername: {
    marginBottom: 4,
  },
  divider: {
    marginVertical: 6,
  },
});
