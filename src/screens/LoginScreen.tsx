import { useEffect, useState } from "react";
import { View, Button } from "react-native";
import { Input } from "@rneui/themed";

import { useAuthDispatch, login, tryLocalLogin } from "context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAuthDispatch();

  useEffect(() => {
    tryLocalLogin(dispatch);
  }, []);

  return (
    <View>
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
        autoCapitalize="none"
        secureTextEntry
      />
      <Button
        title="Sign in"
        onPress={() => login(dispatch, { email, password })}
      />
      <Button
        title="Don't have an account? Sign up"
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
}
