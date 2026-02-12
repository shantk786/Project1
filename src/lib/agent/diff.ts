import { Plan, ComponentNode } from "@/types/agent";

/**
 * Count total nodes recursively
 */
function countNodes(nodes: ComponentNode[]): number {
    let count = 0;

    function walk(node: ComponentNode) {
        count++;
        node.children?.forEach(walk);
    }

    nodes.forEach(walk);
    return count;
}

/**
 * Detect full rewrite
 */
export function detectFullRewrite(
    previous: Plan | undefined,
    next: Plan
): boolean {
    if (!previous) return false;

    const prevCount = countNodes(previous.components);
    const nextCount = countNodes(next.components);

    const difference = Math.abs(prevCount - nextCount);

    // If more than 70% structure changed → rewrite
    return difference > prevCount * 0.7;
}

/**
 * Collect all component types in tree
 */
function collectTypes(nodes: ComponentNode[]): string[] {
    const types: string[] = [];

    function walk(node: ComponentNode) {
        types.push(node.type);
        node.children?.forEach(walk);
    }

    nodes.forEach(walk);
    return types;
}

/**
 * Generate structural explanation
 */
export function summarizeChanges(
    previous: Plan | undefined,
    next: Plan
): string {
    if (!previous) {
        return "Initial UI generated based on the user's request.";
    }

    const prevTypes = collectTypes(previous.components);
    const nextTypes = collectTypes(next.components);

    const added = nextTypes.filter((t) => !prevTypes.includes(t));
    const removed = prevTypes.filter((t) => !nextTypes.includes(t));

    let message = "";

    if (added.length > 0) {
        message += `Added components: ${added.join(", ")}. `;
    }

    if (removed.length > 0) {
        message += `Removed components: ${removed.join(", ")}. `;
    }

    if (!added.length && !removed.length) {
        message +=
            "Modified existing components without major structural changes.";
    }

    return message.trim();
}