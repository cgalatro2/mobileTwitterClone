import { useQuery } from "react-query";

import { instance } from "api/serverAPI";
import { User } from "api/types/User";

export const useUser = (userId: string) => {
  return useQuery<User>(["user"], async () => {
    const response = await instance.get(`/users/${userId}`);
    return response.data.user;
  });
};
