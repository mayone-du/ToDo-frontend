import Link from "next/link";
import type { GetMyAllTasksQuery } from "src/graphql/schemas/schema";

export const ListData: React.VFC<GetMyAllTasksQuery | undefined> = (props) => {
  return (
    <div>
      <h3 className="py-4 text-center">Data</h3>
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

        {props === undefined && "Data is None"}
      </ul>
    </div>
  );
};
