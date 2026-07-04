import type { SecurityDeviceCategory } from "@/types";

export interface BuilderStep {
    id: number;
    title: string;
    description: string;
    category?: SecurityDeviceCategory;
    isPlanStep?: boolean;
}

export const BUILDER_STEPS = [
    {
        id: 1,
        title: "Choose your cameras",
        description:
            "Select the cameras you want to include in your security system.",
        category: "camera",
    },
    {
        id: 2,
        title: "Choose your plan",
        description:
            "Select the subscription plan that best fits your needs.",
        isPlanStep: true,
    },
    {
        id: 3,
        title: "Choose your sensors",
        description:
            "Add sensors to protect doors, windows, and your home interior.",
        category: "sensor",
    },
    {
        id: 4,
        title: "Add extra protection",
        description:
            "Complete your system with additional protection devices.",
        category: "protection",
    },
] as const satisfies readonly BuilderStep[];

export const FIRST_STEP = BUILDER_STEPS[0].id;

export const LAST_STEP =
    BUILDER_STEPS[BUILDER_STEPS.length - 1].id;

export function getBuilderStep(stepId: number) {
    return BUILDER_STEPS.find(
        (step) => step.id === stepId,
    );
}

