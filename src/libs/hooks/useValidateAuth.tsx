import { useReactiveVar } from "@apollo/client";
import { userInfoVar } from "src/graphql/apollo/cache";

// TODO: 各ページで呼び出して、ログイン状態を判別したい
export const useValidateAuth = () => {
  const userInfo = useReactiveVar(userInfoVar);

  // ログイン情報の取得中
  if (userInfo.isLoading) {
    return <div className="bg-red-600">Loading...</div>;
  }

  return { userInfo };
};
