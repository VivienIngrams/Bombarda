import React from "react";
import Link from "next/link";

interface Props {
  title: string;
  tags?: boolean;
  // categories?: boolean;
}

const Header = ({ title, tags }: Props) => {
  return (
    <header className="py-4 my-4 font-bold text-2xl flex flex-col items-center justify-center border-b border-indigo-900">
      <h2>{title}{title === "Loja" && "s"}</h2>
      {/* {tags && (
        <div className="m-2 text-xl capitalize">
          <Link href={`/tags`}>#tags</Link>
        </div>
      )} */}
      {/* {categories && (
        <div className="m-2 text-xl capitalize">
          <Link href={`/categories`}>#categories</Link>
        </div>
      )} */}
    </header>
  );
};

export default Header;
