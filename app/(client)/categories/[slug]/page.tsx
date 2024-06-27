import Header from "@/app/components/Header";
import PostComponent from "@/app/components/PostComponent";
import { Post } from "@/app/utils/Interface";
import { client } from "@/sanity/lib/client";
import React from "react";
import { notFound } from "next/navigation";

async function getPostsByCategory(category: string) {
  const query = `
  *[_type == "post" && references(*[_type == "category" && slug.current == "${category}"]._id)]{
    title,
    "category": category[0]->{slug, name},
   "slug": slug.current,
   address,
    description,
   tags[]->{slug,name},
  }
  `;

  const posts = await client.fetch(query);
  return posts;
}

export const revalidate = 60;

interface Params {
  params: {
    slug: string;
  };
}

const page = async ({ params }: Params) => {
  const posts: Array<Post> = await getPostsByCategory(params.slug);

  if (!posts) {
  notFound();
   }

  return (
    <div>
      <Header title={`${posts[0].category?.name}`} tags />
      <div>
        {posts?.length > 0 &&
          posts?.map((post: Post, index) => (
            <PostComponent key={index} post={post} />
          ))}
      </div>
    </div>
  );
};

export default page;
