export interface Post {
    title: string;
    // slug: {current: string;}
    slug: string;
    description: string;
    mainImage?: {};
    tags: Tag[];
    category: string;
    body: any;
    address: string;
    WKT: string;
    }

export interface Tag {
    slug: {current: string;}
    name: string;
    postCount?: number;
}

export interface Category {
    title: string;
    slug: {current: string;}
    _id: string;
}

export interface Tag {
    title: string;
    slug: {current: string;}
    _id: string;
}