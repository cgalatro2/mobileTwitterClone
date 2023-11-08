import { useEffect } from "react";
import { FlatList, StyleSheet, Pressable } from "react-native";
import { Button, ListItem, Text } from "@rneui/themed";

import { useFollowing } from "api/queries/useFollowing";
import { useUser } from "api/queries/useUser";
import { useAuth } from "context/AuthContext";
import { useFollow } from "api/mutations/useFollow";
import { useUnfollow } from "api/mutations/useUnfollow";

type Props = {
  navigation: any;
  route: { params: { username: string } };
};

export default function FollowingScreen({ navigation, route }: Props) {
  const { username } = route.params;
  const { data: followingData } = useFollowing(username);

  const {
    user: { username: currentUsername },
  } = useAuth();
  const { data: userData } = useUser(currentUsername);
  const following = userData?.following ?? [];

  const { followUser } = useFollow();
  const { unfollowUser } = useUnfollow();

  useEffect(() => {
    navigation.setOptions({
      title: "Liked by",
    });
  }, []);

  const renderItem = ({ item }) => {
    const isFollowing = following.includes(item._id);

    const onPressFollow = () => {
      if (isFollowing) {
        unfollowUser({
          unfollowingUsername: currentUsername,
          usernameToUnfollow: item.username,
        });
      } else {
        followUser({
          followingUsername: currentUsername,
          usernameToFollow: item.username,
        });
      }
    };

    return (
      <Pressable>
        <ListItem bottomDivider>
          <ListItem.Content style={styles.liker}>
            <ListItem.Title>
              <Text>{item.username}</Text>
            </ListItem.Title>
            {item.username !== currentUsername && (
              <Button
                title={isFollowing ? "Unfollow" : "Follow"}
                onPress={onPressFollow}
              />
            )}
          </ListItem.Content>
        </ListItem>
      </Pressable>
    );
  };

  return <FlatList data={followingData} renderItem={renderItem} />;
}

const styles = StyleSheet.create({
  liker: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
