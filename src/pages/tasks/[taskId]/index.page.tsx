import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Error } from "src/components/Error";
import { NotAuth } from "src/components/NotAuth";
import { userInfoVar } from "src/graphql/apollo/cache";
import { useGetTaskLazyQuery } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";
import { DetailData } from "src/pages/tasks/components/DetailData";
import { DetailLoding } from "src/pages/tasks/components/DetailLoding";

// タスクのIDごとの詳細ページ
// URLのIDをもとにデータをfetchするか、予め全てSSG or ISRして認証情報によって出し分ける
const TaskIdPage: CustomNextPage = () => {
  // 指定されたIDのタスクが自分のものか判定し、自分のものでなければエラーとする
  const taskId = useRouter().asPath.replace("/tasks/", "");
  const userInfo = useReactiveVar(userInfoVar);

  const [query, { data, loading: isDataLoading, error }] = useGetTaskLazyQuery();

  useEffect(() => {
    userInfo.isLogin && query({ variables: { id: taskId } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  // タスクのデータとユーザー情報のローディング
  if (isDataLoading || userInfo.isLoading) {
    return <DetailLoding />;
  }

  // 非ログイン時（sessionのローディングが終わった時に、sessionがない場合）
  if (!userInfo.isLogin) {
    return <NotAuth />;
  }

  // エラー
  if (error) {
    console.error(error);
    return <Error errorMessage={error?.message} />;
  }

  // タスクの作成者が自分でない場合 初期値にundefinedが入ってくるため防止
  if (data?.task?.createUser.id && data.task.createUser.id !== userInfo.userId) {
    return <Error errorMessage="自分のタスクではありません。" />;
  }

  // 正常時
  return <DetailData {...data} />;
};

export default TaskIdPage;

TaskIdPage.getLayout = Layout;
