import React from "react";
import Link from "next/link";

interface Props {
  title: string;
  tags?: boolean;
}

const Header = ({ title, tags }: Props) => {
  return (
    <header className="py-4 my-4 mx-10 font-bold text-2xl flex flex-col items-center justify-center border-b">
      <h2>{title}</h2>
      {tags && (
        <div className="m-2 text-xl">
          <Link href={`/tags`}>#tags</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
