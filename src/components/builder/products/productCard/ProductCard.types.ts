import type { SecurityDevice, SubscriptionPlan } from "@/types";

export interface ProductCardHandlers {
    addDevice: (id: string) => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
    selectDeviceVariant: (id: string, variantId: string) => void;
    selectPlan: (id: string) => void;
}

export interface ProductCardSharedProps {
    product: SecurityDevice | SubscriptionPlan;

    isDevice: boolean;
    isSelected: boolean;

    quantity: number;
    selectedVariantId?: string;

    currentPrice: number;
    originalPrice?: number;

    hasDiscount: boolean;
    savingsPercent: number;

    mainImage?: string;

    handlers: ProductCardHandlers;
}