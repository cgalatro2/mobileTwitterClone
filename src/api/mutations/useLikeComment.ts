import { useMutation, useQueryClient } from "react-query";

import { instance } from "api/serverAPI";
import { Comment } from "api/types/Comment";

type LikeCommentRequest = {
  _id: string;
  user: string;
  isLiked: boolean;
};

const mutationFn = async ({ _id, user, isLiked }) => {
  const { status, data } = await instance.post(
    `/comments/${_id}/${isLiked ? "unlike" : "like"}`,
    {
      user,
    }
  );
  if (status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export const useLikeComment = (tweetId: string) => {
  const queryClient = useQueryClient();
  const { mutate: likeComment } = useMutation<Comment, any, LikeCommentRequest>(
    ["comments", "like"],
    mutationFn,
    {
      onSuccess: () => {
        queryClient.refetchQueries(["tweet", `${tweetId}`]);
      },
      onError: (error) => {
        console.log(error.message);
      },
    }
  );

  return { likeComment };
};
