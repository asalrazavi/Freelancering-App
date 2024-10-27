export default function TextFeild({
  label,
  name,
  register,
  placeholder,
  required,
  validationSchema,
  errors,
}) {
  return (
    <div className="space-y-2">
      <label className="block text-secondary-700" htmlFor={name}>
        {label} {required && <span className="text-error">*</span>}
      </label>
      <input
        {...register(name, validationSchema)}
        className="textField__input"
        placeholder={placeholder}
        type="text"
        id={name}
        autoComplete="off"
      />
      {errors && errors[name] && (
        <span className="text-error block text-sm mt-2">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}
