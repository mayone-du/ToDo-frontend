import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { userInfoVar } from "src/graphql/apollo/cache";
import { useUpdateFollowMutation } from "src/graphql/schemas/schema";
import { useGetUserLazyQuery } from "src/graphql/schemas/schema";
import { useAuthModal } from "src/libs/hooks/useAuthModal";

export const useFollow = () => {
  const userInfo = useReactiveVar(userInfoVar);
  const [query, { data: myUserData }] = useGetUserLazyQuery({ variables: { id: userInfo.userId } });
  const [mutation, { loading: isFollowLoading, error }] = useUpdateFollowMutation();
  const { handleOpenModal } = useAuthModal();

  useEffect(() => {
    userInfo.isLogin && query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  // TODO: ユーザーがログインしているかの判定？
  const handleFollow = async (targetUserId: string) => {
    if (!userInfo.isLogin) {
      return handleOpenModal();
    }
    const toastId = toast.loading("ローディング");
    try {
      // 自分がフォローしているユーザーを取得し、ユーザーのIDを配列にセットして更新
      const followingUserIds: string[] = [];
      myUserData?.user?.relatedUser?.followingUsers.edges.forEach((user) => {
        user?.node?.id && followingUserIds.push(user.node.id);
      }) ?? [];
      followingUserIds.push(targetUserId);

      const { errors } = await mutation({
        variables: {
          id: userInfo.profileId,
          followingUsers: followingUserIds,
        },
      });
      if (error || errors) {
        throw error || errors;
      }
      toast.success("フォローしました", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("エラーが発生しました", { id: toastId });
    }
  };
  return { handleFollow, isFollowLoading };
};
