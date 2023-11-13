import { useQuery } from "react-query";

import serverAPI from "api/serverAPI";
import { Comment } from "api/types/Comment";

export const useComments = (tweetId: string) =>
  useQuery<Comment[]>([`${tweetId}`, "comments"], async () => {
    const response = await serverAPI.get(`/tweets/${tweetId}/comments`);
    return response.data;
  });
