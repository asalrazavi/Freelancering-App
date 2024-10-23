import { useState } from "react";
import TextFeild from "../../ui/TextFeild";
import RadioInput from "../../ui/RadioInput";
import { useMutation } from "@tanstack/react-query";
import { completeProfile } from "../../services/authService";
import toast from "react-hot-toast";
import Loading from "../../ui/Loading";
import { useNavigate } from "react-router-dom";

export default function CompleteProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  //   console.log(role);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: completeProfile,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, message } = await mutateAsync({ name, email, role });
      console.log(user, message);
      toast.success(message);

      if (user.status !== 2) {
        navigate("/");
        toast("پروفایل شما در انتظار تایید است");
        return;
      }
      if (user.role === "OWNER") navigate("/owner");
      if (user.role === "FREELANCER") navigate("/freelancer");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen container xl:max-w-screen-xl">
      <div className="flex justify-center items-center border py-10 px-5 rounded-xl shadow-xl shadow-secondary-200">
        <div className="w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            <TextFeild
              placeholder="نام و نام خانوادگی"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextFeild
              placeholder="ایمیل"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center justify-center gap-x-8">
              <RadioInput
                name="role"
                label="کارفرما"
                value="OWNER"
                id="OWNER"
                onChange={(e) => setRole(e.target.value)}
                checked={role === "OWNER"}
              />
              <RadioInput
                name="role"
                label="فریلنسر"
                value="FREELANCER"
                id="FREELANCER"
                onChange={(e) => setRole(e.target.value)}
                checked={role === "FREELANCER"}
              />
            </div>
            {isPending ? (
              <Loading />
            ) : (
              <button type="submit" className="btn btn--primary w-full">
                تایید
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
