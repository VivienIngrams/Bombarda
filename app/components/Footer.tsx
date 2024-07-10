import React from "react";
import Link from "next/link";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12 ">
      <Link href="/">
        <div className="rounded-full shadow-md shadow-neutral-500 p-2 cursor-pointer hover:scale-105 ease-in duration-300 m-2">
          <HiOutlineChevronDoubleUp />
        </div>
      </Link>
      <Link
        href="https://vivieningrams.com"
        target="_blank"
        className="my-8 text-[10px] tracking-tight xs:tracking-normal  z-50 leading-loose"
      >
            Website by Vivien Ingrams
      </Link>
    </div>
  );
};

export default Footer;