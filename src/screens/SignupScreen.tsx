import { useState } from "react";
import { View, Button } from "react-native";
import { Input, Text } from "@rneui/themed";

import { useAuth, useAuthDispatch, login, logout } from "context/AuthContext";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const state = useAuth();
  const dispatch = useAuthDispatch();

  return (
    <View>
      <Input placeholder="Username" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {state.errorMessage ? <Text>{state.errorMessage}</Text> : null}
      <Button
        title="Sign tf up"
        onPress={() => login(dispatch, { email, password }, true)}
      />
      <Button
        title="Already have an account? Sign in"
        onPress={() => navigation.navigate("Login")}
      />
      <Button title="Log OOT" onPress={() => logout(dispatch)} />
    </View>
  );
}
