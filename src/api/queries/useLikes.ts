import { useQuery } from "react-query";

import { instance } from "api/serverAPI";
import { User } from "api/types/User";

export const useLikes = (_id: string) => {
  return useQuery<User[]>(["tweets", "likes"], async () => {
    const response = await instance.get(`/tweets/likes/${_id}`);
    return response.data;
  });
};
