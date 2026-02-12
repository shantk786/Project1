export default function Sidebar({
                                    children,
                                }: {
    children: React.ReactNode;
}) {
    return <div className="ui-sidebar">{children}</div>;
}