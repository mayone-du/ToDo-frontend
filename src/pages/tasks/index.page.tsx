import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { idTokenVar } from "src/graphql/apollo/cache";
import { useGetMyAllTasksLazyQuery } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";
import { Data } from "src/pages/tasks/components/Data";
import { Error } from "src/pages/tasks/components/Error";
import { Loading } from "src/pages/tasks/components/Loading";
import { NotAuth } from "src/pages/tasks/components/NotAuth";

const TasksIndexPage: CustomNextPage = () => {
  const [session, isSessionLoading] = useSession();
  const idToken = useReactiveVar(idTokenVar);
  const [query, { data, loading: isLoading, error }] = useGetMyAllTasksLazyQuery();

  useEffect(() => {
    // ログイン済みである場合のみクエリを実行
    idToken !== "" && session && !isSessionLoading && query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken]);

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

  // 正常時
  return <Data {...data} />;
};

export default TasksIndexPage;

TasksIndexPage.getLayout = Layout;
