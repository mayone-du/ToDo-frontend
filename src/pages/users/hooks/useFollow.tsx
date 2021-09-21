import { useUpdateFollowMutation } from "src/graphql/schemas/schema";

export const useFollow = () => {
  const [mutation, { data, loading: isLoading, error }] = useUpdateFollowMutation();

  // TODO: ユーザーがログインしているかの判定？
  const handleFollow = async () => {
    return;
  };
  return { handleFollow };
};
