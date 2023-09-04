import { Button, Text } from "react-native";

import { useAuthDispatch, logout } from "context/AuthContext";

export default function ProfileScreen() {
  const dispatch = useAuthDispatch();

  return (
    <>
      <Text>Profile screen babay</Text>
      <Button title="Logout" onPress={() => logout(dispatch)} />
    </>
  );
}
