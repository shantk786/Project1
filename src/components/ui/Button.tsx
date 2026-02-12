export default function Button({
                                   label,
                                   onClick,
                                   children,
                               }: {
    label?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}) {
    return (
        <button className="ui-button" onClick={onClick}>
            {label ?? children}
        </button>
    );
}