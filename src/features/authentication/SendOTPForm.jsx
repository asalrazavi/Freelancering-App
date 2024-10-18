import TextFeild from "../../ui/TextFeild";
import { useState } from "react";

export default function SendOTPForm() {
  const [phonenumber, setPhonenumber] = useState("");
  return (
    <div>
      <form action="" className="space-y-8">
        <TextFeild
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          name="phonenumber"
          label="شماره موبایل"
        />
        <button className="btn btn--primary w-full">ارسال کد تایید</button>
      </form>
    </div>
  );
}
