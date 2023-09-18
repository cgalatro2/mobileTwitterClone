import { useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { Input } from "@rneui/themed";

import serverAPI from "api/serverAPI";
import { useAuth } from "context/AuthContext";

type Props = {
  close: () => void;
};

export default function WriteTweet({ close }: Props) {
  const [post, setPost] = useState("");

  const {
    user: { username },
  } = useAuth();

  const postTweet = async () => {
    try {
      await serverAPI.post("/tweets", { content: post, username });
      close();
    } catch (err) {
      console.log(`error posting tweet: ${err}`);
    }
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
