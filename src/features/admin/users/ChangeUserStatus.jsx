import { useQueryClient } from "@tanstack/react-query";
import useChangeUserStatus from "./useChangeUserStatus";
import Loading from "../../../ui/Loading";
import { useForm } from "react-hook-form";
import RHFSelect from "../../../ui/RHFSelect";

export default function ChangeUserStatus({ userId, onClose }) {
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { changeUserStatus, isPending } = useChangeUserStatus();

  const options = [
    {
      label: "رد شده",
      value: 0,
    },
    {
      label: "در انتظار تایید",
      value: 1,
    },
    {
      label: "تایید شده",
      value: 2,
    },
  ];

  const onSubmit = (data) => {
    changeUserStatus(
      { userId, data },
      {
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries({ queryKey: ["users"] });
        },
      }
    );
  };

  if (isPending) return <Loading />;
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RHFSelect
          name="status"
          label="تغییر وضعیت"
          register={register}
          options={options}
          requierd
        />
        <div className="mt-8">
          {isPending ? (
            <Loading />
          ) : (
            <button className="mt-8 btn btn--primary w-full" type="submit">
              تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
