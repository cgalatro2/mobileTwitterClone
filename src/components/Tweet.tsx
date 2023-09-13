import { ListItem } from "@rneui/themed";

type Props = {
  content: string;
  userId: string;
};

export default function Tweet({ content, userId }: Props) {
  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{content}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}
