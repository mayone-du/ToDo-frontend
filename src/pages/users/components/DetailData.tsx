import { useReactiveVar } from "@apollo/client";
import { userInfoVar } from "src/graphql/apollo/cache";
import type { GetUserQuery } from "src/graphql/schemas/schema";

export const DetailData: React.VFC<GetUserQuery | undefined> = (props) => {
  const userInfo = useReactiveVar(userInfoVar);
  return (
    <div>
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
        <button className="block p-2 mx-auto rounded border">
          {props?.user?.followingUsers.edges
            .map((user) => {
              return user?.node?.relatedUser.id === userInfo.userId;
            })
            .includes(true)
            ? "フォローを外す"
            : "フォローする"}
        </button>
      </div>
    </div>
  );
};
