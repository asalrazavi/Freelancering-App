import { HiOutlinePlus } from "react-icons/hi";
import useCategories from "../../../hooks/useCategories";
import Filter from "../../../ui/Filter";
import FilterDropDown from "../../../ui/FilterDropDown";
import Modal from "../../../ui/Modal";
import CreateProjectForm from "../../projects/CreateProjectForm";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);
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
        <Modal
          open={open}
          title="اضافه کردن پروژه جدید"
          onClose={() => setOpen(false)}
        >
          <CreateProjectForm onClose={() => setOpen(false)} />
        </Modal>
        <button
          className="btn btn--primary flex items-center gap-x-2"
          onClick={() => setOpen(true)}
        >
          <HiOutlinePlus />
          <span>اضافه کردن پروژه</span>
        </button>
      </div>
    </div>
  );
}
