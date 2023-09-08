import { useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { Input } from "@rneui/themed";

import serverAPI from "api/serverAPI";

type Props = {
  close: () => void;
  refetchTweets: () => void;
};

export default function WriteTweet({ close, refetchTweets }: Props) {
  const [post, setPost] = useState("");

  const postTweet = () => {
    serverAPI
      .post("/tweets", { content: post })
      .then(() => {
        close();
        refetchTweets();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <View style={styles.header}>
        <Button title="Close" onPress={close} />
        <Button title="Post" onPress={postTweet} />
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
