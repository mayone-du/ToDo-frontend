import type { CustomNextPage } from "next";
import { useGetMyAllTasksQuery } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";

const TasksIndexPage: CustomNextPage = () => {
  const { data, loading: isLoading } = useGetMyAllTasksQuery({ fetchPolicy: "network-only" });

  if (isLoading) {
    <div className="bg-red-600">Loading...</div>;
  }

  return (
    <div>
      <h1>Tasks</h1>
      {/* {isLoading && "Loading..."} */}
      <ul>
        {data?.myAllTasks?.edges.map((task, index) => {
          return <li key={index}>{task?.node?.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default TasksIndexPage;

TasksIndexPage.getLayout = Layout;
