import { useQuery } from "react-query";

import { instance } from "api/serverAPI";
import { Tweet } from "api/types/Tweet";

export const useTweets = (user?: string) => {
  let key = user ? ["tweets", user] : ["tweets"];
  return useQuery<Tweet[]>(key, async () => {
    const response = await instance.get(`/tweets${user ? `/${user}` : ""}`);
    return response.data;
  });
};
