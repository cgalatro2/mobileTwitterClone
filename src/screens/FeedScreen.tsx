import { Button, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { BottomSheet } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import serverAPI from "api/serverAPI";

import Write from "components/WriteTweet";
import Tweet from "components/Tweet";

export default function FeedScreen({ navigation }) {
  const [tweets, setTweets] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const insets = useSafeAreaInsets();

  const getTweets = async () => {
    setIsFetching(true);
    const response = await serverAPI.get("/tweets");
    setIsFetching(false);
    setTweets(response.data);
  };

  useEffect(() => {
    getTweets();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title={"Write"} onPress={() => setIsWriting(true)} />
      ),
    });
  }, [navigation]);

  const renderItem = ({ item: { content, username } }) => (
    <Tweet content={content} username={username} navigation={navigation} />
  );

  const closeModal = () => setIsWriting(false);

  return (
    <SafeAreaView>
      <FlatList
        refreshing={isFetching}
        onRefresh={getTweets}
        keyExtractor={(item) => item._id}
        data={tweets}
        renderItem={renderItem}
      />
      <BottomSheet
        modalProps={{
          transparent: false,
          // presentationStyle: "formSheet",
          onRequestClose: closeModal, // see if rm'ing affects Android back button
        }}
        isVisible={isWriting}
        onBackdropPress={closeModal}
        containerStyle={{
          paddingBottom: insets.bottom,
          paddingTop: insets.top,
          ...styles.bottomSheetContainer,
        }}
      >
        <Write close={closeModal} />
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
});
