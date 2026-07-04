export interface Variant {
    id: string;
    title: string;
    image: string;
}

export interface Pricing {
    currentPrice: number;
    originalPrice?: number;
}

export type SecurityDeviceCategory =
    | "camera"
    | "sensor"
    | "protection";

interface BaseCatalogItem {
    id: string;

    name: string;
    description: string;

    pricing: Pricing;

    badge?: string;
}

export interface SecurityDevice extends BaseCatalogItem {
    category: SecurityDeviceCategory;

    image: string;

    variants?: Variant[];
}

export interface SubscriptionPlan extends BaseCatalogItem {
    features: string[];
}

export interface Catalog {
    devices: SecurityDevice[];
    plans: SubscriptionPlan[];
}