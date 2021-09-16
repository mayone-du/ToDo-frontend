import router from "next/router";
import toast from "react-hot-toast";
import type { GetTaskQuery } from "src/graphql/schemas/schema";
import { GetTaskDocument } from "src/graphql/schemas/schema";
import { useUpdateTaskMutation } from "src/graphql/schemas/schema";
import { useDeleteTaskMutation } from "src/graphql/schemas/schema";
import { UpdateForm } from "src/pages/tasks/components/UpdateForm";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

export const DetailData: React.VFC<GetTaskQuery | undefined> = (props) => {
  const [updateTaskMutation, { loading: isDoneLoading }] = useUpdateTaskMutation({
    refetchQueries: [{ query: GetTaskDocument, variables: { id: props?.task?.id ?? "" } }],
  });
  const [deleteTaskMutation, { loading: isDeleteLoading }] = useDeleteTaskMutation();

  // taskを完了済みに更新
  const handleDoneTask = async () => {
    try {
      const { errors } = await updateTaskMutation({
        variables: {
          id: props?.task?.id ?? "",
          isDone: true,
        },
      });
      if (errors) {
        throw errors;
      }
      toast.success("タスクを完了しました");
    } catch (error) {
      toast.error("エラーが発生しました");
      console.error(error);
    }
  };

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
      router.push("/tasks");
    } catch (error) {
      toast.error("削除に失敗しました。");
    }
  };

  return (
    <div>
      <h1 className="py-4 text-center">タスクの詳細</h1>
      <h2 className="text-2xl font-bold">{props?.task?.title}</h2>
      <p>{props?.task?.content}</p>
      <div>
        {props?.task?.taskImage ? (
          <img
            src={`${MEDIAFILE_API_ENDPOINT}${props.task.taskImage}`}
            alt=""
            className="block object-cover"
          />
        ) : (
          "タスク画像はありません。"
        )}
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDeleteTask}
          disabled={isDeleteLoading}
          className="block py-2 px-4 mx-auto disabled:bg-gray-500 rounded border"
        >
          削除
        </button>
        <button
          onClick={handleDoneTask}
          disabled={isDoneLoading}
          className="block py-2 px-4 mx-auto disabled:bg-gray-500 rounded border"
        >
          完了
        </button>
      </div>
      <div>isDone: {props?.task?.isDone.toString()}</div>
      <UpdateForm {...props} />
    </div>
  );
};
