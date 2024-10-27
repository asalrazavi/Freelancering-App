import { useState } from "react";
import RHFSelect from "../../ui/RHFSelect";
import TextFeild from "../../ui/TextFeild";
import { useForm } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import DatePickerField from "../../ui/DatePickerField";
import useCategories from "../../hooks/useCategories";
import useCreateProject from "./useCreateProject";
import Loading from "../../ui/Loading";

export default function CreateProjectForm({ onclose }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [tags, setTags] = useState([]);
  const [date, setDate] = useState(new Date());
  const { categories } = useCategories();
  const { isPending, createProject } = useCreateProject();

  const onSubmit = (data) => {
    // console.log(data);
    const newProject = {
      ...data,
      deadline: new Date(date).toISOString(),
      tags,
    };
    console.log(createProject);
    createProject(newProject, {
      onSuccess: () => {
        onclose();
        reset();
      },
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <TextFeild
        label="عنوان"
        name="title"
        register={register}
        required
        validationSchema={{
          required: "عنوان ضروری است",
          minLength: {
            value: 10,
            message: "طول عنوان نا معتبر است",
          },
        }}
        errors={errors}
      />
      <TextFeild
        label="توضیحات"
        name="description"
        register={register}
        errors={errors}
      />
      <TextFeild
        label="بودجه"
        name="budget"
        type="number"
        register={register}
        required
        validationSchema={{
          required: "بودجه ضروری است",
        }}
        errors={errors}
      />
      <RHFSelect
        name="category"
        label="دسته بندی"
        register={register}
        options={categories}
        requierd
      />
      <div>
        <label className="mb-2 block text-secondary-700">تگ</label>
        <TagsInput value={tags} onChange={setTags} name="tags" />
      </div>
      <DatePickerField label="ددلاین" date={date} setDate={setDate} />
      <div>
        {isPending ? (
          <Loading />
        ) : (
          <button type="submit" className="btn btn--primary w-full">
            تایید
          </button>
        )}
      </div>
    </form>
  );
}
