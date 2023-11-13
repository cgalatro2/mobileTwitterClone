import { useMutation, useQueryClient } from "react-query";

import serverAPI from "api/serverAPI";
import { Tweet } from "api/types/Tweet";

type PostCommentRequest = {
  content: string;
  user: string;
  tweetId: string;
};

const mutationFn = async ({ content, user, tweetId }) => {
  console.log("content", content);
  const { status, data } = await serverAPI.post(`/tweets/${tweetId}/comment`, {
    content: content,
    user,
  });
  if (status !== 200) {
    throw new Error(data);
  }
  return data;
};

export const usePostComment = () => {
  const queryClient = useQueryClient();
  const { mutate: postComment } = useMutation<Tweet, any, PostCommentRequest>(
    ["tweets", "comment"],
    mutationFn
    // {
    //   onMutate: async (newTweet: Tweet) => {
    //     // Cancel any outgoing refetches
    //     // (so they don't overwrite our optimistic update)
    //     await queryClient.cancelQueries({ queryKey: ["tweets"] });

    //     // Snapshot the previous value
    //     const previousTweets = queryClient.getQueryData<Tweet[]>(["tweets"]);

    //     // Optimistically update to the new value
    //     queryClient.setQueryData<Tweet[]>(["tweets"], (old) => [
    //       ...old,
    //       newTweet,
    //     ]);

    //     // Return a context object with the snapshotted value
    //     return { previousTweets };
    //   },
    //   onError: (error) => console.log(`Error when posting tweet: ${error}`),
    // }
  );

  return { postComment };
};
