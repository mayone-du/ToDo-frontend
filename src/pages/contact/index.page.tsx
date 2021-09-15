import type { CustomNextPage } from "next";
import { useForm } from "react-hook-form";
import { Layout } from "src/layouts";

type ContactInputs = {
  title: string;
};

const ContactIndexPage: CustomNextPage = () => {
  const { register, handleSubmit } = useForm<ContactInputs>();
  const onSubmit = (data: any) => {
    alert(data);
  };
  return (
    <div>
      <h1>お問い合わせ</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" className="block border" {...register("title")} />
      </form>
    </div>
  );
};
export default ContactIndexPage;

ContactIndexPage.getLayout = Layout;
