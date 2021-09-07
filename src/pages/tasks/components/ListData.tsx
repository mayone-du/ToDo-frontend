import Link from "next/link";
import type { GetMyAllTasksQuery } from "src/graphql/schemas/schema";
import { CreateForm } from "src/pages/tasks/components/CreateForm";

export const ListData: React.VFC<GetMyAllTasksQuery | undefined> = (props) => {
  return (
    <div>
      <h3 className="py-4 text-center">自分のタスク一覧</h3>
      {props?.myAllTasks?.edges.length === 0 && <p>タスクはまだありません。</p>}
      <ul className="px-6 list-disc">
        {props?.myAllTasks?.edges.map((task, index) => {
          return (
            task?.node && (
              <li key={index}>
                <Link href={`/tasks/${task.node.id}`}>
                  <a className="underline">{task.node.title}</a>
                </Link>
              </li>
            )
          );
        })}
      </ul>
      <CreateForm />
    </div>
  );
};
