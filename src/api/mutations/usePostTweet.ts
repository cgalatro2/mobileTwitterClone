import { useMutation, useQueryClient } from "react-query";

import serverAPI from "api/serverAPI";
import { Tweet } from "api/types/Tweet";

type UpdateTweetRequest = {
  content: string;
  username: string;
};

const mutationFn = async ({ content, username }) => {
  const { status, data } = await serverAPI.post("/tweets", {
    content,
    username,
  });
  if (status === 418 || status === 422) {
    throw new Error(data.message);
  }
  return data;
};

export const usePostTweet = () => {
  const queryClient = useQueryClient();
  const { mutate: postTweet } = useMutation<Tweet, any, UpdateTweetRequest>(
    ["tweets"],
    mutationFn,
    {
      onMutate: async (newTweet: Tweet) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({ queryKey: ["tweets"] });

        // Snapshot the previous value
        const previousTweets = queryClient.getQueryData<Tweet[]>(["tweets"]);

        // Optimistically update to the new value
        queryClient.setQueryData<Tweet[]>(["tweets"], (old) => [
          ...old,
          newTweet,
        ]);

        // Return a context object with the snapshotted value
        return { previousTweets };
      },
      onError: (error) => console.log(`Error when posting tweet: ${error}`),
    }
  );

  return { postTweet };
};
