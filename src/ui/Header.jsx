import UserAvatar from "../features/authentication/UserAvatar";
import useUser from "../features/authentication/useUser";
import HeaderMenu from "./HeaderMenu";
import HeaderSecondMenu from "./HeaderSecondMenu";

export default function Header() {
  const { isLoading } = useUser();
  return (
    <div className="flex justify-between bg-secondary-0 py-4 px-8 border-b border-secondary-200">
      <div
        className={`container xl:max-w-screen-lg flex items-center justify-start gap-x-8`}
      >
        <HeaderSecondMenu />
      </div>
      <div
        className={`container xl:max-w-screen-lg flex items-center justify-end gap-x-8
          ${isLoading ? "blur-sm opacity-50" : ""}`}
      >
        <UserAvatar />
        <HeaderMenu />
      </div>
    </div>
  );
}
