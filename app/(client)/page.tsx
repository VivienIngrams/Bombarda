import Image from "next/image";
import { client } from "../../sanity/lib/client";
import Header from "../components/Header";
// import { data } from "../data";
import { Post } from "../utils/Interface";
import PostComponent from "../components/PostComponent";
import shuffleArray from "../utils/shuffleArray";

async function getPosts() {
  const query = `*[_type == "post"]{
    title,
    "slug": slug.current,
    description,
    "mainImage" : mainImage.asset->url,
    "category": category[0]->{slug,name},
    address,
    WKT,
    tags[]->{slug,name},
  }`;
  const options = {
    next: {
      revalidate: 60,
    },
  };

  const posts = await client.fetch(query, {}, options);
  return posts;
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



export default async function Home() {
  const posts: Post[] = await getPosts();
  const randomImages = await getRandomPostImages();

 // Shuffle the posts array
 const shuffledPosts = shuffleArray(posts);

  return (
    <div>
      <Header title="Recomendações" tags />
      <h2 className="text-xl">Experimenta algo novo...</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {shuffledPosts.length > 0 &&
        posts.map((post: Post, index) => (
          <PostComponent key={index} post={post} randomImages={randomImages} />
        ))}
        </div>
    </div>
  );
}
