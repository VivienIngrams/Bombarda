export interface Post {
    title: string;
    slug: string;
    description: string;
    mainImage?: {};
    tags?: Tag[];
    category?: Category;
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
    name: string;
    slug: {current: string;}
    postCount?: number;
}
