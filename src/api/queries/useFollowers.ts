import { useQuery } from "react-query";

import serverAPI from "api/serverAPI";
import { User } from "api/types/User";

export const useFollowers = (username: string) => {
  return useQuery<User[]>(["users", username, "followers"], async () => {
    const response = await serverAPI.get(`/users/${username}/followers`);
    return response.data;
  });
};
