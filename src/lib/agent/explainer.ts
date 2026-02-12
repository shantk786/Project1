import { Plan } from "@/types/agent";

export function explainer(plan: Plan): string {
    return `The layout chosen is ${plan.layout}. 
The UI uses ${plan.components.length} top-level components.`;
}