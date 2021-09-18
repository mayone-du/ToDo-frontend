import Link from "next/link";
import type { GetAllUsersQuery } from "src/graphql/schemas/schema";

export const ListData: React.VFC<GetAllUsersQuery | undefined> = (props) => {
  return (
    <ul className="flex flex-wrap w-full">
      {/* すべてのユーザーを表示 */}
      {props?.allUsers?.edges.map((user, index) => {
        return (
          user?.node && (
            <li key={index} className="p-4 w-full md:w-1/3">
              <Link href={`/users/${user.node.id}`}>
                <a className="block p-4 w-full rounded-md border shadow-sm">
                  <div>{user.node.email}</div>
                  <div>{user.node.relatedUser?.profileName ?? "ProfileName"}</div>
                  <div>{user.node.relatedUser?.selfIntroduction ?? "自己紹介"}</div>
                </a>
              </Link>
            </li>
          )
        );
      })}
    </ul>
  );
};
