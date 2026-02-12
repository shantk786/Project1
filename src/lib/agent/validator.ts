const ALLOWED = [
    "Button",
    "Card",
    "Input",
    "Modal",
    "Table",
    "Sidebar",
    "Navbar",
    "Chart",
];

export function validate(code: string): boolean {
    for (const line of code.split("\n")) {
        const match = line.match(/<(\w+)/);
        if (match && !ALLOWED.includes(match[1])) {
            return false;
        }
    }

    if (code.includes("className") || code.includes("style=")) {
        return false;
    }

    return true;
}