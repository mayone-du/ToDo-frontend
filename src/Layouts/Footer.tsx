import Link from "next/link";
import { memo } from "react";
import { FOOTER_MENUS } from "src/utils/menus/FOOTER_MENUS";

export const Footer: React.VFC = memo(() => {
  return (
    <footer className="mt-14 border-t">
      <div className="flex justify-between px-10 md:px-40 lg:px-60 bg-gray-100">
        <div>
          <Link href="/">
            <a className="block">LOGO</a>
          </Link>
        </div>
        <nav>
          <ul>
            <h4 className="text-2xl font-bold">みだし</h4>
            {FOOTER_MENUS.map((menu, index) => {
              return (
                <li key={index}>
                  <Link href={menu.href}>
                    <a className="block underline">{menu.label}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <p className="py-6 text-center bg-gray-300">copyright&copy;</p>
    </footer>
  );
});

Footer.displayName = "Footer";
