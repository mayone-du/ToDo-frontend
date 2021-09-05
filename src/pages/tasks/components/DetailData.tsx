import type { GetTaskQuery } from "src/graphql/schemas/schema";

export const DetailData: React.VFC<GetTaskQuery | undefined> = (props) => {
  return (
    <div>
      <h1 className="py-4 text-center">DetailData</h1>
      <h2 className="text-2xl font-bold">{props?.task?.title}</h2>
      <p>{props?.task?.content}</p>
    </div>
  );
};
