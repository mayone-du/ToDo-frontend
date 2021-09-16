import Link from "next/link";
import type { GetMyAllTasksQuery } from "src/graphql/schemas/schema";
import { CreateForm } from "src/pages/tasks/components/CreateForm";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

export const ListData: React.VFC<GetMyAllTasksQuery | undefined> = (props) => {
  return (
    <div>
      <h3 className="py-4 text-center">自分のタスク一覧</h3>
      {props?.myAllTasks?.edges.length === 0 && <p>タスクはまだありません。</p>}
      <ul className="px-6 list-disc">
        {props?.myAllTasks?.edges.map((task, index) => {
          return (
            task?.node && (
              <li key={index} className="flex justify-between items-center border-b">
                <Link href={`/tasks/${task.node.id}`}>
                  <a className={`block underline ${task.node.isDone && "bg-blue-200"}`}>
                    {task.node.title}
                  </a>
                </Link>
                {task.node.taskImage ? (
                  <img
                    src={MEDIAFILE_API_ENDPOINT + task.node.taskImage}
                    alt=""
                    className="block object-cover w-6 h-6"
                  />
                ) : (
                  <div className="text-xs">No image</div>
                )}
              </li>
            )
          );
        })}
      </ul>
      <CreateForm />
    </div>
  );
};
