import type { CustomNextPage } from "next";
import { useSession } from "next-auth/client";
import { ThemeChanger } from "src/components/ThemeChanger";
import { useCountSecondsSubscription, useGetAllUsersQuery } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";

const IndexPage: CustomNextPage = () => {
  const [session, isLoading] = useSession();
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

  // プロフィールの取得状況によってデータを出し分け
  if (session) {
    return (
      <div>
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
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>not login</div>;
};

export default IndexPage;

IndexPage.getLayout = Layout;
