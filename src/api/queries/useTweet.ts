import { useQuery } from "react-query";

import { instance } from "api/serverAPI";
import { PopulatedTweet } from "api/types/Tweet";

export const useTweet = (tweetId: string) =>
  useQuery<PopulatedTweet>(["tweet", `${tweetId}`], async () => {
    const response = await instance.get(`/tweet/${tweetId}`);
    return response.data;
  });
