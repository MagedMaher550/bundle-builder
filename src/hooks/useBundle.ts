import { useMemo } from "react";

import catalog from "@/data";

import { useBundleStore } from "@/store/bundle.store";

import {
    createCatalogIndexes,
    getSelectedDevices,
    getSelectedPlan,
    getSubtotal,
    getSavings,
    getTotal,
    getTotalItems,
} from "@/store/bundle.selectors";

const indexes = createCatalogIndexes(
    catalog.devices,
    catalog.plans,
);

export function useBundle() {
    const bundle = useBundleStore((state) => state.bundle);

    const currentStep = useBundleStore(
        (state) => state.currentStep,
    );

    const addDevice = useBundleStore(
        (state) => state.addDevice,
    );

    const removeDevice = useBundleStore(
        (state) => state.removeDevice,
    );

    const incrementQuantity = useBundleStore(
        (state) => state.incrementQuantity,
    );

    const decrementQuantity = useBundleStore(
        (state) => state.decrementQuantity,
    );

    const selectDeviceVariant = useBundleStore(
        (state) => state.selectDeviceVariant,
    );

    const selectPlan = useBundleStore(
        (state) => state.selectPlan,
    );

    const nextStep = useBundleStore(
        (state) => state.nextStep,
    );

    const previousStep = useBundleStore(
        (state) => state.previousStep,
    );

    const setCurrentStep = useBundleStore(
        (state) => state.setCurrentStep,
    );

    const clearBundle = useBundleStore(
        (state) => state.clearBundle,
    );

    const selectedDevices = useMemo(
        () => getSelectedDevices(bundle, indexes),
        [bundle],
    );

    const selectedPlan = useMemo(
        () => getSelectedPlan(bundle, indexes),
        [bundle],
    );

    const subtotal = useMemo(
        () => getSubtotal(bundle, indexes),
        [bundle],
    );

    const savings = useMemo(
        () => getSavings(bundle, indexes),
        [bundle],
    );

    const total = useMemo(
        () => getTotal(bundle, indexes),
        [bundle],
    );

    const totalItems = useMemo(
        () => getTotalItems(bundle),
        [bundle],
    );

    return {
        currentStep,

        selectedDevices,
        selectedPlan,

        subtotal,
        savings,
        total,
        totalItems,

        addDevice,
        removeDevice,

        incrementQuantity,
        decrementQuantity,

        selectDeviceVariant,

        selectPlan,

        nextStep,
        previousStep,
        setCurrentStep,

        clearBundle,
    };
}