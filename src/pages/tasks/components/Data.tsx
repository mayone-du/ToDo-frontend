import type { GetMyAllTasksQuery } from "src/graphql/schemas/schema";

export const Data: React.VFC<GetMyAllTasksQuery | undefined> = (props) => {
  return (
    <div>
      <ul className="px-6 list-disc">
        {props?.myAllTasks?.edges.map((task, index) => {
          return <li key={index}>{task?.node?.title}</li>;
        })}
      </ul>
    </div>
  );
};
