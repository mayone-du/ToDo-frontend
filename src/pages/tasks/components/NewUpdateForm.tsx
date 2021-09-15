import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { GetTaskQuery } from "src/graphql/schemas/schema";
import { GetTaskDocument } from "src/graphql/schemas/schema";
import { useUpdateTaskMutation } from "src/graphql/schemas/schema";

type TaskInputs = {
  title: string;
  content: string;
  isDone: boolean;
  taskImage: File;
};

export const NewUpdateForm: React.VFC<GetTaskQuery | undefined> = (props) => {
  // タスクを更新したら再フェッチ
  const [updateTaskMutation, { loading: isLoading }] = useUpdateTaskMutation({
    refetchQueries: [GetTaskDocument],
  });

  const [taskImage, setTaskImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  // 画像が変更された時
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ファイルがあればstateに値を入れる
    const file = (e.target?.files && e.target.files[0]) ?? null;
    if (file) {
      setTaskImage(URL.createObjectURL(file));
      toast.success(`${file.size} bytes`);
    } else {
      setTaskImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateTask)}>
      <input
        type="text"
        placeholder="タスクのタイトル"
        className="p-2 rounded border"
        defaultValue={props?.task?.title}
        {...register("title", { required: true, maxLength: 20 })}
      />
      <input
        type="text"
        placeholder="タスクの内容"
        className="p-2 rounded border"
        defaultValue={props?.task?.content ?? ""}
        {...register("content")}
      />
      <input
        type="file"
        className="p-2 rounded border"
        // 受け付ける拡張子 あくまでユーザーヒントなので、別途検証する。
        accept="image/jpg, image/jpeg, image/png"
        {...register("taskImage")}
        onChange={handleChangeImage}
      />
      {taskImage && <img src={taskImage} alt="" />}
      <p className="py-2 text-sm text-gray-500">{JSON.stringify(errors)}</p>
      <button disabled={isLoading} className="p-2 disabled:bg-gray-400 border" type="submit">
        update
      </button>
    </form>
  );
};
