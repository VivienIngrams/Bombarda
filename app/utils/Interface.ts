export interface Post {
    title: string;
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
    title: string;
    postCount?: number;
}

export interface Category {
    title: string;
    slug: {current: string;}
    postCount?: number;
}
