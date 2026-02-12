"use client";

import { useState } from "react";
import { planner } from "@/lib/agent/planner";
import { generator } from "@/lib/agent/generator";
import { validate } from "@/lib/agent/validator";
import { renderPlan } from "@/lib/agent/renderer";
import { detectFullRewrite, summarizeChanges } from "@/lib/agent/diff";
import { Version, Plan } from "@/types/agent";

export default function Home() {
    const [prompt, setPrompt] = useState("");
    const [versions, setVersions] = useState<Version[]>([]);
    const [current, setCurrent] = useState<Version | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleGenerate(forceFull = false) {
        try {
            if (!prompt.trim()) return;

            setLoading(true);

            const previousPlan: Plan | undefined =
                forceFull ? undefined : current?.plan;

            const plan = await planner(prompt, previousPlan);

            // Enforce incremental modification
            if (!forceFull && detectFullRewrite(current?.plan, plan)) {
                alert(
                    "Full rewrite detected. Please modify incrementally or use Regenerate."
                );
                setLoading(false);
                return;
            }

            const code = generator(plan);

            if (!validate(code)) {
                alert("Invalid component usage detected.");
                setLoading(false);
                return;
            }

            const explanation = summarizeChanges(current?.plan, plan);

            const newVersion: Version = {
                id: Date.now(),
                prompt,
                plan,
                code,
                explanation,
                timestamp: Date.now(),
            };

            setVersions((v) => [...v, newVersion]);
            setCurrent(newVersion);
            setPrompt("");
            setLoading(false);
        } catch (error) {
            console.error(error);
            alert("Planner failed.");
            setLoading(false);
        }
    }

    return (
        <div className="layout">
            {/* LEFT PANEL */}
            <div className="panel">
                <h3>Chat</h3>

                <textarea
                    style={{ width: "100%", height: "100px" }}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your UI..."
                />

                <br />
                <br />

                <button onClick={() => handleGenerate(false)} disabled={loading}>
                    {loading ? "Generating..." : "Modify UI"}
                </button>

                <button
                    onClick={() => handleGenerate(true)}
                    disabled={loading}
                    style={{ marginLeft: "10px" }}
                >
                    Regenerate
                </button>

                <hr />

                <h4>Versions</h4>

                {versions.map((v) => (
                    <div key={v.id} style={{ marginBottom: "8px" }}>
                        <button onClick={() => setCurrent(v)}>
                            {new Date(v.timestamp).toLocaleTimeString()}
                        </button>
                    </div>
                ))}
            </div>

            {/* MIDDLE PANEL */}
            <div className="panel">
                <h3>Generated Code</h3>
                <pre>{current?.code}</pre>
            </div>

            {/* RIGHT PANEL */}
            <div className="panel">
                <h3>Live Preview</h3>

                <div>{current && renderPlan(current.plan)}</div>

                <hr />

                <h3>Explanation</h3>
                <p>{current?.explanation}</p>
            </div>
        </div>
    );
}