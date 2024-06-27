import Image from "next/image";
import { client } from "../../sanity/lib/client";
import Header from "../components/Header";
// import { data } from "../data";
import { Post } from "../utils/Interface";
import PostComponent from "../components/PostComponent";

// Utility function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array: Array<any>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function getPosts() {
  const query = `*[_type == "post"]{
    title,
    "slug": slug.current,
    description,
    mainImage,
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

export default async function Home() {
  const posts: Post[] = await getPosts();
 // Shuffle the posts array
 const shuffledPosts = shuffleArray(posts);

  return (
    <div>
      <Header title="Recomendações" tags />
      <h2 className="text-xl">Experimenta algo novo...</h2>
      {shuffledPosts.length > 0 &&
        posts.map((post: Post, index) => (
          <PostComponent key={index} post={post}  />
        ))}
    </div>
  );
}
