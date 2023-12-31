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

type Props = {
  navigation: any;
  route: { params: { userId: string; username: string } };
};

export default function UserScreen({ route, navigation }: Props) {
  const { userId, username } = route.params;

  const {
    currentUser: { currentUsername, currentUserId },
  } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      title: username,
    });
  }, []);

  const { followUser } = useFollow();
  const { unfollowUser } = useUnfollow();

  const { data: user, isLoading: isLoadingUser } = useUser(userId);
  const {
    data: tweets,
    isLoading: isLoadingTweets,
    refetch: refetchTweets,
  } = useTweets(userId);

  const isLoading = isLoadingUser || isLoadingTweets;
  if (!user || isLoading) {
    return <LoadingScreen />;
  }

  const renderItem = ({ item }) => (
    <TweetCard tweet={item} navigation={navigation} />
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
