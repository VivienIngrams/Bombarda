'use client'
import React from "react";
import Link from "next/link";
import { Post } from "../utils/Interface";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Props {
    post: Post;
}

const PostComponent = ({post}: Props) => {
  const path = usePathname();

  console.log(post.WKT);

  return (
    <div className="my-8">
      <Link href={`/posts/${post?.slug}`}>
      <h2>Title: {post?.title}</h2></Link>
        <p>Description: {post?.description}</p>
         {!path.startsWith('/categories') && (
        <Link href={`/categories/${post?.category?.slug.current}`}>
          Category: {post?.category?.name}
        </Link>
      )}
        <p>Address: {post?.address}</p>
        <p>Google map coordinates: {post?.WKT}</p>
        <div>
          <Link href='/tags'>Tags:</Link>
           {post?.tags?.map((tag) => {
            
          return <Link href={`/tags/${tag.slug.current}`} className="mr-2 p-1 text-small border rounded-sm border-1 " key={tag.slug.current}>#{tag.name}</Link>
        
        })}</div>
           </div>
  );
};

export default PostComponent;
