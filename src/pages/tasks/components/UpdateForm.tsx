import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import type { GetTaskQuery } from "src/graphql/schemas/schema";
import { GetTaskDocument } from "src/graphql/schemas/schema";
import { useUpdateTaskMutation } from "src/graphql/schemas/schema";

export const UpdateForm: React.VFC<GetTaskQuery | undefined> = (props) => {
  // タスクを更新したら再フェッチ
  const [updateTaskMutation, { loading: isLoading }] = useUpdateTaskMutation({
    refetchQueries: [GetTaskDocument],
  });

  // タスクのローカルステート
  const [taskValues, setTaskValues] = useState({
    id: props?.task?.id ?? "",
    title: props?.task?.title ?? "",
    content: props?.task?.content ?? "",
    isDone: props?.task?.isDone,
  });

  // タスクのタイトルが変更された時
  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskValues({ ...taskValues, title: e.target.value });
    },
    [taskValues],
  );

  // タスクの更新用関数
  const handleUpdateTask = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { errors } = await updateTaskMutation({
        variables: {
          ...taskValues,
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
    <form onSubmit={handleUpdateTask}>
      <input
        type="text"
        placeholder="タスクのタイトル"
        className="p-2 rounded border"
        value={taskValues.title}
        onChange={handleChangeTitle}
      />
      <button disabled={isLoading} className="p-2 border" type="submit">
        update
      </button>
    </form>
  );
};
