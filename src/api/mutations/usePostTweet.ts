import { useMutation, useQueryClient } from "react-query";

import { instance } from "api/serverAPI";
import { Tweet } from "api/types/Tweet";

type PostTweetRequest = {
  content: string;
  user: string;
};

const mutationFn = async ({ content, user }: PostTweetRequest) => {
  const { status, data } = await instance.post("/tweets", {
    content,
    user,
  });
  if (status !== 200) {
    throw new Error(data);
  }
  return data;
};

export const usePostTweet = () => {
  const queryClient = useQueryClient();
  const { mutate: postTweet } = useMutation<Tweet, any, PostTweetRequest>(
    ["tweets"],
    mutationFn,
    {
      onSuccess: () => queryClient.refetchQueries({ queryKey: ["tweets"] }),
      onError: (error) => console.log(`Error when posting tweet: ${error}`),
    }
  );

  return { postTweet };
};
