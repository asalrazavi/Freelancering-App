// import CheckOTPForm from "../features/authentication/CheckOTPForm";
import AuthContainer from "../features/authentication/AuthContainer";

export default function Auth() {
  return (
    <div className="flex justify-center items-center h-screen container xl:max-w-screen-xl">
      <div className="py-10 px-5 border rounded-xl shadow-xl shadow-secondary-200">
        <AuthContainer />
      </div>
    </div>
  );
}
