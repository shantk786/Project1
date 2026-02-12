import OpenAI from "openai";
import { NextResponse } from "next/server";
import { validatePlanStructure } from "@/lib/agent/schemaValidator";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

/**
 * Safer injection guard
 */
function isUnsafeInput(input: string) {
    const lower = input.toLowerCase();

    const blockedPatterns = [
        /ignore\s+previous\s+instructions/,
        /<script/i,
        /eval\(/,
        /process\.env/,
        /require\(/,
        /import\s+/,
    ];

    return blockedPatterns.some((pattern) =>
        pattern.test(lower)
    );
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userInput, previousPlan } = body;

        if (!userInput || typeof userInput !== "string") {
            return NextResponse.json(
                { error: "Invalid input" },
                { status: 400 }
            );
        }

        if (isUnsafeInput(userInput)) {
            return NextResponse.json(
                { error: "Unsafe prompt detected" },
                { status: 400 }
            );
        }

        const systemPrompt = `
You are a deterministic UI planning agent.

STRICT RULES:
- Return ONLY valid JSON.
- No markdown.
- No explanation text.
- No comments.
- Use ONLY these components:
  Button, Card, Input, Modal, Table, Sidebar, Navbar, Chart.
- Do NOT invent new components.
- Do NOT generate CSS.
- Do NOT generate HTML.

Output format:

{
  "layout": "string",
  "components": [
    {
      "type": "ComponentName",
      "props": {},
      "children": []
    }
  ]
}

If previousPlan exists:
- Modify it incrementally.
- Preserve existing structure.
- Only change what is necessary.
- Do NOT rewrite everything unless explicitly asked.
`;

        const userPrompt = `
User Request:
${userInput}

Previous Plan:
${JSON.stringify(previousPlan || null, null, 2)}
`;

        const response = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            temperature: 0,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
        });

        const rawContent = response.choices[0]?.message?.content;

        if (!rawContent) {
            return NextResponse.json(
                { error: "Empty model response" },
                { status: 500 }
            );
        }

        let parsedPlan;

        try {
            parsedPlan = JSON.parse(rawContent);
        } catch {
            console.error("Model returned non-JSON:", rawContent);
            return NextResponse.json(
                { error: "Model returned invalid JSON" },
                { status: 500 }
            );
        }

        // 🔒 Formal schema validation
        if (!validatePlanStructure(parsedPlan)) {
            return NextResponse.json(
                { error: "Invalid plan structure from model" },
                { status: 500 }
            );
        }

        return NextResponse.json({ plan: parsedPlan });

    } catch (error) {
        console.error("Planner API Error:", error);

        return NextResponse.json(
            { error: "Planner failed" },
            { status: 500 }
        );
    }
}