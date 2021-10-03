import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
// import { signOut } from "next-auth/client";
import { BreadcrumbJsonLd, NextSeo } from "next-seo";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { NotAuth } from "src/components/NotAuth";
import { UserLoading } from "src/components/UserLoading";
import { userInfoVar } from "src/graphql/apollo/cache";
import { Layout } from "src/layouts";
import { add_one } from "src/wasm/wasm_bg.wasm";

const IndexPage: CustomNextPage = () => {
  const PAGE_NAME = "トップページ";

  const userInfo = useReactiveVar(userInfoVar);

  const handleClick = useCallback(() => {
    toast.success("ボタンがクリックされました。");
  }, []);

  return (
    <>
      <NextSeo title={PAGE_NAME} />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "HOME",
            item: "http://localhost:3000/",
          },
        ]}
      />
      {userInfo.isLoading ? (
        // ユーザー情報のローディング
        <UserLoading />
      ) : !userInfo.isLoading && !userInfo.isLogin ? (
        // 非ログイン時
        <NotAuth />
      ) : (
        // 通常時
        <div>
          <button className="block p-4 mx-auto rounded-md border" onClick={handleClick}>
            ボタン
          </button>

          <div className="p-4 text-xl text-center bg-purple-400">{add_one(1)}</div>
        </div>
      )}
      {/* eslint-disable-next-line react/jsx-handler-names */}
      {/* <button onClick={signOut} className="p-2 border">
        signout
      </button>
 */}
    </>
  );
};

export default IndexPage;

IndexPage.getLayout = Layout;
