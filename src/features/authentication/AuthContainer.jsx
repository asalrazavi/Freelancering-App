import { useState } from "react";
import SendOTPForm from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";

export default function AuthContainer() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            setStep={setStep}
            phonenumber={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        );

      case 2:
        return <CheckOTPForm phoneNumber={phoneNumber} />;

      default:
        return null;
    }
  };

  return <div className="w-full sm:max-w-sm">{renderStep()}</div>;
}
