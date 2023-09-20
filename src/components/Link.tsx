import { StyleSheet } from "react-native";
import { Text } from "@rneui/themed";

type Props = {
  text: string;
  onPress: () => void;
};

export default function Link({ text, onPress }: Props) {
  return (
    <Text style={styles.link} onPress={onPress}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  link: {
    color: "blue",
  },
  user: {
    marginBottom: 5,
  },
});
