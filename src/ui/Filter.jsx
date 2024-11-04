import { useSearchParams } from "react-router-dom";

export default function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;
  const handleClick = (value) => {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center gap-x-2 text-xs">
      <span>وضعیت</span>
      <div className="flex items-center gap-x-2 p-1 border border-secondary-100 bg-secondary-0 rounded-lg">
        {options.map((option) => {
          const isActive = option.value === currentFilter;
          return (
            <button
              disabled={isActive}
              onClick={() => handleClick(option.value)}
              className={`whitespace-nowrap rounded-md px-4 py-1 font-bold transition-all duration-300
                ${
                  isActive
                    ? "!bg-primary-900 text-white"
                    : "bg-secondary-0 text-secondary-800"
                }`}
              key={option.value}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
