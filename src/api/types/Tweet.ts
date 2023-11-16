import { Comment } from "./Comment";
import { User } from "./User";

export type Tweet = {
  _id: string;
  content: string;
  user: User;
  likes: string[];
  comments: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type PopulatedTweet = Omit<Tweet, "comments"> & { comments: Comment[] };
