import { useReactiveVar } from "@apollo/client";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { userInfoVar } from "src/graphql/apollo/cache";

// TODO: 各ページで呼び出して、ログイン状態を判別したい
export const useValidateAuth = () => {
  const [session, isSessionLoading] = useSession();
  const userInfo = useReactiveVar(userInfoVar);

  useEffect(() => {
    if (userInfo.idToken !== "" && session && !isSessionLoading) {
      console.log("lazyQuery called:", userInfo);
    } else {
      console.log("lazyQuery not call:", userInfo);
    }
  }, [userInfo]);

  return {
    isLogin: false,
  };
};
