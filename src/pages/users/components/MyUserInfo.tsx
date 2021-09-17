import { ThemeChanger } from "src/components/ThemeChanger";
import type { GetUserQuery } from "src/graphql/schemas/schema";
import { ProfileForm } from "src/pages/users/components/ProfileForm";

export const MyUserInfo: React.VFC<GetUserQuery | undefined> = (props) => {
  return (
    <div>
      <h1 className="text-3xl text-center">自分のプロフィール</h1>
      <p>username: {props?.user?.username}</p>
      <p>fistName: {props?.user?.firstName}</p>
      <p>lastName: {props?.user?.lastName}</p>
      <p>自己紹介: {props?.user?.relatedUser?.selfIntroduction}</p>
      <div>
        <ThemeChanger />
      </div>
      <div className="bg-gray-100">
        <h2 className="text-3xl font-bold text-center">Profile</h2>
        <div>
          {props?.user?.relatedUser?.id ?? (
            <div>
              <h3 className="text-2xl text-center">プロフィールを作成</h3>
              <ProfileForm />
            </div>
          )}
        </div>
        <div>{props?.user?.relatedUser?.profileName}</div>
        <div>{props?.user?.relatedUser?.selfIntroduction}</div>
        <div>{props?.user?.relatedUser?.websiteUrl}</div>
      </div>
    </div>
  );
};
