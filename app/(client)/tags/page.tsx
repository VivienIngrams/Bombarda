import React from "react";
import { client } from "../../../sanity/lib/client";
import { Tag } from "../../utils/Interface";
import Header from "@/app/components/Header";
import Link from "next/link";

async function getTags() {
  const query = `*[_type == "tag"] {
    name,
    slug,
    "postCount": count(*[_type == "post" && references("tags", ^._id)])
    }`;

  const tags = await client.fetch(query);
  return tags;
}
export const revalidate = 60;

const Tags = async () => {
  const tags: Tag[] = await getTags();

  return (
    <div>
      <Header title="Tags" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {tags?.length > 0 &&
          tags?.map((tag, index) => (
            <Link key={index} href={`/tags/${tag.slug.current}`}>
              <div className="mb-2 px-3 py-1 text-sm lowercase dark:bg-gray-950 border dark:border-gray-900 hover:text-sky-500 inline-block rounded-3xl">
                #{tag.name} ({tag?.postCount})
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Tags;
