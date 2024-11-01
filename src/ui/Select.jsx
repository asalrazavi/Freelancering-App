export default function Select({ options, onChange, value }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="textField__dropdown py-2 text-xs bg-secondary-0"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
