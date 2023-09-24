import { useMutation } from "react-query";

import serverAPI from "api/serverAPI";

type FollowRequest = {
  followingUsername: string;
  usernameToFollow: string;
};

const mutationFn = async ({
  followingUsername,
  usernameToFollow,
}: FollowRequest) => {
  const { status, data } = await serverAPI.post(`/follow/${usernameToFollow}`, {
    followingUsername,
  });
  if (status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export const useFollow = () => {
  const { mutate: followUser } = useMutation(["follow"], mutationFn);

  return { followUser };
};
