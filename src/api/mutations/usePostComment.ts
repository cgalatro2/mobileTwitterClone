import { useMutation, useQueryClient } from "react-query";

import { instance } from "api/serverAPI";
import { Tweet } from "api/types/Tweet";

type PostCommentRequest = {
  content: string;
  user: string;
  tweetId: string;
};

const mutationFn = async ({ content, user, tweetId }) => {
  const { status, data } = await instance.post(`/tweets/${tweetId}/comment`, {
    content: content,
    user,
  });
  if (status !== 200) {
    throw new Error(data);
  }
  return data;
};

export const usePostComment = (tweetId?: string) => {
  const queryClient = useQueryClient();
  const { mutate: postComment } = useMutation<Tweet, any, PostCommentRequest>(
    ["tweets", "comment"],
    mutationFn,
    {
      onSuccess: () =>
        tweetId
          ? queryClient.refetchQueries<Tweet>({
              queryKey: ["tweet", `${tweetId}`],
            })
          : queryClient.refetchQueries<Tweet>({ queryKey: ["tweets"] }),
      onError: (error) => console.log(`Error when posting tweet: ${error}`),
    }
  );

  return { postComment };
};
