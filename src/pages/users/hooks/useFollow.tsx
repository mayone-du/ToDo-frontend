import { useUpdateFollowMutation } from "src/graphql/schemas/schema";

export const useFollow = () => {
  const [mutation, { data, loading: isFollowLoading, error }] = useUpdateFollowMutation();

  // TODO: ユーザーがログインしているかの判定？
  const handleFollow = async (profileId: string, followingUsers: string[] | null) => {
    await mutation({
      variables: {
        id: profileId,
        followingUsers: followingUsers,
      },
    });
    return;
  };
  return { handleFollow, isFollowLoading };
};
