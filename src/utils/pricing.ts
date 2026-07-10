import type { Pricing } from "@/types";

export interface PricingInfo {
    currentPrice: number;
    originalPrice?: number;
    hasDiscount: boolean;
    savingsAmount: number;
    savingsPercent: number;
}

export function getPricingInfo(pricing: Pricing): PricingInfo {
    const { currentPrice, originalPrice } = pricing;

    const hasDiscount =
        typeof originalPrice === "number" && originalPrice > currentPrice;

    const savingsAmount = hasDiscount ? originalPrice - currentPrice : 0;

    const savingsPercent = hasDiscount
        ? Math.round((savingsAmount / originalPrice) * 100)
        : 0;

    return {
        currentPrice,
        originalPrice,
        hasDiscount,
        savingsAmount,
        savingsPercent,
    };
}