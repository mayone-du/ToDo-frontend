import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { GetMyAllTasksDocument, useCreateTaskMutation } from "src/graphql/schemas/schema";

export const CreateForm: React.VFC = () => {
  const [createTaskMutation] = useCreateTaskMutation();
  const [taskTitle, setTaskTitle] = useState("");

  const handleChangeTaskTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  }, []);

  // タスクの作成用関数
  const handleCreateTask = (e: React.ChangeEvent<HTMLFormElement>) => {
    // formの送信を無効化
    e.preventDefault();

    // タスク作成時のバリデーション
    if (taskTitle === "") {
      toast.error("タイトルを入力して下さい。");
      return;
    } else if (taskTitle.length >= 20) {
      toast.error(`20文字以内で入力してください。現在の文字数 ${taskTitle.length}`);
      return;
    }

    // 非同期即時関数内でタスク作成のmutationを実行
    (async () => {
      try {
        // タスクを作成したらタスクの一覧を再取得
        const { errors } = await createTaskMutation({
          variables: {
            title: taskTitle,
          },
          refetchQueries: [GetMyAllTasksDocument],
        });

        // エラーがあれば例外処理を発生
        if (errors) {
          throw errors;
        }
        toast.success("送信");
        setTaskTitle("");
      } catch (error) {
        console.error(error);
        toast.error("失敗");
      }
    })();
  };

  return (
    <form onSubmit={handleCreateTask}>
      <input
        type="text"
        className="p-2 rounded border"
        onChange={handleChangeTaskTitle}
        value={taskTitle}
      />
      <button type="submit" className="p-2 rounded border">
        作成
      </button>
    </form>
  );
};
