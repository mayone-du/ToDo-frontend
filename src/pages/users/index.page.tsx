import type { CustomNextPage, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { initializeApollo } from "src/graphql/apollo/client";
import type { GetAllUsersQuery, GetAllUsersQueryVariables } from "src/graphql/schemas/schema";
import { GetAllUsersDocument } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";
import { ListData } from "src/pages/users/components/ListData";

// 全てのユーザー情報を取得
export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo(null, "");
  const { data } = await apolloClient.query<GetAllUsersQuery, GetAllUsersQueryVariables>({
    query: GetAllUsersDocument,
  });
  return { props: data };
};

// ユーザー一覧ページ ログイン不要
const UsersIndexPage: CustomNextPage<GetAllUsersQuery | undefined> = (props) => {
  const PAGE_NAME = "ユーザー一覧";

  return (
    <>
      <NextSeo title={PAGE_NAME} />
      <ListData {...props} />
    </>
  );
};

export default UsersIndexPage;

UsersIndexPage.getLayout = Layout;
