import { useQuery } from "react-query";

import { instance } from "api/serverAPI";
import { User } from "api/types/User";

export const useFollowers = (username: string) => {
  return useQuery<User[]>(["users", username, "followers"], async () => {
    const response = await instance.get(`/users/${username}/followers`);
    return response.data;
  });
};
