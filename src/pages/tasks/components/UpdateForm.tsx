import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { GetTaskQuery } from "src/graphql/schemas/schema";
import { GetTaskDocument } from "src/graphql/schemas/schema";
import { useUpdateTaskMutation } from "src/graphql/schemas/schema";
import { FILE_ACCEPT_EXTENTIONS } from "src/utils/constants/FILE_ACCEPT_EXTENTIONS";

type TaskInputs = {
  title: string;
  content: string;
  isDone: boolean;
  taskImage: File;
};

export const UpdateForm: React.VFC<GetTaskQuery | undefined> = (props) => {
  // タスクを更新したら再フェッチ
  const [updateTaskMutation, { loading: isLoading }] = useUpdateTaskMutation({
    refetchQueries: [GetTaskDocument],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TaskInputs>();

  // タスクの更新用関数
  const handleUpdateTask = async (formData: TaskInputs) => {
    try {
      const { errors } = await updateTaskMutation({
        variables: {
          id: props?.task?.id ?? "",
          ...formData,
        },
      });
      if (errors) {
        throw errors;
      }
      toast.success("更新しました。");
    } catch (error) {
      toast.error("失敗しました。");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateTask)}>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="タスクのタイトル"
          className="p-2 rounded border"
          defaultValue={props?.task?.title}
          {...register("title", { required: true, maxLength: 20 })}
        />

        {errors && (
          <p className="pt-2 pb-6 text-sm text-gray-500">
            {errors.title?.type === "required" && "必須項目"}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="タスクの内容"
          className="p-2 rounded border"
          defaultValue={props?.task?.content ?? ""}
          {...register("content")}
        />
      </div>
      <div>
        <input
          type="file"
          className="p-2 rounded border"
          // 受け付ける拡張子 あくまでユーザーヒントなので、別途検証する。
          accept="image/jpg, image/jpeg, image/png"
          {...register("taskImage", {
            validate: (file: any) => {
              const ext = file[0].name.slice(file[0].name.lastIndexOf(".") + 1);

              // エラーチェック
              // ファイルサイズ
              if (file[0].size > 1024 * 4) {
                setError("taskImage", { type: "validate", message: "file size error" });
                return false;
              }
              // 拡張子
              if (!FILE_ACCEPT_EXTENTIONS.includes(ext)) {
                setError("taskImage", { type: "validate", message: "拡張子エラー" });
                return false;
              }
              return true;
            },
          })}
        />
        {errors.taskImage && (
          <p className="pt-2 pb-6 text-sm text-gray-500 bg-red-800">
            {errors.taskImage.message}

            {/* eslint-disable-next-line no-console */}
            {console.log(errors.taskImage)}
          </p>
        )}
      </div>
      <button
        disabled={isLoading}
        className="block p-2 mx-auto disabled:bg-gray-400 rounded border border-blue-500 shadow-sm hover:shadow"
        type="submit"
      >
        update
      </button>
    </form>
  );
};
