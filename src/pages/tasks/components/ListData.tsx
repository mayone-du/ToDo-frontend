import Link from "next/link";
import { AiTwotoneDelete } from "react-icons/ai";
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
              <li key={index} className="flex justify-between items-center border-b">
                <Link href={`/tasks/${task.node.id}`}>
                  <a className="block underline">{task.node.title}</a>
                </Link>
                <button className="block">
                  <AiTwotoneDelete className="w-10 h-10" />
                </button>
              </li>
            )
          );
        })}
      </ul>
      <CreateForm />
    </div>
  );
};
