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
      <h2>{post?.title}</h2></Link>
        <p>{post?.description}</p>
        <p>{post?.category}</p> 
        <p>{post?.address}</p>
        <p>{post?.WKT}</p>
        <p>{post?.tags}</p>
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
