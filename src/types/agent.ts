export type UIComponent =
    | "Button"
    | "Card"
    | "Input"
    | "Modal"
    | "Table"
    | "Sidebar"
    | "Navbar"
    | "Chart";

export interface ComponentNode {
    type: UIComponent;
    props?: Record<string, any>;
    children?: ComponentNode[];
}

export interface Plan {
    layout: string;
    components: ComponentNode[];
}

export interface Version {
    id: number;
    prompt: string;
    plan: Plan;
    code: string;
    explanation: string;
    timestamp: number;
}