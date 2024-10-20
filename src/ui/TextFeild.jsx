export default function TextFeild({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <label className="block" htmlFor={name}>
        {label}
      </label>
      <input
        className="textField__input"
        placeholder={placeholder}
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
}
