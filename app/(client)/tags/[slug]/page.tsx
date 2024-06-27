import Header from "@/app/components/Header";
import PostComponent from "@/app/components/PostComponent";
import { Post } from "@/app/utils/Interface";
import { client } from "@/sanity/lib/client";
import React from "react";
import { notFound } from "next/navigation";
import shuffleArray from "@/app/utils/shuffleArray";

async function getPostsByTag(tags: string) {
  const query = `
  *[_type == "post" && references(*[_type == "tag" && slug.current == "${tags}"]._id)]{
    title,
   "slug": slug.current,
    description,
    "category": category[0]->{slug, name},
    address,
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
  const posts: Array<Post> = await getPostsByTag(params.slug);

  if (!posts) {
  notFound();
   }

   const shuffledPosts = shuffleArray(posts);

  return (
    <div>
      <Header title={`#${params?.slug}`} tags />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shuffledPosts?.length > 0 &&
          shuffledPosts?.map((post: Post, index) => (
            <PostComponent key={index} post={post} />
          ))}
      </div>
    </div>
  );
};

export default page;
