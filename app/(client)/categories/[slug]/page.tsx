import Header from "@/app/components/Header";
import PostComponent from "@/app/components/PostComponent";
import { Post } from "@/app/utils/Interface";
import { client } from "@/sanity/lib/client";
import React from "react";
import { notFound } from "next/navigation";
import shuffleArray from "@/app/utils/shuffleArray";

async function getPostsByCategory(category: string) {
  const query = `
  *[_type == "post" && references(*[_type == "category" && slug.current == "${category}"]._id)]{
    title,
    "category": category[0]->{slug, name},
   "slug": slug.current,
   "mainImage" : mainImage.asset->url,
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
async function getRandomPostImages() {
  const query = `*[_type == "post" && defined(mainImage)]{
    "mainImage": mainImage.asset->url,
  }`;

  const options = {
    next: {
      revalidate: 60,
    },
  };
  const postsWithImages = await client.fetch(query, {}, options);
  return postsWithImages;
}


const page = async ({ params }: Params) => {
  const posts: Array<Post> = await getPostsByCategory(params.slug);
const randomImages = await getRandomPostImages();
  if (!posts) {
    notFound();
  }

  const shuffledPosts = shuffleArray(posts);

  return (
    <div>
      <Header title={`${posts[0].category?.name}`} tags />
      <div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shuffledPosts.length > 0 &&
                      shuffledPosts?.map((post: Post, index) => (
              <PostComponent key={index} post={post} randomImages={randomImages}/>
            ))}
        </div>
      </div>
    </div>
  );
};

export default page;
