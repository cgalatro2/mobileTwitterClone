import { useQuery } from "react-query";

import serverAPI from "api/serverAPI";
import { User } from "api/types/User";

export const useUser = (username: string) => {
  return useQuery<User>(["user"], async () => {
    const response = await serverAPI.get(`/users/${username}`);
    return response.data.user;
  });
};
