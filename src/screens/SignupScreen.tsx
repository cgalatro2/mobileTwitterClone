import { useContext, useState } from "react";
import { View, Button } from "react-native";
import { Input } from "@rneui/themed";

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const { signIn } = useContext(AuthContext);

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
      {/* <Button title="Sign in" onPress={() => signIn({ username, password })} /> */}
    </View>
  );
}
