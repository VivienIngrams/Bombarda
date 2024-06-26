import React from "react";
import { client } from "../../../sanity/lib/client";
import { Category } from "../../utils/Interface";
import Header from "@/app/components/Header";
import Link from "next/link";

async function getCategories() {
  const query = `*[_type == "category"] {
    name,
    slug,
    "postCount": count(*[_type == "post" && references("category", ^._id)])
    }`;

  const categories = await client.fetch(query);
  return categories;
}
export const revalidate = 60;

const Categories = async () => {
  const categories: Category[] = await getCategories();

  return (
    <div>
      <Header title="Categories" tags/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {categories?.length > 0 &&
          categories?.map((category, index) => {
            let color = "bg-red-700";
            if (category.name === "Loja") {
              color = "bg-green-700";
            } else if (category.name === "Arte") {
              color = "bg-sky-700";
            }

            return (
            <Link key={index} href={`/categories/${category.slug.current}`}>
             
              <div className={`mb-2 px-3 py-1 text-sm capitalize ${color} dark:bg-gray-950 border dark:border-gray-900 hover:text-sky-500 inline-block rounded`}>
                #{category.name} ({category?.postCount})
              </div>
            </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Categories;
