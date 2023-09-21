import { useQuery } from "react-query";

import serverAPI from "api/serverAPI";
import { Tweet } from "api/types/Tweet";

export const useTweets = (username?: string) => {
  let key = username ? ["tweets", username] : ["tweets"];
  return useQuery<Tweet[]>(key, async () => {
    const response = await serverAPI.get(
      `/tweets${username ? `/${username}` : ""}`
    );
    return response.data;
  });
};
