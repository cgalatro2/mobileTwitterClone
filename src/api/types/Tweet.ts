import { User } from "./User";

export type Tweet = {
  _id: string;
  content: string;
  user: User;
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
};
