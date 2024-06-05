import React from "react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
{
  /* <Link href="https://www.youtube.com/watch?v=yAqgjSZ0PqY" >tutorial</Link> */
}

const Navbar = () => {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="flex justify-between items-center h-16 w-full">
        <Link href="/">
          <div>Bombarda</div>
        </Link>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
