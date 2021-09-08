import type { CustomNextPage } from "next";
import { Layout } from "src/layouts";

const TermsIndexPage: CustomNextPage = () => {
  return <div>利用規約</div>;
};

export default TermsIndexPage;

TermsIndexPage.getLayout = Layout;
