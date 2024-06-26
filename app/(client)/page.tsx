import Image from "next/image";
import { client } from "../../sanity/lib/client";
import Header from "../components/Header";
// import { data } from "../data";
import { Post } from "../utils/Interface";
import PostComponent from "../components/PostComponent";

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

  return (
    <div>
      <Header title="Bombarda Quarteirão Criativo" tags categories/>
      {posts.length > 0 &&
        posts.map((post: Post, index) => (
          <PostComponent key={index} post={post}  />
        ))}
    </div>
  );
}
