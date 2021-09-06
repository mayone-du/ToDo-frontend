import { useReactiveVar } from "@apollo/client";
import { Popover } from "@headlessui/react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import { memo, useCallback } from "react";
import { userInfoVar } from "src/graphql/apollo/cache";
import { HEADER_MENUS } from "src/utils/HEADER_MENUS";

export const Header: React.VFC = memo(() => {
  const [session] = useSession();
  const userInfo = useReactiveVar(userInfoVar);
  const handleSignIn = useCallback(() => {
    signIn();
  }, []);
  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  const menu_items = [
    {
      label: "sample",
      href: "##",
    },
    {
      label: "Automations",
      href: "##",
    },
    {
      label: "Reports",
      href: "##",
    },
  ];

  return (
    <header className="px-32">
      <nav className="flex justify-between items-center">
        <div className="m-2">
          <Link href="/">
            <a className="block text-lg font-bold">LOGO</a>
          </Link>
        </div>
        <ul className="flex items-center">
          {/* ヘッダーメニューを事前に定義し、mapで回して表示 */}
          {HEADER_MENUS.map((menu, index) => {
            return (
              <li key={index.toString()} className="m-2">
                <Link href={menu.href}>
                  <a>{menu.label}</a>
                </Link>
              </li>
            );
          })}
          {/* ローディング時の場合 */}
          {userInfo.isLoading && (
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
          )}
          <li className="m-2">
            {/* ログイン状態によって変更 */}
            {/* ログイン時の場合 */}
            {!userInfo.isLoading && userInfo.isLogin && (
              <div className="top-16 px-4 w-full max-w-sm">
                <Popover className="relative">
                  {({ open: isOpen }) => {
                    return (
                      <div>
                        <Popover.Button
                          className={`ring-blue-300 overflow-hidden rounded-full h-10 w-10 block active:ring hover:shadow-lg ${
                            isOpen && "ring"
                          }`}
                        >
                          {session?.user?.image ? (
                            <img src={session.user.image} alt="" />
                          ) : (
                            <div>No Image</div>
                          )}
                        </Popover.Button>
                        <Popover.Panel className="absolute -right-6 z-10 mt-4 w-72 rounded border shadow-md transform">
                          <ul>
                            {/* プロフィールのリンク */}
                            <li>
                              <Link href={`/users/${userInfo.userId}`}>
                                <a className="block py-2 px-4 hover:bg-gray-200 transition-colors duration-300">
                                  profile <br />
                                  @hoge
                                </a>
                              </Link>
                            </li>
                            {/* メニューを表示 */}
                            {menu_items.map((item, index) => {
                              return (
                                <li key={index}>
                                  <Link href={item.href}>
                                    <a className="block py-2 px-4 hover:bg-gray-200 border-t transition-colors duration-300">
                                      {item.label}
                                    </a>
                                  </Link>
                                </li>
                              );
                            })}
                            {/* サインアウト用 */}
                            <li>
                              <button
                                onClick={handleSignOut}
                                className="block py-2 px-4 w-full text-left hover:bg-gray-200 border-t transition-colors duration-300"
                              >
                                SignOut
                              </button>
                            </li>
                          </ul>
                        </Popover.Panel>
                      </div>
                    );
                  }}
                </Popover>
              </div>
            )}
            {/* 非ログイン時の場合 */}
            {!userInfo.isLoading && !userInfo.isLogin && (
              <button onClick={handleSignIn} className="block p-2 border">
                SignIn
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
});

Header.displayName = "Header";
