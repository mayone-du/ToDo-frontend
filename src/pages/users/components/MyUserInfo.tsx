import type { GetUserQuery } from "src/graphql/schemas/schema";

export const MyUserInfo: React.VFC<GetUserQuery | undefined> = (props) => {
  return (
    <div>
      My User Info:
      {props?.user?.email}
    </div>
  );
};
