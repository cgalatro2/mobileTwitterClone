import { Tweet } from "./Tweet";
import { User } from "./User";

export type Comment = {
  _id: string;
  content: string;
  user: User;
  tweet: Tweet;
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
};
