import { useEffect } from "react";
import { FlatList, StyleSheet, Pressable } from "react-native";
import { Button, ListItem, Text } from "@rneui/themed";

import { useLikes } from "api/queries/useLikes";
import { useUser } from "api/queries/useUser";
import { useAuth } from "context/AuthContext";
import { useFollow } from "api/mutations/useFollow";
import { useUnfollow } from "api/mutations/useUnfollow";

type Props = {
  navigation: any;
  route: { params: { _id: string } };
};

export default function LikesScreen({ navigation, route }: Props) {
  const { _id } = route.params;
  const { data: likers } = useLikes(_id);

  const {
    currentUser: { currentUsername },
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

  return <FlatList data={likers} renderItem={renderItem} />;
}

const styles = StyleSheet.create({
  liker: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
