import { StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { TextProps } from "@rneui/base";

type Props = {
  text: string;
  onPress: () => void;
  style?: any;
} & TextProps;

export default function Link({ text, onPress, style, ...rest }: Props) {
  return (
    <Text style={{ ...styles.link, ...style }} onPress={onPress} {...rest}>
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
