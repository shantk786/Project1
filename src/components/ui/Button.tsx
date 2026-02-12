export default function Button({
                                   label,
                                   onClick,
                               }: {
    label: string;
    onClick?: () => void;
}) {
    return (
        <button className="ui-button" onClick={onClick}>
            {label}
        </button>
    );
}