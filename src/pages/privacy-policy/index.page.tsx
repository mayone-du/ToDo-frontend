import type { CustomNextPage } from "next";
import { Layout } from "src/layouts";

const PrivacyPolicyIndexPage: CustomNextPage = () => {
  return <div>プライバシー・ポリシー</div>;
};

export default PrivacyPolicyIndexPage;

PrivacyPolicyIndexPage.getLayout = Layout;
