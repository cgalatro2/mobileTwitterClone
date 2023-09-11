import { Button, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { BottomSheet, ListItem, Avatar } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAuth } from "context/AuthContext";
import serverAPI from "api/serverAPI";

import Write from "screens/WriteTweet";

export default function HomeScreen({ navigation }) {
  const [tweets, setTweets] = useState([]);
  const [isWriting, setIsWriting] = useState(false);

  const insets = useSafeAreaInsets();

  const state = useAuth();

  const getTweets = async () => {
    const response = await serverAPI.get("/tweets");
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

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      {/* <Avatar source={{ uri: item.avatar_url }} /> */}
      <ListItem.Content>
        <ListItem.Title>{item.content}</ListItem.Title>
        {/* <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle> */}
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  const closeModal = () => setIsWriting(false);

  return (
    <SafeAreaView>
      <FlatList
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
        <Write refetchTweets={getTweets} close={closeModal} />
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
