import router from "next/router";
import toast from "react-hot-toast";
import type { GetTaskQuery } from "src/graphql/schemas/schema";
import { useDeleteTaskMutation } from "src/graphql/schemas/schema";

export const DetailData: React.VFC<GetTaskQuery | undefined> = (props) => {
  const [deleteTaskMutation, { loading: isLoading }] = useDeleteTaskMutation();

  // taskの削除
  const handleDeleteTask = async () => {
    try {
      const { errors } = await deleteTaskMutation({
        variables: { id: props?.task?.id ?? "" },
      });

      if (errors) {
        throw errors;
      }

      toast.success("削除しました。");
      router.push("/");
    } catch (error) {
      toast.error("削除に失敗しました。");
    }
  };

  return (
    <div>
      <h1 className="py-4 text-center">DetailData</h1>
      <h2 className="text-2xl font-bold">{props?.task?.title}</h2>
      <p>{props?.task?.content}</p>
      <button
        onClick={handleDeleteTask}
        disabled={isLoading}
        className="block py-2 px-4 mx-auto disabled:bg-gray-500 rounded border"
      >
        削除
      </button>
    </div>
  );
};
