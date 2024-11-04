import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import Logout from "../features/authentication/Logout";
import useUser from "../features/authentication/useUser";
import { RxDashboard } from "react-icons/rx";

export default function HeaderMenu() {
  const { user } = useUser();
  // console.log(user.role.toLowerCase()); //user.role = "ADMIN" => "admin"
  const role = user.role.toLowerCase();

  return (
    <ul className="flex gap-x-4 items-center">
      <li className="flex">
        <Link to={`${role}/dashboard`}>
          <RxDashboard className="w-5 h-5 text-primary-900" />
        </Link>
      </li>
      <li className="flex">
        <DarkModeToggle />
      </li>
      <li className="flex">
        <Logout />
      </li>
    </ul>
  );
}
