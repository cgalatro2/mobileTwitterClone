import { useQuery } from "react-query";

import { instance } from "api/serverAPI";
import { User } from "api/types/User";

export const useFollowing = (username: string) => {
  return useQuery<User[]>(["users", username, "following"], async () => {
    const response = await instance.get(`/users/${username}/following`);
    return response.data;
  });
};
