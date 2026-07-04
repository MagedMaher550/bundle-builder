export interface DeviceSelection {
    deviceId: string;

    variantId?: string;

    quantity: number;
}

export interface Bundle {
    devices: DeviceSelection[];

    planId?: string;
}