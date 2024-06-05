import React from "react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { Quicksand } from "next/font/google";

const quickSand = Quicksand({ subsets: ["latin"], weight: ["300", "400", "500", "700"]});


const Navbar = () => {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="flex justify-between items-center h-16 w-full font-bold">
        <Link href="/">
          <div className={`${quickSand.className}`}>Bombarda</div>
        </Link>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
