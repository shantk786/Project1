export default function Input({
                                  placeholder,
                              }: {
    placeholder?: string;
}) {
    return <input className="ui-input" placeholder={placeholder} />;
}