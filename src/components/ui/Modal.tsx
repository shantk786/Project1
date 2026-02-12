export default function Modal({
                                  title,
                                  children,
                              }: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="ui-modal">
            <h3>{title}</h3>
            {children}
        </div>
    );
}