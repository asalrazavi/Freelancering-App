import { useMutation } from "@tanstack/react-query";
import TextFeild from "../../ui/TextFeild";
import { getOtp } from "../../services/authService";
import toast from "react-hot-toast";
import Loading from "../../ui/Loading";

export default function SendOTPForm({ setStep, phoneNumber, onChange }) {
  const { isPending, error, data, mutateAsync } = useMutation({
    mutationFn: getOtp,
  });

  const SendOtpHandler = async (e) => {
    e.preventDefault();
    console.log("Sending OTP for phoneNumber:", phoneNumber);
    try {
      const data = await mutateAsync({ phoneNumber });
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
          value={phoneNumber}
          onChange={onChange}
          name="phoneNumber"
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
