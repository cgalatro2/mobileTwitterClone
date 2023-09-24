import { StyleSheet } from "react-native";
import { Text } from "@rneui/themed";

type Props = {
  text: string;
  onPress: () => void;
  style?: any;
};

export default function Link({ text, onPress, style }: Props) {
  return (
    <Text style={{ ...styles.link, ...style }} onPress={onPress}>
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
