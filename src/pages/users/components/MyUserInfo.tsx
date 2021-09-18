import { ThemeChanger } from "src/components/ThemeChanger";
import type { GetUserQuery } from "src/graphql/schemas/schema";
import { useGetUserQuery } from "src/graphql/schemas/schema";
import { ProfileForm } from "src/pages/users/components/ProfileForm";

// 自分のユーザー情報の場合は、クライアント側でデータフェッチを行う
export const MyUserInfo: React.VFC<GetUserQuery | undefined> = (props) => {
  const {
    data,
    loading: isLoading,
    error,
  } = useGetUserQuery({
    variables: {
      id: props?.user?.id ?? "",
    },
  });

  return (
    <div>
      <h1 className="text-3xl text-center">自分のプロフィール</h1>
      <p>username: {props?.user?.username}</p>
      <p>fistName: {props?.user?.firstName}</p>
      <p>lastName: {props?.user?.lastName}</p>
      <p>自己紹介: {props?.user?.relatedUser?.selfIntroduction}</p>
      <div>
        <ThemeChanger />
      </div>
      <div className="bg-gray-100">
        <h2 className="text-3xl font-bold text-center">Profile</h2>
        {/* プロフィールのみクライアントサイドから取得 */}
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error</div>
        ) : (
          <div>
            <div>
              {data?.user?.relatedUser?.id ?? (
                <div>
                  <h3 className="text-2xl text-center">プロフィールを作成</h3>
                  <ProfileForm id={props?.user?.id ?? ""} />
                </div>
              )}
            </div>
            <div>{data?.user?.relatedUser?.profileName}</div>
            <div>{data?.user?.relatedUser?.selfIntroduction}</div>
            <div>{data?.user?.relatedUser?.websiteUrl}</div>
          </div>
        )}
      </div>
    </div>
  );
};
