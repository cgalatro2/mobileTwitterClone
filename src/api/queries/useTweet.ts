import { useQuery } from "react-query";

import serverAPI from "api/serverAPI";
import { PopulatedTweet } from "api/types/Tweet";

export const useTweet = (_id: string) =>
  useQuery<PopulatedTweet>(["tweet", `${_id}`], async () => {
    const response = await serverAPI.get(`/tweet/${_id}`);
    return response.data;
  });
