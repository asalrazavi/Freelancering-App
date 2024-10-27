import RadioInput from "./RadioInput";

export default function RadioInputGroup({ register, errors, watch, configs }) {
  const { name, validationSchema = {}, options } = configs;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-x-8">
        {options.map(({ label, value }) => (
          <RadioInput
            key={value}
            name={name}
            label={label}
            value={value}
            id={value}
            register={register}
            watch={watch}
            validationSchema={validationSchema}
            errors={errors}
          />
        ))}
      </div>
      {errors && errors["role"] && (
        <span className="text-error block text-sm mt-2">
          {errors["role"]?.message}
        </span>
      )}
    </div>
  );
}
