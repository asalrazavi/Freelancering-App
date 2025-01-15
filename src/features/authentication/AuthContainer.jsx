import { useState } from "react";
import SendOTPForm from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";
import { useMutation } from "@tanstack/react-query";
import { getOtp } from "../../services/authService";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
// import useUser from "./useUser";
// import { useNavigate } from "react-router-dom";

export default function AuthContainer() {
  // const navigate = useNavigate();
  const [step, setStep] = useState(1);
  // const [phoneNumber, setPhoneNumber] = useState("");
  const { register, handleSubmit, getValues } = useForm();
  const {
    isPending,
    mutateAsync,
    data: otpResponse,
  } = useMutation({
    mutationFn: getOtp,
  });
  // const { user } = useUser();

  // useEffect(() => {
  //   if (user) navigate("/", { replace: true });
  // }, [user, navigate]);

  const SendOtpHandler = async (data) => {
    // e.preventDefault();
    // console.log("Sending OTP for phoneNumber:", phoneNumber);
    try {
      const { message } = await mutateAsync(data);
      setStep(2);
      // console.log(message);
      toast.success(message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            onSubmit={handleSubmit(SendOtpHandler)}
            isSendOtp={isPending}
            setStep={setStep}
            register={register}
            // phonenumber={phoneNumber}
            // onChange={(e) => setPhoneNumber(e.target.value)}
          />
        );

      case 2:
        return (
          <CheckOTPForm
            onReSendOtp={handleSubmit(SendOtpHandler)}
            phoneNumber={getValues("phoneNumber")}
            onBack={() => setStep((s) => s - 1)}
            otpResponse={otpResponse}
          />
        );
      default:
        return null;
    }
  };

  return <div className="w-full sm:max-w-sm">{renderStep()}</div>;
}
