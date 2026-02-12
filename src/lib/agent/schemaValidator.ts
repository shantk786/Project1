import { Plan, ComponentNode } from "@/types/agent";

const ALLOWED_COMPONENTS = [
    "Button",
    "Card",
    "Input",
    "Modal",
    "Table",
    "Sidebar",
    "Navbar",
    "Chart",
];

function validateNode(node: any): node is ComponentNode {
    if (!node || typeof node !== "object") return false;

    if (!node.type || !ALLOWED_COMPONENTS.includes(node.type)) {
        return false;
    }

    if (node.props && typeof node.props !== "object") {
        return false;
    }

    if (node.children) {
        if (!Array.isArray(node.children)) return false;

        for (const child of node.children) {
            if (!validateNode(child)) return false;
        }
    }

    return true;
}

export function validatePlanStructure(plan: any): plan is Plan {
    if (!plan || typeof plan !== "object") return false;

    if (!plan.layout || typeof plan.layout !== "string") {
        return false;
    }

    if (!Array.isArray(plan.components)) {
        return false;
    }

    for (const node of plan.components) {
        if (!validateNode(node)) return false;
    }

    return true;
}