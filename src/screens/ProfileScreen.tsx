import { Button } from "react-native";
import { Text } from "@rneui/themed";

import { useAuthDispatch, useAuth, logout } from "context/AuthContext";

export default function ProfileScreen() {
  const dispatch = useAuthDispatch();
  const {
    user: { username },
  } = useAuth();

  return (
    <>
      <Text>{`Currently logged in as ${username}`}</Text>
      <Button title="Logout" onPress={() => logout(dispatch)} />
    </>
  );
}
