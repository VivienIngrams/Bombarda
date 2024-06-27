import React from "react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { Quicksand } from "next/font/google";
import { FilterIcon } from "./Icons";

const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const Navbar = () => {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="flex justify-between items-center h-16 w-full font-bold">
        <Link href="/">
          <div className={`${quickSand.className}`}>
            BOMBARDA QUARTEIRÃO CRIATIVO
          </div>
        </Link>
        <Link href="/categories/loja">
          <div className={`${quickSand.className}`}>Lojas</div>
        </Link>
        <Link href="/categories/arte">
          <div className={`${quickSand.className}`}>Arte</div>
        </Link>
        <Link href="/categories/restauracao">
          <div className={`${quickSand.className}`}>Restauração</div>
        </Link>
        <Link
          href="/tags"
          // className="border border-indigo-900 p-1 hover:bg-indigo-100 dark:border-blue-50 dark:hover:bg-indigo-900"
        >
          <FilterIcon />
        </Link>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
