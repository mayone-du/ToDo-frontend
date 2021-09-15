import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GetMyAllTasksDocument, useCreateTaskMutation } from "src/graphql/schemas/schema";

type TaskInputs = {
  taskTitle: string;
};

export const CreateForm: React.VFC = () => {
  const [createTaskMutation, { loading: isLoading }] = useCreateTaskMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskInputs>();

  // タスクの作成用関数
  const handleCreateTask = async (formData: TaskInputs) => {
    try {
      // タスクを作成したらタスクの一覧を再取得
      const { errors } = await createTaskMutation({
        variables: {
          title: formData.taskTitle,
        },
        refetchQueries: [GetMyAllTasksDocument],
      });

      // エラーがあれば例外処理を発生
      if (errors) {
        throw errors;
      }
      toast.success("送信");
    } catch (error) {
      console.error(error);
      toast.error("失敗");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCreateTask)}>
      <input
        type="text"
        className="p-2 rounded border"
        placeholder="タスクのタイトル"
        {...register("taskTitle", { required: true, maxLength: 100 })}
      />
      {errors.taskTitle && (
        <p className="pb-4 text-sm text-gray-500">
          {errors.taskTitle.type === "required" ? "必須です。" : "最大100文字です。"}
        </p>
      )}
      {/* mutationのローディング中は無効化する */}
      <button
        type="submit"
        disabled={isLoading}
        className="p-2 disabled:bg-gray-500 rounded border"
      >
        作成
      </button>
    </form>
  );
};
