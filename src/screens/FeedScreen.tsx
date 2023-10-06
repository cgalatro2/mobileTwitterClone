import { Button, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { BottomSheet } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTweets } from "api/queries/useTweets";

import Write from "components/WriteTweet";
import TweetCard from "components/TweetCard";
import LoadingScreen from "./LoadingScreen";

export default function FeedScreen({ navigation }) {
  const [isWriting, setIsWriting] = useState(false);

  const { data: tweets, isLoading, refetch } = useTweets();

  const insets = useSafeAreaInsets();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title={"Write"} onPress={() => setIsWriting(true)} />
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TweetCard tweet={{ ...item }} navigation={navigation} />
  );

  const closeModal = () => setIsWriting(false);

  if (isLoading || !tweets) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView>
      <FlatList
        refreshing={isLoading}
        onRefresh={refetch}
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
