import { useCallback } from "react";
import toast from "react-hot-toast";
import { GetMyAllTasksDocument, useUpdateTaskMutation } from "src/graphql/schemas/schema";

// タスクを完了済みにするフック
export const useDoneTask = () => {
  const [updateTaskMutation, { loading: isDoneLoading }] = useUpdateTaskMutation({
    // refetchQueries: [{ query: GetTaskDocument, variables: { id: props?.task?.id ?? "" } }],
    refetchQueries: [{ query: GetMyAllTasksDocument }],
  });

  // taskを完了済みに更新
  const handleDoneTask = useCallback(async (taskId: string) => {
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
