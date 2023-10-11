import { useQuery } from "react-query";

import serverAPI from "api/serverAPI";
import { User } from "api/types/User";

export const useLikes = (_id: string) => {
  return useQuery<User[]>(["tweets", "likes"], async () => {
    const response = await serverAPI.get(`/tweets/likes/${_id}`);
    return response.data;
  });
};
