import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function FilterDropDown({ options, filterField }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(filterField) || "";
  // console.log(value);

  function handleChange(e) {
    if (e.target.value === "All") {
      searchParams.delete(filterField);
    } else {
      searchParams.set(filterField, e.target.value);
    }
    setSearchParams(searchParams);
  }

  return <Select onChange={handleChange} value={value} options={options} />;
}
