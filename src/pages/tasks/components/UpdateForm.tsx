import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import type { GetTaskQuery } from "src/graphql/schemas/schema";
import { GetTaskDocument } from "src/graphql/schemas/schema";
import { useUpdateTaskMutation } from "src/graphql/schemas/schema";
import { FILE_ACCEPT_EXTENTIONS } from "src/utils/constants/FILE_ACCEPT_EXTENTIONS";

// 4KBまで許可
const FILE_ACCEPT_SIZE = 1024 * 4;

export const UpdateForm: React.VFC<GetTaskQuery | undefined> = (props) => {
  // タスクを更新したら再フェッチ
  const [updateTaskMutation, { loading: isLoading }] = useUpdateTaskMutation({
    refetchQueries: [GetTaskDocument],
  });

  // タスクのローカルステート
  const [taskValues, setTaskValues] = useState<{
    id: string;
    title: string;
    content: string;
    isDone: boolean | undefined;
    taskImage: File | null;
  }>({
    id: props?.task?.id ?? "",
    title: props?.task?.title ?? "",
    content: props?.task?.content ?? "",
    isDone: props?.task?.isDone,
    taskImage: null,
  });

  // タスクのタイトルが変更された時
  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskValues({ ...taskValues, title: e.target.value });
    },
    [taskValues],
  );
  // タスクの内容が変更された時
  const handleChangeContent = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskValues({ ...taskValues, content: e.target.value });
    },
    [taskValues],
  );
  // タスクの画像が変更された時
  const handleChangeTaskImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const fileSize = file.size;
        const fileName = file.name;
        const ext = fileName.slice(fileName.lastIndexOf(".") + 1);

        if (fileSize > FILE_ACCEPT_SIZE) {
          // ファイルサイズの確認
          toast.error(`${fileSize}バイトのファイルです。${FILE_ACCEPT_SIZE}以下にしてください。`);
          e.target.value = "";
          // この前に一度他のファイルを入れているとそれが維持されてしまうため、初期化
          setTaskValues({ ...taskValues, taskImage: null });
          return;
        } else if (!FILE_ACCEPT_EXTENTIONS.includes(ext)) {
          // ファイルの拡張子の確認
          toast.error(FILE_ACCEPT_EXTENTIONS.toString() + "の拡張子のみ可能です。");
          e.target.value = "";
          // この前に一度他のファイルを入れているとそれが維持されてしまうため、初期化
          setTaskValues({ ...taskValues, taskImage: null });
          return;
        }

        setTaskValues({ ...taskValues, taskImage: file });
      }
    },
    [taskValues],
  );

  // タスクの更新用関数
  const handleUpdateTask = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: 値のバリデーション
    console.log(taskValues);
    if (taskValues.title === "") {
      toast.error("タイトルを入力してください。");
      return;
    } else if (taskValues.title.length > 20) {
      toast.error("20文字以内にしてください。");
      return;
    } else if (taskValues.taskImage?.size && taskValues.taskImage.size > FILE_ACCEPT_SIZE) {
      toast.error(taskValues.taskImage?.size + "バイトのファイルです。1MB以下にしてください。");
      return;
    }

    // バリデーションが通ればmutationを実行
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
      <input
        type="text"
        placeholder="タスクの内容"
        className="p-2 rounded border"
        value={taskValues.content}
        onChange={handleChangeContent}
      />
      <input
        type="file"
        className="p-2 rounded border"
        onChange={handleChangeTaskImage}
        // 受け付ける拡張子 あくまでユーザーヒントなので、別途検証する。
        accept="image/jpg, image/jpeg, image/png"
      />
      {/* {<img src={new FileReader().readAsDataURL(taskValues.taskImage!)} alt="" />} */}
      <button disabled={isLoading} className="p-2 disabled:bg-gray-400 border" type="submit">
        update
      </button>
    </form>
  );
};
