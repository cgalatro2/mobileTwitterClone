import { useQuery } from "react-query";

import serverAPI from "api/serverAPI";
import { User } from "api/types/User";

export const useFollowing = (username: string) => {
  return useQuery<User[]>(["users", username, "following"], async () => {
    const response = await serverAPI.get(`/users/${username}/following`);
    return response.data;
  });
};
