import React from "react";
import { ComponentNode } from "@/types/agent";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Table from "@/components/ui/Table";
import Sidebar from "@/components/ui/Sidebar";
import Navbar from "@/components/ui/Navbar";
import Chart from "@/components/ui/Chart";

/**
 * Deterministic whitelist component map
 * AI cannot add new components
 */
const COMPONENT_MAP = {
    Button,
    Card,
    Input,
    Modal,
    Table,
    Sidebar,
    Navbar,
    Chart,
};

export function renderNode(node: ComponentNode): React.ReactNode {
    const Component = COMPONENT_MAP[node.type];

    if (!Component) {
        return <div>Invalid Component</div>;
    }

    const children =
        node.children?.map((child, index) => (
            <React.Fragment key={index}>
                {renderNode(child)}
                </React.Fragment>
        )) || null;

    return <Component {...node.props}>{children}</Component>;
}

export function renderPlan(plan: { components: ComponentNode[] }) {
    return plan.components.map((node, index) => (
        <React.Fragment key={index}>
            {renderNode(node)}
            </React.Fragment>
    ));
}