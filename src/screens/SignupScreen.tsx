import { useState } from "react";
import { View, Button } from "react-native";
import { Input, Text } from "@rneui/themed";

import { useAuth, useAuthDispatch, login, logout } from "context/AuthContext";

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const state = useAuth();
  const dispatch = useAuthDispatch();

  return (
    <View>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      {state.errorMessage ? <Text>{state.errorMessage}</Text> : null}
      <Button
        title="Sign tf up"
        onPress={() => login(dispatch, { username, email, password }, true)}
      />
      <Button
        title="Already have an account? Sign in"
        onPress={() => navigation.navigate("Login")}
      />
      <Button title="Log OOT" onPress={() => logout(dispatch)} />
    </View>
  );
}
