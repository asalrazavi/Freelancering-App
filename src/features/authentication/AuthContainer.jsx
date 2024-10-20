import { useState } from "react";
import SendOTPForm from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";
import { useMutation } from "@tanstack/react-query";
import { getOtp } from "../../services/authService";
import toast from "react-hot-toast";

export default function AuthContainer() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const {
    isPending,
    mutateAsync,
    data: otpResponse,
  } = useMutation({
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            onSubmit={SendOtpHandler}
            isSendOtp={isPending}
            setStep={setStep}
            phonenumber={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        );

      case 2:
        return (
          <CheckOTPForm
            onReSendOtp={SendOtpHandler}
            phoneNumber={phoneNumber}
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
