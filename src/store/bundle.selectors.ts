import type {
    Bundle,
    SecurityDevice,
    SubscriptionPlan,
} from "@/types";

export interface CatalogIndexes {
    devicesById: Map<string, SecurityDevice>;
    plansById: Map<string, SubscriptionPlan>;
}

export interface SelectedDevice extends SecurityDevice {
    quantity: number;
    variantId?: string;
}

export function createCatalogIndexes(
    devices: SecurityDevice[],
    plans: SubscriptionPlan[],
): CatalogIndexes {
    return {
        devicesById: new Map(
            devices.map((device) => [device.id, device]),
        ),

        plansById: new Map(
            plans.map((plan) => [plan.id, plan]),
        ),
    };
}

function getDevice(
    indexes: CatalogIndexes,
    deviceId: string,
) {
    return indexes.devicesById.get(deviceId);
}

function getPlan(
    indexes: CatalogIndexes,
    planId?: string,
) {
    if (!planId) {
        return undefined;
    }

    return indexes.plansById.get(planId);
}

export function getSelectedDevices(
    bundle: Bundle,
    indexes: CatalogIndexes,
): SelectedDevice[] {
    return bundle.devices.flatMap((selection) => {
        const device = getDevice(
            indexes,
            selection.deviceId,
        );

        if (!device) {
            return [];
        }

        return {
            ...device,
            quantity: selection.quantity,
            variantId: selection.variantId,
        };
    });
}

export function getSelectedPlan(
    bundle: Bundle,
    indexes: CatalogIndexes,
) {
    return getPlan(indexes, bundle.planId);
}

export function isDeviceSelected(
    bundle: Bundle,
    deviceId: string,
) {
    return bundle.devices.some(
        (device) => device.deviceId === deviceId,
    );
}

export function getDeviceQuantity(
    bundle: Bundle,
    deviceId: string,
) {
    return (
        bundle.devices.find(
            (device) =>
                device.deviceId === deviceId,
        )?.quantity ?? 0
    );
}

export function getSelectedVariant(
    bundle: Bundle,
    deviceId: string,
) {
    return bundle.devices.find(
        (device) =>
            device.deviceId === deviceId,
    )?.variantId;
}

export function getDevicesByCategory(
    devices: SecurityDevice[],
    category: SecurityDevice["category"],
) {
    return devices.filter(
        (device) => device.category === category,
    );
}

export function getSubtotal(
    bundle: Bundle,
    indexes: CatalogIndexes,
) {
    const devicesSubtotal = bundle.devices.reduce(
        (total, selection) => {
            const device = getDevice(
                indexes,
                selection.deviceId,
            );

            if (!device) {
                return total;
            }

            return (
                total +
                device.pricing.currentPrice *
                selection.quantity
            );
        },
        0,
    );

    const plan = getPlan(
        indexes,
        bundle.planId,
    );

    return (
        devicesSubtotal +
        (plan?.pricing.currentPrice ?? 0)
    );
}

export function getSavings(
    bundle: Bundle,
    indexes: CatalogIndexes,
) {
    return bundle.devices.reduce(
        (total, selection) => {
            const device = getDevice(
                indexes,
                selection.deviceId,
            );

            if (
                !device?.pricing.originalPrice
            ) {
                return total;
            }

            return (
                total +
                (device.pricing.originalPrice -
                    device.pricing.currentPrice) *
                selection.quantity
            );
        },
        0,
    );
}

export function getTotal(
    bundle: Bundle,
    indexes: CatalogIndexes,
) {
    return getSubtotal(bundle, indexes);
}

export function getTotalItems(
    bundle: Bundle,
) {
    return bundle.devices.reduce(
        (total, device) =>
            total + device.quantity,
        0,
    );
}