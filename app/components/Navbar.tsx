import React from "react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { Quicksand } from "next/font/google";
import { FilterIcon, SearchIcon } from "./Icons";

const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const Navbar = () => {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="text-xs md:text-lg flex justify-between items-center h-16 w-full font-bold">
        <Link href="/">
          <div className={`${quickSand.className} `}>
            BOMBARDA <span className="hidden md:block">QUARTEIRÃO CRIATIVO</span> 
          </div>
        </Link>
        <Link href="/categories/loja">
          <div className={`bg-green-700  text-white font-normal px-2 py-1 rounded-3xl ${quickSand.className}`}>Lojas</div>
        </Link>
        <Link href="/categories/arte">
          <div className={`bg-sky-700 text-white font-normal px-2 py-1 rounded-3xl ${quickSand.className}`}>Arte</div>
        </Link>
        <Link href="/categories/restauracao">
          <div className={`bg-red-700  text-white font-normal px-2 py-1 rounded-3xl ${quickSand.className}`}>Restauração</div>
        </Link>
        <Link
          href="/tags"
          className=" p-1 rounded-3xl hover:bg-indigo-100 dark:bg-blue-50 dark:border dark:hover:bg-indigo-500"
        >
          <FilterIcon />
        </Link>
        {/* <Link
          href="/"
          className=" p-1 rounded-3xl hover:bg-indigo-100 dark:bg-blue-50 dark:border dark:hover:bg-indigo-500"
        > */}
          {/* <SearchIcon /> */}
        {/* </Link> */}
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
