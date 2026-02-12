This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.





About project 

🧠 Deterministic AI UI Agent

An AI-powered UI generation system that converts natural language intent into working React UI code using a fixed, deterministic component library.

Inspired by Claude Code — but designed to be safe, reproducible, and debuggable.

🎯 Project Objective

Build an AI agent that:

Converts natural language → working UI code

Uses a fixed component system

Supports incremental modifications

Provides explanation for changes

Enforces deterministic behavior

Prevents unsafe code generation

🏗 Architecture Overview

The system follows a strict multi-agent architecture:

User Prompt ↓ Planner (LLM via Groq) ↓ Structured JSON Plan ↓ Schema Validation ↓ Generator (Deterministic) ↓ Validator ↓ Live Renderer ↓ Explainer (Structural Diff) 🧠 Agent Design 1️⃣ Planner (AI)

Uses Groq (LLaMA 3.1)

Converts natural language into structured JSON

Enforced deterministic output format

Receives previous plan for incremental edits

Temperature set to 0 (no randomness)

File:

src/app/api/planner/route.ts 2️⃣ Generator (Deterministic)

Converts validated plan → React JSX string

Cannot generate new components

Cannot generate CSS

Cannot generate arbitrary HTML

File:

src/lib/agent/generator.ts 3️⃣ Explainer (Structural Diff Engine)

Compares previous plan vs new plan

Detects added/removed components

Blocks full rewrites unless explicitly requested

Generates structural explanation

File:

src/lib/agent/diff.ts 4️⃣ Schema Validator

Ensures:

Plan has valid structure

Components are from whitelist

Props are objects

Children are valid nodes

No unknown components

File:

src/lib/agent/schemaValidator.ts 🧱 Deterministic Component System

Allowed Components:

Button

Card

Input

Modal

Table

Sidebar

Navbar

Chart

Strict Rules:

No inline styles

No dynamic CSS

No Tailwind

No new components

No external UI libraries

No arbitrary HTML

No script execution

This guarantees visual consistency and reproducibility.

🔁 Incremental Modification Logic

The system supports:

Modify existing UI

Preserve structure

Add/remove specific components

Reject full rewrites

Explicit “Regenerate” option

Full Rewrite Detection

If structural change exceeds threshold (70%), rewrite is blocked unless user explicitly regenerates.

🔒 Safety & Validation

Includes:

Prompt injection detection

Component whitelist enforcement

JSON schema validation

Strict parsing (no markdown allowed)

Error handling for malformed outputs

🖥 User Interface

Claude-style layout:

Panel Purpose Left AI Chat / Prompt Input Middle Generated JSX Code Right Live Rendered UI + Explanation

Includes:

Generate (Incremental Modify)

Regenerate (Full Reset)

Version history

Rollback support

⚙️ Tech Stack

Frontend:

Next.js 16 (App Router)

React

TypeScript

Backend:

Next.js API Routes

AI:

Groq (LLaMA 3.1 8B Instant)

State:

In-memory version tracking

📦 Folder Structure src/ ├─ app/ │ ├─ page.tsx │ ├─ layout.tsx │ └─ api/planner/route.ts │ ├─ components/ui/ │ ├─ Button.tsx │ ├─ Card.tsx │ ├─ Modal.tsx │ ├─ Table.tsx │ ├─ Sidebar.tsx │ ├─ Navbar.tsx │ └─ Chart.tsx │ ├─ lib/agent/ │ ├─ planner.ts │ ├─ generator.ts │ ├─ validator.ts │ ├─ schemaValidator.ts │ ├─ diff.ts │ └─ renderer.tsx │ └─ types/agent.ts 🚀 How To Run Locally

Clone repository

Install dependencies:

npm install

Add .env.local:

GROQ_API_KEY=your_key_here

Run:

npm run dev 📌 Known Limitations

LLM may occasionally return malformed JSON

No persistent database (versions stored in memory)

No syntax highlighting in code panel

No drag-and-drop layout editor

No visual diff view

🔮 What I Would Improve With More Time

Persistent storage for versions

Visual diff view

Advanced structural preservation enforcement

Streaming LLM response

Better semantic diff explanations

Automatic recovery from partial JSON

UI polish and resizable panels

Deployment pipeline integration

🎓 Assignment Requirement Mapping Requirement Status Deterministic component system ✅ Multi-agent architecture ✅ Incremental modification ✅ Explanation engine ✅ Rollback support ✅ Safety validation ✅ No arbitrary styling ✅ Fixed UI library ✅ 🏁 Conclusion

This project demonstrates:

Safe AI system design

Deterministic UI generation

Incremental structural editing

Strong validation architecture

Explainable AI behavior

It prioritizes correctness and reproducibility over design aesthetics.

👤 Author
Shantanu Kulkarni
