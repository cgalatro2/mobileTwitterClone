import { useMutation, useQueryClient } from "react-query";

import serverAPI from "api/serverAPI";
import { Tweet } from "api/types/Tweet";

type LikeTweetRequest = {
  _id: string;
  user: string;
  isLiked: boolean;
};

const mutationFn = async ({ _id, user, isLiked = true }) => {
  const { status, data } = await serverAPI.post(
    `/tweets/${_id}/${isLiked ? "unlike" : "like"}`,
    {
      user,
    }
  );
  if (status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export const useLikeTweet = () => {
  const queryClient = useQueryClient();
  const { mutate: likeTweet } = useMutation<Tweet, any, LikeTweetRequest>(
    ["tweets", "like"],
    mutationFn,
    {
      onSuccess: () => {
        queryClient.refetchQueries(["tweets"]);
      },
      onError: (error) => {
        console.log(error.message);
      },
    }
  );

  return { likeTweet };
};
