import TextFeild from "../../ui/TextFeild";
import { useMutation } from "@tanstack/react-query";
import { completeProfile } from "../../services/authService";
import toast from "react-hot-toast";
import Loading from "../../ui/Loading";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import RadioInputGroup from "../../ui/RadioInputGroup";
import { TagsInput } from "react-tag-input-component";
import { useState } from "react";
// import useUser from "./useUser";
// import { useEffect } from "react";

export default function CompleteProfileForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);

  //   console.log(role);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: completeProfile,
  });

  // const { user } = useUser();

  // useEffect(() => {
  //   if (user) navigate("/", { replace: true });
  // }, [user, navigate]);

  const onSubmit = async (data) => {
    // console.log("user data front input", data);

    // e.preventDefault();
    try {
      const { user, message } = await mutateAsync({ ...data, skills: tags });
      // console.log(user, message);
      toast.success(message);

      if (user.status !== 2) {
        navigate("/");
        toast("پروفایل شما در انتظار تایید است");
        return;
      }
      if (user.role === "OWNER") navigate("/owner");
      if (user.role === "FREELANCER") navigate("/freelancer");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="w-[28rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 container xl:max-w-screen-xl">
      <div className="flex flex-col gap-y-6 items-center border py-10 px-5 rounded-xl shadow-xl shadow-secondary-200">
        <h1 className="font-bold text-3xl text-secondary-700">تکمیل اطلاعات</h1>
        <div className="w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <TextFeild
              // placeholder="نام و نام خانوادگی"
              label="نام و نام خانوادگی"
              name="name"
              register={register}
              validationSchema={{
                required: "نام و نام خانوادگی ضروری است",
              }}
              errors={errors}
            />
            <TextFeild
              // placeholder="ایمیل"
              label="ایمیل"
              name="email"
              register={register}
              validationSchema={{
                required: "ایمیل ضروری است",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "ایمیل نامعتبر است",
                },
              }}
              errors={errors}
            />
            <div>
              <label className="mb-2 block text-secondary-700">مهارت ها</label>
              <TagsInput value={tags} onChange={setTags} name="skills" />
            </div>
            <RadioInputGroup
              errors={errors}
              register={register}
              watch={watch}
              configs={{
                name: "role",
                validationSchema: { required: "انتخاب نقش ضروری است" },
                options: [
                  { label: "کارفرما", value: "OWNER" },
                  { label: "فریلنسر", value: "FREELANCER" },
                ],
              }}
            />
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
        </div>
      </div>
    </div>
  );
}
