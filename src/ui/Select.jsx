export default function Select({ options, onChange, value }) {
  return (
    <div className="relative">
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
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        {" "}
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />{" "}
        </svg>{" "}
      </div>
    </div>
  );
}
