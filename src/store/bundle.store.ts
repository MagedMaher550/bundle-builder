import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { Bundle } from "@/types";

import {
    addDevice,
    decrementQuantity,
    incrementQuantity,
    removeDevice,
    selectDeviceVariant,
} from "@/utils/bundle";

import {
    FIRST_STEP, LAST_STEP
} from "@/config/builder"

const STORAGE_KEY = "bundle-storage";

const createInitialBundle = (): Bundle => ({
    devices: [],
    planId: undefined,
});

const updateBundle = (
    bundle: Bundle,
    updates: Partial<Bundle>,
): Bundle => ({
    ...bundle,
    ...updates,
});

const clampStep = (step: number) =>
    Math.max(FIRST_STEP, Math.min(step, LAST_STEP));

export interface BundleStore {
    bundle: Bundle;
    currentStep: number;

    addDevice: (deviceId: string) => void;
    removeDevice: (deviceId: string) => void;

    incrementQuantity: (deviceId: string) => void;
    decrementQuantity: (deviceId: string) => void;

    selectDeviceVariant: (
        deviceId: string,
        variantId: string,
    ) => void;

    selectPlan: (planId: string) => void;

    setCurrentStep: (step: number) => void;
    nextStep: () => void;
    previousStep: () => void;

    clearBundle: () => void;
}

export const useBundleStore = create<BundleStore>()(
    devtools(
        persist(
            (set) => ({
                bundle: createInitialBundle(),

                currentStep: FIRST_STEP,

                addDevice: (deviceId) =>
                    set((state) => ({
                        bundle: updateBundle(state.bundle, {
                            devices: addDevice(
                                state.bundle.devices,
                                deviceId,
                            ),
                        }),
                    })),

                removeDevice: (deviceId) =>
                    set((state) => ({
                        bundle: updateBundle(state.bundle, {
                            devices: removeDevice(
                                state.bundle.devices,
                                deviceId,
                            ),
                        }),
                    })),

                incrementQuantity: (deviceId) =>
                    set((state) => ({
                        bundle: updateBundle(state.bundle, {
                            devices: incrementQuantity(
                                state.bundle.devices,
                                deviceId,
                            ),
                        }),
                    })),

                decrementQuantity: (deviceId) =>
                    set((state) => ({
                        bundle: updateBundle(state.bundle, {
                            devices: decrementQuantity(
                                state.bundle.devices,
                                deviceId,
                            ),
                        }),
                    })),

                selectDeviceVariant: (deviceId, variantId) =>
                    set((state) => ({
                        bundle: updateBundle(state.bundle, {
                            devices: selectDeviceVariant(
                                state.bundle.devices,
                                deviceId,
                                variantId,
                            ),
                        }),
                    })),

                selectPlan: (planId) =>
                    set((state) => ({
                        bundle: updateBundle(state.bundle, {
                            planId,
                        }),
                    })),

                setCurrentStep: (step) =>
                    set({
                        currentStep: clampStep(step),
                    }),

                nextStep: () =>
                    set((state) => ({
                        currentStep: clampStep(
                            state.currentStep + 1,
                        ),
                    })),

                previousStep: () =>
                    set((state) => ({
                        currentStep: clampStep(
                            state.currentStep - 1,
                        ),
                    })),

                clearBundle: () =>
                    set({
                        bundle: createInitialBundle(),
                    }),
            }),
            {
                name: STORAGE_KEY,

                version: 1,

                partialize: (state) => ({
                    bundle: state.bundle,
                }),
            },
        ),
        {
            name: "Bundle Store",
        },
    ),
);