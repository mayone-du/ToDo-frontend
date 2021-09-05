import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { userInfoVar } from "src/graphql/apollo/cache";
import { useGetMyAllTasksLazyQuery } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";
import { Data } from "src/pages/tasks/components/Data";
import { Error } from "src/pages/tasks/components/Error";
import { Loading } from "src/pages/tasks/components/Loading";
import { NotAuth } from "src/pages/tasks/components/NotAuth";

const TasksIndexPage: CustomNextPage = () => {
  const [session, isSessionLoading] = useSession();
  const userInfo = useReactiveVar(userInfoVar);
  const [query, { data, loading: isLoading, error }] = useGetMyAllTasksLazyQuery();

  // マウント時にidTokenの情報をチェックして、ある場合のみクエリを投げる
  useEffect(() => {
    if (userInfo.idToken !== "" && session && !isSessionLoading) {
      console.log("lazyQuery called:", userInfo);
      query();
    } else {
      console.log("lazyQuery not call:", userInfo);
    }
  }, [userInfo]);

  // ローディング
  if (isLoading) {
    return <Loading />;
  }

  // エラー
  if (error) {
    return <Error />;
  }

  // 非ログイン時（sessionのローディングが終わった時に、sessionがない場合）
  if (!isSessionLoading && !session) {
    return <NotAuth />;
  }

  return <Data {...data} />;
};

export default TasksIndexPage;

TasksIndexPage.getLayout = Layout;
