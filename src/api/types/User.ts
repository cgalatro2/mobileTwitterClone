export type User = {
  _id: string;
  email: string;
  username: string;
  password: string;
  followers: string[];
  following: string[];
  createdAt: Date;
  updatedAt: Date;
};
