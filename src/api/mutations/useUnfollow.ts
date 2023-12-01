import { useMutation, useQueryClient } from "react-query";

import { instance } from "api/serverAPI";

type FollowRequest = {
  unfollowingUsername: string;
  usernameToUnfollow: string;
};

const mutationFn = async ({
  unfollowingUsername,
  usernameToUnfollow,
}: FollowRequest) => {
  const { status, data } = await instance.post(
    `/unfollow/${usernameToUnfollow}`,
    {
      unfollowingUsername,
    }
  );
  if (status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export const useUnfollow = () => {
  const queryClient = useQueryClient();
  // TODO type useMutation
  const { mutate: unfollowUser } = useMutation(["follow"], mutationFn, {
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["user"] });
    },
  });

  return { unfollowUser };
};
