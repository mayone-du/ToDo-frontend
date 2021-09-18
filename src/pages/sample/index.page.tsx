import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { NextSeo } from "next-seo";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { NotAuth } from "src/components/NotAuth";
import { UserLoading } from "src/components/UserLoading";
import { userInfoVar } from "src/graphql/apollo/cache";
import { useCountSecondsSubscription } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";

// サンプルページ
const SampleIndexPage: CustomNextPage = () => {
  const userInfo = useReactiveVar(userInfoVar);
  const { data, loading: isSubscriptionLoading } = useCountSecondsSubscription({
    variables: {
      seconds: 4,
    },
    // subscriptionが完了した時に呼ばれる
    // onSubscriptionComplete: () => {
    //   console.log("hoge");
    // },
  });

  const handleClick = useCallback(() => {
    toast.success("ボタンがクリックされました。");
  }, []);

  return (
    <>
      <NextSeo title="サンプルページ" nofollow noindex />

      {userInfo.isLoading ? (
        // ユーザー情報のローディング
        <UserLoading />
      ) : !userInfo.isLoading && !userInfo.isLogin ? (
        // 非ログイン
        <NotAuth />
      ) : (
        <div>
          <div>subscription: {data?.countSeconds}</div>
          <div>subscription loading: {isSubscriptionLoading ? "loading" : "not loading"}</div>

          <button className="block p-4 mx-auto rounded-md border" onClick={handleClick}>
            ボタン
          </button>
        </div>
      )}
    </>
  );
};

export default SampleIndexPage;

SampleIndexPage.getLayout = Layout;
