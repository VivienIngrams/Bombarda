import React from "react";
import Link from "next/link";
import { Post } from "../utils/Interface";
import Image from "next/image";

interface Props {
    post: Post;
}

const PostComponent = ({post}: Props) => {
  return (
    <div className="my-8">
      <Link href={`/posts/${post?.slug}`}>
      <h2>Title: {post?.title}</h2></Link>
        <p>Description: {post?.description}</p>
        <p>Category: {post?.category}</p> 
        <p>Address: {post?.address}</p>
        <p>Google map coordinates: {post?.WKT}</p>
        <p>Tags: {post?.tags?.map((tag) => {
          return <span className="mr-2 p-1 text-small border rounded-sm border-1 " key={tag.slug.current}>#{tag.name}</span>
        
        })}</p>
        {/* <Image
          src={post?.mainImage}
          alt={post?.title}
          width={500}
          height={500}
        /> */}
    </div>
  );
};

export default PostComponent;
