import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import Logout from "../features/authentication/Logout";
import { RxDashboard } from "react-icons/rx";
import useUser from "../features/authentication/useUser";

const dashboards = {
  FREELANCER: "/freelancer",
  OWNER: "/owner",
  ADMIN: "/admin",
};

export default function HeaderMenu() {
  const { user } = useUser();
  const dashboardPath =
    user && dashboards[user.role] ? dashboards[user.role] : "/dashboard";

  return (
    <ul className="flex gap-x-4 items-center">
      <li className="flex">
        <Link to={dashboardPath}>
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
