import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { useSession } from "next-auth/client";
import { userInfoVar } from "src/graphql/apollo/cache";
import { Layout } from "src/layouts";

const UsersIndexPage: CustomNextPage = () => {
  const [session] = useSession();
  const userInfo = useReactiveVar(userInfoVar);

  if (userInfo.isLoading) {
    return <div className="bg-blue-500">Loading...</div>;
  }

  return <div>My Account Info: {session?.user?.email}</div>;
};

export default UsersIndexPage;

UsersIndexPage.getLayout = Layout;
