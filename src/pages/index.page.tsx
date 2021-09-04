import type { CustomNextPage } from "next";
import { useSession } from "next-auth/client";
import { ThemeChanger } from "src/components/ThemeChanger";
import { Layout } from "src/layouts";

const IndexPage: CustomNextPage = () => {
  const [session] = useSession();

  if (session) {
    return (
      <div>
        login done
        <ThemeChanger />
      </div>
    );
  }
  return <div>not login</div>;
};

export default IndexPage;

IndexPage.getLayout = Layout;
