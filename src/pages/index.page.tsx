import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { ThemeChanger } from "src/components/ThemeChanger";
import { userInfoVar } from "src/graphql/apollo/cache";
import { useCountSecondsSubscription, useGetAllUsersQuery } from "src/graphql/schemas/schema";
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

  const { data: hoge } = useGetAllUsersQuery();

  // ユーザー情報のローディング
  if (userInfo.isLoading) {
    return <div className="bg-red-400">user info Loading...</div>;
  }

  // 非ログイン
  if (!userInfo.isLogin) {
    return <div>not login</div>;
  }

  // プロフィールの取得状況によってデータを出し分け
  return (
    <div>
      {/* {console.log("render index component")} */}
      login done
      <ThemeChanger />
      {data?.countSeconds}
      <br />
      subscription loading: {isSubscriptionLoading ? "loading" : "not loading"}
      <ul>
        {hoge?.allUsers?.edges.map((user, index) => {
          return <li key={index}>{user?.node?.email}</li>;
        })}
      </ul>
      <button
        className="block p-4 mx-auto rounded-md border"
        // onClick={() => {
        //   userInfoVar({ isLogin: true, isLoading: false });
        // }}
      >
        ボタン
      </button>
    </div>
  );
};

export default IndexPage;

IndexPage.getLayout = Layout;
