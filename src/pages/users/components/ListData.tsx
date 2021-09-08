import Link from "next/link";
import type { GetAllUsersQuery } from "src/graphql/schemas/schema";

export const ListData: React.VFC<GetAllUsersQuery | undefined> = (props) => {
  return (
    <div>
      {/* すべてのユーザーを表示 */}
      {props?.allUsers?.edges.map((user, index) => {
        return (
          user?.node && (
            <div key={index}>
              <Link href={`/users/${user.node.id}`}>
                <a className="text-blue-500 underline">{user?.node?.email}</a>
              </Link>
            </div>
          )
        );
      })}
    </div>
  );
};
