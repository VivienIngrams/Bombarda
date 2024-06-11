import Image from "next/image";
import {client} from "../../sanity/lib/client";
import Header from "../components/Header";

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
const posts = await getPosts();
console.log(posts);
  return (
   <div>
    <Header title={posts[0].title} />
   </div>
  );
}
