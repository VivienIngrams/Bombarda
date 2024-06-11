import React from "react";
import Link from "next/link";
import { Quicksand } from "next/font/google";
import { BackArrow } from "./Icons";

const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const CMSNavbar = () => {
  return (
    <div className="flex justify-between items-center py-1 px-5 font-bold">
      <Link href="/">
        <BackArrow />
      </Link>
      <div className={`${quickSand.className} text-[#312e81]`}>Bombarda</div>
    </div>
  );
};

export default CMSNavbar;
