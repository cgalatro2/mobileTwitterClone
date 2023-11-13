import { useQuery } from "react-query";

import serverAPI from "api/serverAPI";
import { Tweet } from "api/types/Tweet";

export const useTweets = (user?: string) => {
  let key = user ? ["tweets", user] : ["tweets"];
  return useQuery<Tweet[]>(key, async () => {
    const response = await serverAPI.get(`/tweets${user ? `/${user}` : ""}`);
    return response.data;
  });
};
