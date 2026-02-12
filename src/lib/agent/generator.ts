import { Plan, ComponentNode } from "@/types/agent";

function generateNode(node: ComponentNode): string {
    const props = node.props
        ? Object.entries(node.props)
            .map(([k, v]) => `${k}="${v}"`)
            .join(" ")
        : "";

    if (!node.children || node.children.length === 0) {
        return `<${node.type} ${props} />`;
    }

    const children = node.children.map(generateNode).join("\n");

    return `<${node.type} ${props}>
${children}
</${node.type}>`;
}

export function generator(plan: Plan): string {
    return plan.components.map(generateNode).join("\n");
}