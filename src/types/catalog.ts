export interface Variant {
    id: string;
    title: string;
    image: string;
}

export interface Pricing {
    currentPrice: number;
    originalPrice?: number;
}

export interface Product {
    id: string;
    categoryId: string;

    name: string;
    description: string;

    image: string;

    pricing: Pricing;

    variants?: Variant[];

    badge?: string;
}

export interface Category {
    id: string;

    title: string;

    order: number;
}

export interface Catalog {
    categories: Category[];
    products: Product[];
}