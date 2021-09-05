import { useReactiveVar } from "@apollo/client";
import { userInfoVar } from "src/graphql/apollo/cache";

// TODO: 各ページで呼び出し、ログイン情報を取得中の場合は単一のコンポーネントを返す。非ログイン時の場合なども出来るとなおよし。
export const useAuthLoading = () => {
  const userInfo = useReactiveVar(userInfoVar);

  // ログイン情報の取得中
  if (userInfo.isLoading) {
    return <div className="py-8 text-8xl text-center bg-red-600">ユーザー情報を取得中です</div>;
  }

  return { userInfo };
};
