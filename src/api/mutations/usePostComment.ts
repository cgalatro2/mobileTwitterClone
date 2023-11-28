import { useMutation, useQueryClient } from "react-query";

import serverAPI from "api/serverAPI";
import { Tweet } from "api/types/Tweet";

type PostCommentRequest = {
  content: string;
  user: string;
  tweetId: string;
};

const mutationFn = async ({ content, user, tweetId }) => {
  const { status, data } = await serverAPI.post(`/tweets/${tweetId}/comment`, {
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
      onSuccess: async (newTweet: Tweet) => {
        if (tweetId) {
          // if we're commenting on the TweetScreen, we need to update just that tweet
          const queryKey = ["tweet", `${tweetId}`];
          // Cancel any outgoing refetches
          // (so they don't overwrite our optimistic update)
          await queryClient.cancelQueries({ queryKey });

          // Snapshot the previous value
          const previousTweets = queryClient.getQueryData<Tweet>(queryKey);

          // Optimistically update to the new value
          queryClient.setQueryData<Tweet>(queryKey, (_old) => newTweet);

          // Return a context object with the snapshotted value
          return { previousTweets };
        } else {
          const queryKey = ["tweets"];
          // Cancel any outgoing refetches
          // (so they don't overwrite our optimistic update)
          await queryClient.cancelQueries({ queryKey });

          // Snapshot the previous value
          const previousTweets = queryClient.getQueryData<Tweet[]>(queryKey);

          // Optimistically update to the new value
          queryClient.setQueryData<Tweet[]>(queryKey, (old) => [
            ...old,
            newTweet,
          ]);

          // Return a context object with the snapshotted value
          return { previousTweets };
        }
      },
      onError: (error) => console.log(`Error when posting tweet: ${error}`),
    }
  );

  return { postComment };
};
