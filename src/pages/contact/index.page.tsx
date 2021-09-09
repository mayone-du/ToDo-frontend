import type { CustomNextPage } from "next";
import { Layout } from "src/layouts";

const ContactIndexPage: CustomNextPage = () => {
  return (
    <div>
      <h1>お問い合わせ</h1>
    </div>
  );
};
export default ContactIndexPage;

ContactIndexPage.getLayout = Layout;
