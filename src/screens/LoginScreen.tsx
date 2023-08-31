import { useState } from "react";
import { View, Button } from "react-native";
import { Input } from "@rneui/themed";

import { useAuthDispatch } from "context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAuthDispatch();

  return (
    <View>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => dispatch({ type: "LOGIN" })} />
      <Button
        title="Already have an account? Sign in"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}
