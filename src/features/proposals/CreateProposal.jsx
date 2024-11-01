import { useForm } from "react-hook-form";
import TextFeild from "../../ui/TextFeild";
import Loading from "../../ui/Loading";
import useCreateProposal from "./useCreateProposal";

export default function CreateProposal({ onClose, projectId }) {
  const { isCreating, createProposal } = useCreateProposal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createProposal(
      { ...data, projectId },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  return (
    <div>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <TextFeild
          label="توضیحات"
          name="description"
          register={register}
          required
          validationSchema={{
            required: "توضیحات ضروری است",
            minLength: {
              value: 10,
              message: "حداقل 10 کاراکتر را وارد کنید",
            },
          }}
          errors={errors}
        />
        <TextFeild
          label="قیمت"
          name="price"
          register={register}
          required
          validationSchema={{
            required: "قیمت ضروری است",
          }}
          type="number"
          errors={errors}
        />
        <TextFeild
          label="مدت زمان"
          name="duration"
          register={register}
          required
          validationSchema={{
            required: "مدت زمان ضروری است",
          }}
          type="number"
          errors={errors}
        />
        <div className="mt-8">
          {isCreating ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
