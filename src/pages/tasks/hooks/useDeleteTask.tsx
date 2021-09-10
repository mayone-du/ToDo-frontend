import { useCallback } from "react";
import toast from "react-hot-toast";
import { GetMyAllTasksDocument, useDeleteTaskMutation } from "src/graphql/schemas/schema";

export const useDeleteTask = () => {
  const [deleteTaskMutation, { loading: isDeleteLoading }] = useDeleteTaskMutation();

  // taskの削除
  const handleDeleteTask = useCallback(async (taskId: string) => {
    try {
      const { errors } = await deleteTaskMutation({
        variables: { id: taskId },
        refetchQueries: [{ query: GetMyAllTasksDocument }],
      });

      if (errors) {
        throw errors;
      }

      toast.success("削除しました。");
    } catch (error) {
      console.error(error);
      toast.error("削除に失敗しました。");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isDeleteLoading,
    handleDeleteTask,
  };
};
