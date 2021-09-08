import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { NotAuth } from "src/components/NotAuth";
import { ThemeChanger } from "src/components/ThemeChanger";
import { UserLoading } from "src/components/UserLoading";
import { userInfoVar } from "src/graphql/apollo/cache";
import { useCountSecondsSubscription } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";

const IndexPage: CustomNextPage = () => {
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

  // ユーザー情報のローディング
  if (userInfo.isLoading) {
    return <UserLoading />;
  }

  // 非ログイン
  if (!userInfo.isLoading && !userInfo.isLogin) {
    return <NotAuth />;
  }

  return (
    <div>
      <ThemeChanger />
      {data?.countSeconds}
      <br />
      subscription loading: {isSubscriptionLoading ? "loading" : "not loading"}
      <button className="block p-4 mx-auto rounded-md border" onClick={handleClick}>
        ボタン
      </button>
    </div>
  );
};

export default IndexPage;

IndexPage.getLayout = Layout;
