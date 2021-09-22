import { useReactiveVar } from "@apollo/client";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { userInfoVar } from "src/graphql/apollo/cache";
import { useUpdateFollowMutation } from "src/graphql/schemas/schema";
import { useGetUserLazyQuery } from "src/graphql/schemas/schema";
import { useAuthModal } from "src/libs/hooks/useAuthModal";

export const useFollow = () => {
  const userInfo = useReactiveVar(userInfoVar);
  const [query, { data: myUserData }] = useGetUserLazyQuery({ variables: { id: userInfo.userId } });
  const [mutation, { loading: isFollowsLoading, error }] = useUpdateFollowMutation();
  const { handleOpenModal } = useAuthModal();

  useEffect(() => {
    userInfo.isLogin && query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  // 自分が現在フォローしているユーザー
  const currentFollowingUsers =
    myUserData?.user?.relatedUser?.followingUsers.edges.map((user) => {
      return user?.node?.id;
    }) ?? [];

  // フォローをする処理
  const handleFollow = useCallback(async (targetUserId: string) => {
    if (!userInfo.isLogin) {
      return handleOpenModal();
    }
    const toastId = toast.loading("ローディング");
    try {
      // 自分がフォローしているユーザーを取得し、ユーザーのIDを配列にセットして更新
      const followingUserIds: string[] = currentFollowingUsers.filter(Boolean) as string[];
      // 自分が現在フォローしているユーザーのIDの配列
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // フォローを外す
  const handleUnFollow = useCallback(async (targetUserId: string) => {
    const toastId = toast.loading("ローディング");
    try {
      const followingUserIds: string[] = currentFollowingUsers.filter(Boolean) as string[];
      // 自分のユーザーIDを削除
      const deletedUserIds = followingUserIds.filter((userId) => {
        return userId !== targetUserId;
      });
      const { errors } = await mutation({
        variables: {
          id: userInfo.profileId,
          followingUsers: deletedUserIds,
        },
      });
      if (error || errors) {
        throw error || errors;
      }
      toast.success("フォローを外しました", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("エラーが発生しました", { id: toastId });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { handleFollow, handleUnFollow, isFollowsLoading };
};
