import Image from "next/image";
import { client } from "../../sanity/lib/client";
import Header from "../components/Header";
import { data } from "../data";
import { Post } from "../utils/Interface";
import PostComponent from "../components/PostComponent";

async function getPosts() {
  const query = `*[_type == "post"]{
  title,
  slug,
  description,
  mainImage,
  category,
  address,
  WKT,
    tags
}`;
  const posts = await client.fetch(query);
  return posts;
}

export default async function Home() {
  // const posts: Post[] = await getPosts();
const posts: Post[] = data;
  return (
    <div>
      <Header title="Category"/>
      {posts.length > 0 &&
        posts.map((post: Post) => (
          <PostComponent key={post.slug} post={post} />
        ))}
    </div>
  );
}
