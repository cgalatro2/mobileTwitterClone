import { View, StyleSheet } from "react-native";
import { Dialog } from "@rneui/themed";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Dialog.Loading loadingProps={{ size: "large" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
