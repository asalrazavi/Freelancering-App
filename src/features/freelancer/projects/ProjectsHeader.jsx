import useCategories from "../../../hooks/useCategories";
import Filter from "../../../ui/Filter";
import FilterDropDown from "../../../ui/FilterDropDown";

const sortOptions = [
  { value: "latest", label: "مرتب سازی (جدید ترین)" },
  { value: "earliest", label: "مرتب سازی (قدیمی ترین)" },
];

const statusOptions = [
  {
    label: "همه",
    value: "ALL",
  },
  {
    label: "باز",
    value: "OPEN",
  },
  {
    label: "بسته",
    value: "CLOSED",
  },
];

export default function ProjectsHeader() {
  const { transformedCategories } = useCategories();
  return (
    <div className="flex items-center justify-between text-secondary-700 mb-8">
      <h1 className="text-lg font-bold">لیست پروژه ها</h1>
      <div className="flex gap-x-8 items-center">
        <Filter filterField="status" options={statusOptions} />
        <FilterDropDown
          options={[
            { value: "All", label: "دسته بندی (همه)" },
            ...transformedCategories,
          ]}
          filterField="category"
        />
        <FilterDropDown options={sortOptions} filterField="sort" />
      </div>
    </div>
  );
}
