import { HiCollection, HiHome } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="row-span-2 row-start-1 bg-secondary-0 border-l border-gray-200 p-4">
      <ul className="flex flex-col gap-y-4">
        <li>
          <CustomNavLikn to="/owner/dashboard">
            <HiHome />
            <span>خانه</span>
          </CustomNavLikn>
        </li>
        <li>
          <CustomNavLikn to="/owner/projects">
            <HiCollection />
            <span>پروژه ها</span>
          </CustomNavLikn>
        </li>
      </ul>
    </div>
  );
}

function CustomNavLikn({ children, to }) {
  const navlinkClass =
    "flex flex-row gap-x-2 items-center hover:bg-primary-100/50 hover:text-primary-900 px-2 py-1.5 rounded-lg transition-all duration-300";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `${navlinkClass} bg-primary-100/50 text-primary-900`
          : `${navlinkClass} text-secondary-600`
      }
    >
      {children}
    </NavLink>
  );
}
