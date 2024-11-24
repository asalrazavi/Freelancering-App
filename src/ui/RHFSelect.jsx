export default function RHFSelect({
  label,
  name,
  register,
  options,
  requierd,
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-secondary-700">
        {label} {requierd && <span className="text-error">*</span>}
      </label>
      <select {...register(name)} id={name} className="textField__input w-full">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
