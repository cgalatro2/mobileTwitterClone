import { useEffect, useState } from "react";
import { View, Button } from "react-native";
import { Input } from "@rneui/themed";

import { useAuthDispatch, login, tryLocalLogin } from "context/AuthContext";
import LoadingScreen from "./LoadingScreen";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTryingLogin, setIsTryingLogin] = useState(false);

  const dispatch = useAuthDispatch();

  const tryLogin = async () => {
    setIsTryingLogin(true);
    await tryLocalLogin(dispatch);
    setIsTryingLogin(false);
  };

  useEffect(() => {
    tryLogin();
  }, []);

  return (
    <>
      {isTryingLogin ? (
        <LoadingScreen />
      ) : (
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
      )}
    </>
  );
}
