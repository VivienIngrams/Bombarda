export interface Post {
    title: string;
    // slug: {current: string;}
    slug: string;
    description: string;
    mainImage: string;
    tags: string[];
    category: string;
    body: any;
    address: string;
    WKT: string;
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