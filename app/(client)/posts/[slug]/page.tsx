import Header from '@/app/components/Header'
import React from 'react'
import { client } from "../../../../sanity/lib/client";
import { Post, Tag } from "../../../utils/Interface";


interface Params {
    params: {
        slug: string;
    }
}

async function getSinglePost( slug: string ) {
    const query = `*[_type == "post" && slug.current == "${slug}"][0]{
      title,
      "slug": slug.current,
      description,
      mainImage,
      "category": category[0]->name,
      address,
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

const Posts = async ({params}: Params) => {
    const post = await getSinglePost( params.slug );
    console.log(post.title);
  return (
    <div>
        <Header title="Dynamic Posts Page" />
        <h2>{post.title}</h2>
<div className='text-center'>
<p>Description: {post?.description}</p>
        <p>Category: {post?.category}</p> 
        <p>Address: {post?.address}</p>
        <p>Google map coordinates: {post?.WKT}</p>
        <p>Tags: {post?.tags?.map((tag: Tag) => {
          return <span className="mr-2 p-1 text-small border rounded-sm border-1 " key={tag.slug.current}>#{tag.name}</span>
        
        })}</p>
</div>
    </div>
  )
}

export default Posts