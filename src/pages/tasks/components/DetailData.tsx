import type { GetTaskQuery } from "src/graphql/schemas/schema";

export const DetailData: React.VFC<GetTaskQuery | undefined> = (props) => {
  return (
    <div>
      <h3 className="py-4 text-center">DetailData</h3>
      <div>{props?.task?.title}</div>
    </div>
  );
};
