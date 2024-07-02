"use client";
import React from "react";
import Link from "next/link";
import { Post } from "../utils/Interface";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface ImagePost {
  mainImage: string;
}

interface Props {
  post: Post;
  randomImages?: ImagePost[];
}

const PostComponent = ({ post, randomImages }: Props) => {
  const path = usePathname();
  const randomIndex = Math.floor(Math.random() * (randomImages?.length ?? 0));

  // Get the random image object or default to an empty object
  const randomImage = randomImages?.[randomIndex] || { mainImage: '' };

  // Destructure the mainImage from randomImage object
  const { mainImage } = randomImage;

  let color = "-red-700";
  if (post.category?.name === "Loja") {
    color = "-green-700";
  } else if (post.category?.name === "Arte") {
    color = "-sky-700";
  }

  return (
    <div className={`my-8 text-white rounded-2xl p-2 bg${color}`}>
      <Link href={`/posts/${post?.slug}`}>
        <div className="relative h-60 w-full rounded-xl overflow-hidden">
        {/* //   className={`h-60 w-full ${color}  bg-white rounded-xl flex items-center justify-center`} */}
         <Image
         src={post?.mainImage || mainImage}
          alt="bombarda"
          fill
          className="object-cover"
         />
         {/* <div className={`h-6 w-18 bg${color} rounded `}>IMAGEM</div>  */}
        </div>
        <h3 className={`py-1 uppercase ${color}`}>{post?.title}</h3>
        <p>{post?.description}</p>
      </Link>
      {/* {!path.startsWith('/categories') && (
        <Link href={`/categories/${post?.category?.slug.current}`}>
          Category: {post?.category?.name}
        </Link>
      )} */}
      {/* <div className="flex-wrap w-full">
        {post?.tags?.map((tag) => {
          return (
            <Link
              href={`/tags/${tag.slug.current}`}
              className="mr-2 p-1 text-small border rounded-sm border-1 "
              key={tag.slug.current}
            >
              #{tag.name}
            </Link>
          );
        })}
      </div> */}
    </div>
  );
};

export default PostComponent;
