import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { Error } from "src/components/Error";
import { NotAuth } from "src/components/NotAuth";
import { idTokenVar, userInfoVar } from "src/graphql/apollo/cache";
import { useGetTaskLazyQuery } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";
import { DetailData } from "src/pages/tasks/components/DetailData";
import { DetailLoding } from "src/pages/tasks/components/DetailLoding";

// タスクのIDごとの詳細ページ
// URLのIDをもとにデータをfetchするか、予め全てSSG or ISRして認証情報によって出し分ける
const TaskIdPage: CustomNextPage = () => {
  // 指定されたIDのタスクが自分のものか判定し、自分のものでなければエラーとする
  const taskId = useRouter().asPath.replace("/tasks/", "");

  // const [session, isSessionLoading] = useSession();
  const idToken = useReactiveVar(idTokenVar);
  const userInfo = useReactiveVar(userInfoVar);

  const [query, { data, loading: isDataLoading, error }] = useGetTaskLazyQuery();

  useEffect(() => {
    // session && !isSessionLoading && query({ variables: { id: taskId } });
    userInfo.isLogin && query({ variables: { id: taskId } });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  if (userInfo.isLoading) {
    return <div className="bg-red-600">Loading</div>;
  }

  // ローディング
  if (isDataLoading) {
    return <DetailLoding />;
  }

  // エラー
  if (error) {
    return <Error />;
  }

  // 非ログイン時（sessionのローディングが終わった時に、sessionがない場合）
  // if (!session && !isSessionLoading) {
  if (!userInfo.isLogin) {
    return <NotAuth />;
  }

  // 正常時

  return <DetailData {...data} />;
};

export default TaskIdPage;

TaskIdPage.getLayout = Layout;
