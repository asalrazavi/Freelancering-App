import TextFeild from "../../ui/TextFeild";
import Loading from "../../ui/Loading";

export default function SendOTPForm({
  onSubmit,
  phoneNumber,
  onChange,
  isSendOtp,
}) {
  return (
    <div>
      <form className="flex flex-col items-center gap-y-4" onSubmit={onSubmit}>
        <h2 className="font-bold text-secondary-800 text-2xl">
          ورود یا ثبت نام
        </h2>
        <p className="mb-4">برای ادامه شماره موبایل خود را وارد کنید.</p>
        <TextFeild
          value={phoneNumber}
          onChange={onChange}
          placeholder={"شماره موبایل"}
          name="phoneNumber"
          // label="شماره موبایل"
        />
        <div>
          {isSendOtp ? (
            <Loading />
          ) : (
            <button type="submit" className="mt-10 btn btn--primary w-[23rem]">
              ارسال کد تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
