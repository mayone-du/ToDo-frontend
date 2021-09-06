import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage, GetStaticProps } from "next";
import Link from "next/link";
import { UserLoading } from "src/components/UserLoading";
import { userInfoVar } from "src/graphql/apollo/cache";
import { initializeApollo } from "src/graphql/apollo/client";
import type { GetAllUsersQuery, GetAllUsersQueryVariables } from "src/graphql/schemas/schema";
import { GetAllUsersDocument } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";
// 全てのユーザー情報を取得
export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo(null, "");
  const { data } = await apolloClient.query<GetAllUsersQuery, GetAllUsersQueryVariables>({
    query: GetAllUsersDocument,
  });
  return { props: data };
};

const UsersIndexPage: CustomNextPage<GetAllUsersQuery | undefined> = (props) => {
  const userInfo = useReactiveVar(userInfoVar);

  if (userInfo.isLoading) {
    return <UserLoading />;
  }

  return (
    <div>
      {props.allUsers?.edges.map((user, index) => {
        return (
          user?.node && (
            <div key={index}>
              <Link href={`/users/${user.node.id}`}>
                <a className="text-blue-500 underline">{user?.node?.email}</a>
              </Link>
            </div>
          )
        );
      })}
    </div>
  );
};

export default UsersIndexPage;

UsersIndexPage.getLayout = Layout;
