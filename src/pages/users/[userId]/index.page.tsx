import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import { userInfoVar } from "src/graphql/apollo/cache";
import { initializeApollo } from "src/graphql/apollo/client";
import type {
  GetAllUsersQuery,
  GetUserQuery,
  GetUserQueryVariables,
} from "src/graphql/schemas/schema";
import { GetUserDocument } from "src/graphql/schemas/schema";
import { GetAllUsersDocument } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";
import { DetailData } from "src/pages/users/components/DetailData";
import { MyUserInfo } from "src/pages/users/components/MyUserInfo";

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo(null, "");
  const { data } = await apolloClient.query<GetAllUsersQuery>({ query: GetAllUsersDocument });
  const ids = data.allUsers
    ? data.allUsers.edges.map((user) => {
        if (user?.node) {
          return {
            params: {
              userId: user.node.id,
            },
          };
        } else {
          return { params: { userId: "" } };
        }
      })
    : [];
  return { paths: ids, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const apolloClient = initializeApollo(null, "");
  const userId = context.params?.userId;
  const { data } = await apolloClient.query<GetUserQuery, GetUserQueryVariables>({
    query: GetUserDocument,
    variables: {
      id: userId as string,
    },
  });

  return { props: data };
};

const UserIdPage: CustomNextPage<GetUserQuery | undefined> = (props) => {
  const userInfo = useReactiveVar(userInfoVar);

  // ユーザー情報のローディング時
  if (userInfo.isLoading) {
    return <div className="bg-blue-500">Loading...</div>;
  }

  // 自分のユーザーIDだった場合
  if (userInfo.userId === props.user?.id) {
    return <MyUserInfo {...props} />;
  }

  return <DetailData {...props} />;
};

export default UserIdPage;

UserIdPage.getLayout = Layout;
