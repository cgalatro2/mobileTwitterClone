import { useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

import { useUser } from "api/queries/useUser";
import { useTweets } from "api/queries/useTweets";
import { useFollow } from "api/mutations/useFollow";
import { useUnfollow } from "api/mutations/useUnfollow";
import { useAuth } from "context/AuthContext";

import LoadingScreen from "./LoadingScreen";
import TweetCard from "components/TweetCard";
import Link from "components/Link";

export default function UserScreen({ route, navigation }) {
  const { username } = route.params;

  const authState = useAuth();
  const { username: currentUsername, _id: currentUserId } = authState.user;
  const { followUser } = useFollow();
  const { unfollowUser } = useUnfollow();

  useEffect(() => {
    navigation.setOptions({
      title: username,
    });
  }, []);

  const { data: user, isLoading: isLoadingUser } = useUser(username);
  const {
    data: tweets,
    isLoading: isLoadingTweets,
    refetch: refetchTweets,
  } = useTweets(username);

  const isLoading = isLoadingUser || isLoadingTweets;
  if (!user || isLoading) {
    return <LoadingScreen />;
  }

  const renderItem = ({ item }) => (
    <TweetCard {...item} navigation={navigation} />
  );

  const { followers, following } = user;
  const isFollowing = followers.includes(currentUserId);

  const onPressFollow = () => {
    if (isFollowing) {
      unfollowUser({
        unfollowingUsername: currentUsername,
        usernameToUnfollow: username,
      });
    } else {
      followUser({
        followingUsername: currentUsername,
        usernameToFollow: username,
      });
    }
  };

  return (
    <View>
      <View style={styles.followRow}>
        <View style={styles.network}>
          <Link
            text={`${followers.length} followers`}
            onPress={() => navigation.navigate("Followers", { username })}
            style={{ marginHorizontal: 11 }}
          />
          <Link
            text={`${following.length} following`}
            onPress={() => navigation.navigate("Following", { username })}
          />
        </View>
        {currentUsername !== username ? (
          <Button
            title={isFollowing ? "Unfollow" : "Follow"}
            onPress={onPressFollow}
          />
        ) : null}
      </View>
      <FlatList
        refreshing={isLoading}
        onRefresh={refetchTweets}
        keyExtractor={(item) => item._id}
        data={tweets}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  followRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  network: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
});
