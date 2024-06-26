import React from "react";
import { client } from "../../../../sanity/lib/client";
import { Post, Tag } from "../../../utils/Interface";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";

interface Params {
  params: {
    slug: string;
  };
}

async function getSinglePost(slug: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0]{
        title,
        "slug": slug.current,
        description,
        mainImage,
        "category": category[0]->{slug, name},
        address,
        body,
        WKT,
        tags[]->{slug,name},
      }`;
  const options = {
    next: {
      revalidate: 60,
    },
  };

  const post = await client.fetch(query, {}, options);
  return post;
}

const Posts = async ({ params }: Params) => {
  const post: Post = await getSinglePost(params.slug);

  if (!post) {
    notFound();
  }
  console.log(post);

  let color = "-red-700";
  if (post.category?.name === "Loja") {
    color = "-green-700";
  } else if (post.category?.name === "Arte") {
    color = "-sky-700";
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header title={post.title} tags />
      {/* <h2 className="text-3xl font-bold text-center mt-8 mb-4"></h2> */}
      <div className="text-center mb-8">
        <p className="text-lg mb-4">{post?.description}</p>
        <div className="relative m-4 mx-auto h-60 w-full rounded-xl overflow-hidden">
         <Image
         src="/bombarda.jpg"
          alt="bombarda"
          fill
          className="object-cover"
         />
        </div>
        <Link
          className={`bg${color}  text-white text-xl px-2 py-1 rounded-3xl`}
          href={`/categories/${post?.category?.slug.current}`}
        >
          {post?.category?.name}
        </Link>
        <p className="m-4">{post?.address}</p>
        {/* <p className="mb-4">Google map coordinates: {post?.WKT}</p> */}
        <div className="mb-8">
                    {post?.tags?.map((tag: Tag) => {
            return (
              <Link href={`/tags/${tag.slug.current}`} key={tag.slug.current}>
                <span className="mr-2 py-1 px-2 rounded-xl text-sm lowercase dark:bg-indigo-950 border border-indigo-900 dark:border-indigo-900">
                  #{tag.name}
                </span>
              </Link>
            );
          })}
        </div>
        <div className={`${richTextStyles}`}>
          <PortableText
            value={post?.body}
            components={portableTextComponents}
          />
        </div>
      </div>
    </div>
  );
};

export default Posts;

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="flex justify-center mb-8">
        <Image src={urlForImage(value)} alt="Post" width={700} height={700} />
      </div>
    ),
  },
  block: {
    h2: ({ value }: any) => (
      <h2
        id={slugify(value.children[0].text)}
        className="text-3xl font-bold mb-3"
      >
        {value.children[0].text}
      </h2>
    ),
    h3: ({ value }: any) => (
      <h3
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h3>
    ),
    h4: ({ value }: any) => (
      <h4
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h4>
    ),
    h5: ({ value }: any) => (
      <h5
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h5>
    ),
    h6: ({ value }: any) => (
      <h6
        id={slugify(value.children[0].text)}
        className="text-xl font-bold mb-3"
      >
        {value.children[0].text}
      </h6>
    ),
  },
};

const richTextStyles = `
  mt-14
  text-justify
  max-w-2xl
  m-auto
  prose-headings:my-5
  prose-heading:text-2xl
  prose-p:mb-5
  prose-p:leading-7
  prose-li:list-disc
  prose-li:leading-7
  prose-li:ml-4
  `;

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};
