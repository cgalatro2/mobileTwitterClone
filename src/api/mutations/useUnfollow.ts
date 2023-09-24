import { useMutation, useQueryClient } from "react-query";

import serverAPI from "api/serverAPI";

type FollowRequest = {
  unfollowingUsername: string;
  usernameToUnfollow: string;
};

const mutationFn = async ({
  unfollowingUsername,
  usernameToUnfollow,
}: FollowRequest) => {
  const { status, data } = await serverAPI.post(
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
  const { mutate: unfollowUser } = useMutation(["follow"], mutationFn, {
    onSuccess: () => {
      queryClient.refetchQueries(["user"]);
    },
  });

  return { unfollowUser };
};
