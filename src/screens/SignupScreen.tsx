import { useState } from "react";
import { View, Button } from "react-native";
import { Input } from "@rneui/themed";
import { useAuth } from "context/AuthContext";

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn } = useAuth();

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
      <Button
        title="Already have an account? Sign in"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}
