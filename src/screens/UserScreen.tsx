import { useEffect } from "react";
import { FlatList } from "react-native";

import { useUser } from "api/queries/useUser";
import LoadingScreen from "./LoadingScreen";
import { useTweets } from "api/queries/useTweets";
import Tweet from "components/Tweet";

export default function UserScreen({ route, navigation }) {
  const { username } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: username,
    });
  }, []);

  const { data: user, isLoading: isLoadingUser } = useUser(username);
  const {
    data: tweets,
    isLoading: isLoadingTweets,
    refetch,
  } = useTweets(username);

  const isLoading = isLoadingUser || isLoadingTweets;
  if (!user || isLoading) {
    return <LoadingScreen />;
  }

  const renderItem = ({ item }) => {
    const { content, username } = item;
    return (
      <Tweet content={content} username={username} navigation={navigation} />
    );
  };

  return (
    <FlatList
      refreshing={isLoading}
      onRefresh={refetch}
      keyExtractor={(item) => item._id}
      data={tweets}
      renderItem={renderItem}
    />
  );
}
