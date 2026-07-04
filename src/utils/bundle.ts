import type { DeviceSelection } from "@/types";

export function addDevice(
    devices: DeviceSelection[],
    deviceId: string,
): DeviceSelection[] {
    const exists = devices.some(
        (device) => device.deviceId === deviceId,
    );

    if (!exists) {
        return [
            ...devices,
            {
                deviceId,
                quantity: 1,
            },
        ];
    }

    return incrementQuantity(devices, deviceId);
}

export function removeDevice(
    devices: DeviceSelection[],
    deviceId: string,
): DeviceSelection[] {
    return devices.filter(
        (device) => device.deviceId !== deviceId,
    );
}

export function incrementQuantity(
    devices: DeviceSelection[],
    deviceId: string,
): DeviceSelection[] {
    return devices.map((device) =>
        device.deviceId === deviceId
            ? {
                ...device,
                quantity: device.quantity + 1,
            }
            : device,
    );
}

export function decrementQuantity(
    devices: DeviceSelection[],
    deviceId: string,
): DeviceSelection[] {
    const device = devices.find(
        (device) => device.deviceId === deviceId,
    );

    if (!device) {
        return devices;
    }

    if (device.quantity <= 1) {
        return removeDevice(devices, deviceId);
    }

    return devices.map((device) =>
        device.deviceId === deviceId
            ? {
                ...device,
                quantity: device.quantity - 1,
            }
            : device,
    );
}

export function selectDeviceVariant(
    devices: DeviceSelection[],
    deviceId: string,
    variantId: string,
): DeviceSelection[] {
    return devices.map((device) =>
        device.deviceId === deviceId
            ? {
                ...device,
                variantId,
            }
            : device,
    );
}