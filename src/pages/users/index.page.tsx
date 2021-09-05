import type { CustomNextPage } from "next";
import { useSession } from "next-auth/client";

const UsersIndexPage: CustomNextPage = () => {
  const [session, isLoading] = useSession();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>My Account Info: {session?.user?.email}</div>;
};

export default UsersIndexPage;
