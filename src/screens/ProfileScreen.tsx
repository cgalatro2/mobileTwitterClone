import { Button } from "react-native";

import { useAuthDispatch, logout } from "context/AuthContext";

export default function ProfileScreen() {
  const dispatch = useAuthDispatch();

  return <Button title="Logout" onPress={() => logout(dispatch)} />;
}
