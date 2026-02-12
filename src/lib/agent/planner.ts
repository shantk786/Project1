import { Plan } from "@/types/agent";

export async function planner(
    userInput: string,
    previousPlan?: Plan
): Promise<Plan> {
    const res = await fetch("/api/planner", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userInput,
            previousPlan,
        }),
    });

    const data = await res.json();

    if (!res.ok || !data.plan) {
        console.error("Planner response:", data);
        throw new Error(data.error || "Planner failed");
    }

    return data.plan;
}