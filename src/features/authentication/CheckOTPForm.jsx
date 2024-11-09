import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { checkOtp } from "../../services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { IoIosRefresh } from "react-icons/io";
import Loading from "../../ui/Loading";

const RESEND_TIME = 90;

export default function CheckOTPForm({
  phoneNumber,
  onBack,
  onReSendOtp,
  otpResponse,
}) {
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(RESEND_TIME);
  const navigate = useNavigate();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: checkOtp,
  });

  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const { message, user } = await mutateAsync({ phoneNumber, otp });
      toast.success(message);

      if (!user.isActive) return navigate("/complete-profile");
      if (user.status !== 2) {
        navigate("/");
        toast("پروفایل شما در انتظار تایید است");
        return;
      }
      if (user.role === "OWNER") navigate("/owner");
      if (user.role === "FREELANCER") navigate("/freelancer");
      if (user.role === "ADMIN") navigate("/admin");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  // console.log(otpResponse);

  useEffect(() => {
    const timer =
      time > 0 &&
      setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  console.log("otp response", otpResponse);

  return (
    <div>
      <button onClick={onBack}>
        <HiArrowRight className="w-6 h-6 text-secondary-500" />
      </button>
      <div className="flex flex-col justify-center items-center">
        <form
          className="flex flex-col items-center gap-y-4"
          onSubmit={checkOtpHandler}
        >
          <p className="font-bold text-secondary-800 text-2xl mb-8">
            کد تایید را وارد کنید
          </p>

          {otpResponse && (
            <p className="flex items-center gap-x-2">
              <button
                onClick={onBack}
                className="flex items-center gap-x-1 text-primary-900"
              >
                <CiEdit className="w-6 h-6" />
                <p>اصلاح شماره موبایل</p>
              </button>
            </p>
          )}

          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="text-secondary-800">-</span>}
            renderInput={(props) => <input type="number" {...props} />}
            containerStyle="flex flex-row-reverse gap-x-2 justify-center"
            inputStyle={{
              width: "2.5rem",
              padding: "0.5rem 0.2rem",
              border: "1px solid rgb(var(--color-primary-300))",
              borderRadius: "0.5rem",
              backgroundColor: "rgb(var(--color-secondary-0))",
              color: "rgb(var(--color-secondary-800))",
            }}
          />

          <div>
            {isPending ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className="mt-10 btn btn--primary w-[23rem]"
              >
                تایید
              </button>
            )}
          </div>

          <div className="mb-4 text-secondary-500">
            {time > 0 ? (
              <p>{time} ثانیه تا ارسال مجدد کد</p>
            ) : (
              <button
                onClick={onReSendOtp}
                className="flex items-center gap-x-1"
              >
                <IoIosRefresh className="w-5 h-5" />
                <p>ارسال مجدد کد تایید</p>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
