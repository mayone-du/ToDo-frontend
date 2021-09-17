import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { Error } from "src/components/Error";
import { NotAuth } from "src/components/NotAuth";
import { UserLoading } from "src/components/UserLoading";
import { userInfoVar } from "src/graphql/apollo/cache";
import { useGetMyAllTasksLazyQuery } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";
import { ListData } from "src/pages/tasks/components/ListData";
import { ListLoading } from "src/pages/tasks/components/ListLoading";

const TasksIndexPage: CustomNextPage = () => {
  const userInfo = useReactiveVar(userInfoVar);
  const [query, { data, loading: isDataLoading, error }] = useGetMyAllTasksLazyQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    // ログイン済みである場合のみクエリを実行
    userInfo.isLogin && query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  // 正常時
  return (
    <>
      <NextSeo title="タスク一覧" />

      {/* データ状態によってコンポーネントを出し分け */}
      {userInfo.isLoading ? (
        // ユーザー情報の取得中
        <UserLoading />
      ) : isDataLoading ? (
        // タスクの読込中
        <ListLoading />
      ) : !userInfo.isLoading && !userInfo.isLogin ? (
        // 非ログイン時（sessionのローディングが終わった時に、sessionがない場合）
        <NotAuth />
      ) : error ? (
        // エラー
        <Error error={error} />
      ) : (
        // 通常時
        <ListData {...data} />
      )}
    </>
  );
};

export default TasksIndexPage;

TasksIndexPage.getLayout = Layout;
