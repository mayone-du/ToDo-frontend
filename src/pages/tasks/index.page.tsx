import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { useEffect } from "react";
import { Error } from "src/components/Error";
import { NotAuth } from "src/components/NotAuth";
import { userInfoVar } from "src/graphql/apollo/cache";
import { useGetMyAllTasksLazyQuery } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";
// import { useValidateAuth } from "src/libs/hooks/useValidateAuth";
import { ListData } from "src/pages/tasks/components/ListData";
import { ListLoading } from "src/pages/tasks/components/ListLoading";

const TasksIndexPage: CustomNextPage = () => {
  const userInfo = useReactiveVar(userInfoVar);
  const [query, { data, loading: isDataLoading, error }] = useGetMyAllTasksLazyQuery();

  useEffect(() => {
    // ログイン済みである場合のみクエリを実行
    userInfo.isLogin && query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  // ユーザー情報の取得中
  if (userInfo.isLoading) {
    return <div className="bg-red-600">Loading</div>;
  }

  // データのローディング
  if (isDataLoading) {
    return <ListLoading />;
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
  return <ListData {...data} />;
};

export default TasksIndexPage;

TasksIndexPage.getLayout = Layout;
