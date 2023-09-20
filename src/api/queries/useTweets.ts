import { useQuery } from "react-query";

import serverAPI from "api/serverAPI";
import { Tweet } from "api/types/Tweet";

export const useTweets = () => {
  return useQuery<Tweet[]>(["tweets"], async () => {
    const response = await serverAPI.get("/tweets");
    return response.data;
  });
};
