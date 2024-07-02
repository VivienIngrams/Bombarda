import React from "react";
import { client } from "../../../../sanity/lib/client";
import { Post, Tag } from "../../../utils/Interface";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";

interface Params {
  params: {
    slug: string;
  };
}

interface PostImages {
  mainImage: string;
}

async function getSingleRandomPostImage() {
  const query = `*[_type == "post" && defined(mainImage)]{
    "mainImage": mainImage.asset->url,
  }`;

  const options = {
    next: {
      revalidate: 60,
    },
  };

  const postsWithImages: PostImages[] = await client.fetch(query, {}, options);


  // Select a random index within the range of postsWithImages array length
  const randomIndex = Math.floor(Math.random() * postsWithImages.length);

  // Get the main image URL from the randomly selected post
  const randomMainImage = postsWithImages[randomIndex]?.mainImage || ''; // Default to empty string if no mainImage found

  // Return the randomly selected main image URL
  return randomMainImage;
}


async function getSinglePost(slug: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0]{
        title,
        "slug": slug.current,
        description,
       "mainImage" : mainImage.asset->url,
        "category": category[0]->{slug, name},
        address,
        body,
        WKT,
        tags[]->{slug,name},
      }`;
  const options = {
    next: {
      revalidate: 60,
    },
  };

  const post = await client.fetch(query, {}, options);
  return post;
}

const Posts = async ({ params }: Params) => {
  const post: Post = await getSinglePost(params.slug);
  const randomMainImage = await getSingleRandomPostImage();
console.log(randomMainImage);
  if (!post) {
    notFound();
  }

// A function to generate Lorem Ipsum text
function generateLoremIpsum() {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}
   // Check if post.body is empty or has no text in children
   if (!post.body || post.body.length === 0 || post.body.every((block: any) => !block.children.some((child: any) => child._type === "span" && child.text))) {
    // If body is empty or no text found, generate Lorem Ipsum
    post.body = [{
      _type: "block",
      style: "normal",
      children: [{
        _type: "span",
        text: generateLoremIpsum(),
      }],
    }];
  }

  let color = "-red-700";
  if (post.category?.name === "Loja") {
    color = "-green-700";
  } else if (post.category?.name === "Arte") {
    color = "-sky-700";
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header title={post.title} tags />
      {/* <h2 className="text-3xl font-bold text-center mt-8 mb-4"></h2> */}
      <div className="text-center mb-8">
        <p className="text-lg mb-4">{post?.description}</p>
        <div className="relative m-4 mx-auto h-80 w-full rounded-xl overflow-hidden">
         <Image
         src={post?.mainImage || randomMainImage}
          alt="bombarda"
        fill
          className="object-cover"
         />
        </div>
        <Link
          className={`bg${color}  text-white text-xl px-2 py-1 rounded-3xl`}
          href={`/categories/${post?.category?.slug.current}`}
        >
          {post?.category?.name}
        </Link>
        <p className="m-4">{post?.address}</p>
        {/* <p className="mb-4">Google map coordinates: {post?.WKT}</p> */}
        <div className="mb-8">
                    {post?.tags?.map((tag: Tag) => {
            return (
              <Link href={`/tags/${tag.slug.current}`} key={tag.slug.current}>
                <span className="mr-2 py-1 px-2 rounded-xl text-sm lowercase dark:bg-indigo-950 border border-indigo-900 dark:border-indigo-900">
                  #{tag.name}
                </span>
              </Link>
            );
          })}
        </div>
        <div className={`${richTextStyles}`}>
          <PortableText
            value={post?.body }
            components={portableTextComponents}
          />
        </div>
      </div>
    </div>
  );
};

export default Posts;

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="flex justify-center mb-8">
        <Image src={urlForImage(value)} alt="Post" width={700} height={700} />
      </div>
    ),
  },
  block: {
    h2: ({ value }: any) => (
      <h2
        id={slugify(value.children[0].text)}
        className="text-3xl font-bold mb-3"
      >
        {value.children[0].text}
      </h2>
    ),
    h3: ({ value }: any) => (
      <h3
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h3>
    ),
    h4: ({ value }: any) => (
      <h4
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h4>
    ),
    h5: ({ value }: any) => (
      <h5
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h5>
    ),
    h6: ({ value }: any) => (
      <h6
        id={slugify(value.children[0].text)}
        className="text-xl font-bold mb-3"
      >
        {value.children[0].text}
      </h6>
    ),
  },
};

const richTextStyles = `
  mt-14
  text-justify
  max-w-2xl
  m-auto
  prose-headings:my-5
  prose-heading:text-2xl
  prose-p:mb-5
  prose-p:leading-7
  prose-li:list-disc
  prose-li:leading-7
  prose-li:ml-4
  `;

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};
