import Link from "next/link";
import { memo } from "react";
import { FOOTER_MENUS } from "src/utils/menus/FOOTER_MENUS";

export const Footer: React.VFC = memo(() => {
  return (
    <footer className="mt-14 border-t">
      <nav className="bg-gray-100">
        <ul className="flex items-center">
          {FOOTER_MENUS.map((menu, index) => {
            return (
              <li key={index}>
                <Link href={menu.href}>
                  <a className="block mx-2 underline">{menu.label}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <p className="py-6 text-center bg-gray-300">copyright&copy;</p>
    </footer>
  );
});

Footer.displayName = "Footer";
