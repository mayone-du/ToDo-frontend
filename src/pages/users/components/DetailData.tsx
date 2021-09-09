import type { GetUserQuery } from "src/graphql/schemas/schema";

export const DetailData: React.VFC<GetUserQuery | undefined> = (props) => {
  return (
    <div>
      <h2>Other User</h2>
      <p>{props?.user?.email}</p>
      <p>{props?.user?.username}</p>
      <p>{props?.user?.id}</p>
      <p>自己紹介: {props?.user?.relatedUser?.selfIntroduction}</p>
    </div>
  );
};
