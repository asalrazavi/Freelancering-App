import { useMutation } from "@tanstack/react-query";
import TextFeild from "../../ui/TextFeild";
import { useState } from "react";
import { getOtp } from "../../services/authService";
import toast from "react-hot-toast";
import Loading from "../../ui/Loading";

export default function SendOTPForm({ setStep }) {
  const [phonenumber, setPhonenumber] = useState("");

  const { isPending, error, data, mutateAsync } = useMutation({
    mutationFn: getOtp,
  });

  const SendOtpHandler = async (e) => {
    e.preventDefault();
    console.log("Sending OTP for phonenumber:", phonenumber); // Log phonenumber
    try {
      const data = await mutateAsync({ phonenumber });
      setStep(2);
      console.log(data.message);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };

  return (
    <div>
      <form className="space-y-8" onSubmit={SendOtpHandler}>
        <TextFeild
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          name="phonenumber"
          label="شماره موبایل"
        />
        <div>
          {isPending ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              ارسال کد تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
