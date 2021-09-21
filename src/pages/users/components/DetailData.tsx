import { useReactiveVar } from "@apollo/client";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { userInfoVar } from "src/graphql/apollo/cache";
import type { GetUserQuery } from "src/graphql/schemas/schema";
import { useGetUserLazyQuery } from "src/graphql/schemas/schema";
import { useAuthModal } from "src/libs/hooks/useAuthModal";
import { useFollow } from "src/pages/users/hooks/useFollow";

export const DetailData: React.VFC<GetUserQuery | undefined> = (props) => {
  const userInfo = useReactiveVar(userInfoVar);
  const { handleFollow, isFollowLoading } = useFollow();
  const { handleOpenModal, renderModal } = useAuthModal();
  const [query, { data: myUserData }] = useGetUserLazyQuery({ variables: { id: userInfo.userId } });

  useEffect(() => {
    userInfo.isLogin && query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  // 自分が対象のユーザー（現在のページのユーザー）をフォローしているかどうか
  const isFollowing =
    props?.user?.followingUsers.edges
      .map((user) => {
        return user?.node?.relatedUser.id === userInfo.userId;
      })
      .includes(true) ?? false;

  // フォローするボタンを押した時
  const handleClickFollow = useCallback(async () => {
    if (!userInfo.isLogin) {
      return handleOpenModal();
    }

    // 自分がフォローしているユーザーを取得し、ユーザーのIDを配列にセットして更新
    const followingUserIds: string[] = [];
    myUserData?.user?.relatedUser?.followingUsers.edges.forEach((user) => {
      user?.node?.id && followingUserIds.push(user.node.id);
    }) ?? [];
    followingUserIds.push(props?.user?.id ?? "");

    await handleFollow(userInfo.profileId, followingUserIds);
    toast.success("フォローしました");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // フォローを外すボタンを押した時
  const handleClickUnFollow = useCallback(async () => {
    toast.success("フォローを外しました");
    return;
  }, []);

  return (
    <div>
      {renderModal()}
      <h2>自分以外のユーザー</h2>
      <p>{props?.user?.email}</p>
      <p>{props?.user?.username}</p>
      <p>{props?.user?.id}</p>
      <p>プロフィールネーム: {props?.user?.relatedUser?.profileName}</p>
      <p>自己紹介: {props?.user?.relatedUser?.selfIntroduction}</p>

      <div>
        <h2 className="py-4 text-3xl font-bold text-center">フォローしているユーザー</h2>
        <p>フォロー数：{props?.user?.relatedUser?.followingUsersCount?.toString()}</p>
        <ul className="border border-red-400">
          {props?.user?.relatedUser?.followingUsers.edges.map((user, index) => {
            return (
              <li className="border-b" key={index.toString()}>
                {user?.node?.id}
                <br />
                {user?.node?.email}
              </li>
            );
          })}
        </ul>

        <h2 className="py-4 text-3xl font-bold text-center">フォローされているユーザー</h2>
        <p>フォロワー数：{props?.user?.relatedUser?.followedUsersCount?.toString()}</p>
        <ul className="border border-blue-400">
          {props?.user?.followingUsers.edges.map((user, index) => {
            return (
              <li className="border-b" key={index.toString()}>
                {user?.node?.profileName}
                <br />
                {user?.node?.relatedUser.email}
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        {/* このページのユーザーが、自分のことをフォローしているか */}
        <p>
          {props?.user?.relatedUser?.followingUsers.edges
            .map((user) => {
              return user?.node?.id === userInfo.userId;
            })
            .includes(true)
            ? "フォローされている"
            : "フォローされていない"}
        </p>

        {/* このページのユーザーのことを、フォローしているユーザーの中に自分が含まれるか */}
        {/* このページのユーザーのことを、自分がフォローしているか */}
        {isFollowing ? (
          <button
            onClick={handleClickUnFollow}
            disabled={isFollowLoading}
            className="block p-2 mx-auto rounded border"
          >
            フォローを外す
          </button>
        ) : (
          <button
            onClick={handleClickFollow}
            disabled={isFollowLoading}
            className="block p-2 mx-auto rounded border"
          >
            フォローする
          </button>
        )}
      </div>
    </div>
  );
};
