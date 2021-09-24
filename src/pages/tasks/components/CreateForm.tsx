import { useReactiveVar } from "@apollo/client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { userInfoVar } from "src/graphql/apollo/cache";
import { GetMyAllTasksDocument, useCreateTaskMutation } from "src/graphql/schemas/schema";
import { useAuthModal } from "src/libs/hooks/useAuthModal";

type TaskInputs = {
  taskTitle: string;
};

export const CreateForm: React.VFC = () => {
  const userInfo = useReactiveVar(userInfoVar);
  const { handleOpenModal } = useAuthModal();
  const [createTaskMutation, { loading: isLoading }] = useCreateTaskMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TaskInputs>();

  // タスクの作成用関数
  const handleCreateTask = async (formData: TaskInputs) => {
    if (!userInfo.isLogin) {
      return handleOpenModal();
    }
    const toastId = toast.loading("loading");
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
      setValue("taskTitle", "");
      toast.success("送信", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("失敗", { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCreateTask)}>
      <div>
        <input
          type="text"
          className="block p-2 mx-auto mt-8 rounded border"
          placeholder="タスクのタイトル"
          {...register("taskTitle", { required: true, maxLength: 20 })}
        />
        {errors.taskTitle && (
          <p className="pb-4 text-sm text-gray-500">
            {errors.taskTitle.type === "required" ? "必須です。" : "最大20文字です。"}
          </p>
        )}
      </div>
      {/* mutationのローディング中は無効化する */}
      <button
        type="submit"
        disabled={isLoading}
        className="block py-2 px-4 my-4 mx-auto disabled:bg-gray-500 rounded border"
      >
        作成
      </button>
    </form>
  );
};
