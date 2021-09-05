import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { Error } from "src/components/Error";
import { NotAuth } from "src/components/NotAuth";
import { idTokenVar } from "src/graphql/apollo/cache";
import { useGetMyAllTasksLazyQuery } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";
import { ListData } from "src/pages/tasks/components/ListData";
import { ListLoading } from "src/pages/tasks/components/ListLoading";

const TasksIndexPage: CustomNextPage = () => {
  const [session, isSessionLoading] = useSession();
  const idToken = useReactiveVar(idTokenVar);
  const [query, { data, loading: isDataLoading, error }] = useGetMyAllTasksLazyQuery();

  useEffect(() => {
    // ログイン済みである場合のみクエリを実行
    session && !isSessionLoading && idToken !== "" && query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken]);

  // ローディング
  if (isDataLoading) {
    return <ListLoading />;
  }

  // エラー
  if (error) {
    return <Error />;
  }

  // 非ログイン時（sessionのローディングが終わった時に、sessionがない場合）
  if (!session && !isSessionLoading) {
    return <NotAuth />;
  }

  // 正常時
  return <ListData {...data} />;
};

export default TasksIndexPage;

TasksIndexPage.getLayout = Layout;
