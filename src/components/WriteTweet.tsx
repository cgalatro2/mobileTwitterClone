import { useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { Input } from "@rneui/themed";

import { usePostTweet } from "api/mutations/usePostTweet";
import { useAuth } from "context/AuthContext";

type Props = {
  close: () => void;
};

export default function WriteTweet({ close }: Props) {
  const [post, setPost] = useState("");

  const {
    user: { username },
  } = useAuth();

  const { postTweet } = usePostTweet();
  const postTweetAndClose = () => {
    postTweet({ content: post, username });
    close();
  };

  return (
    <View>
      <View style={styles.header}>
        <Button title="Close" onPress={close} />
        <Button title="Post" onPress={postTweetAndClose} />
      </View>
      <Input
        value={post}
        onChangeText={setPost}
        placeholder="What's happening?"
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
});
