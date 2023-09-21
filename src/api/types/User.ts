export type User = {
  _id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  followers: string[];
  following: string[];
};
