import { ThemeChanger } from "src/components/ThemeChanger";
import type { GetUserQuery } from "src/graphql/schemas/schema";

export const MyUserInfo: React.VFC<GetUserQuery | undefined> = (props) => {
  return (
    <div>
      <h1>My User Info: {props?.user?.email}</h1>
      <p>username: {props?.user?.username}</p>
      <p>fistName: {props?.user?.firstName}</p>
      <p>lastName: {props?.user?.lastName}</p>
      <p>自己紹介: {props?.user?.relatedUser?.selfIntroduction}</p>
      <div>
        <ThemeChanger />
      </div>
    </div>
  );
};
