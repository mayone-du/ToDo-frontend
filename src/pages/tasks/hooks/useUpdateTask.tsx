import { useCallback } from "react";
import toast from "react-hot-toast";
import { GetTaskDocument, useUpdateTaskMutation } from "src/graphql/schemas/schema";

// タスクの内容を変更するフック
export const useUpdateTask = (taskId: string) => {
  const [updateTaskMutation, { loading: isDoneLoading }] = useUpdateTaskMutation({
    refetchQueries: [{ query: GetTaskDocument, variables: { id: taskId } }],
  });

  // taskを完了済みに更新
  const handleDoneTask = useCallback(async () => {
    try {
      const { errors } = await updateTaskMutation({
        variables: {
          id: taskId,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    isDoneLoading,
    handleDoneTask,
  };
};
