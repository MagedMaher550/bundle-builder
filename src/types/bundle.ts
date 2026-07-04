export interface Bundle {
    items: BundleItem[];
}

export interface BundleItem {
    productId: string;

    variantId?: string;

    quantity: number;
}

