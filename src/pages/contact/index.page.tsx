import type { CustomNextPage } from "next";
import { useForm } from "react-hook-form";
import { Layout } from "src/layouts";

type ContactInputs = {
  title: string;
  content: string;
};

const ContactIndexPage: CustomNextPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ContactInputs>();
  const onSubmit = (data: ContactInputs) => {
    alert(JSON.stringify(data));
  };
  return (
    <div>
      <h1>お問い合わせ</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="block border"
          {...register("title", { required: true, maxLength: 20 })}
        />
        {/* タイトルのエラーハンドリング */}
        {errors.title && (
          <p className="pb-4 text-sm text-gray-500">
            {errors.title.type === "required" ? "必須です。" : "20文字までです。"}
          </p>
        )}

        <textarea
          {...register("content", { required: true })}
          className="border resize-none"
        ></textarea>
        <button type="submit" className="block text-center rounded-md border">
          送信
        </button>
      </form>
    </div>
  );
};
export default ContactIndexPage;

ContactIndexPage.getLayout = Layout;
