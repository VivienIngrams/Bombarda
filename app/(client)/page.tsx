import Image from "next/image";
import { client } from "../../sanity/lib/client";
import Header from "../components/Header";
import { data } from "../data";
import { Post } from "../utils/Interface";

async function getPosts() {
  const query = `*[_type == "post"]{
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
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
      {posts.length > 0 &&
        posts.map((post: Post) => (
          <div key={post.slug}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </div>
        ))}
    </div>
  );
}
