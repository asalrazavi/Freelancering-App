import { HiMiniComputerDesktop } from "react-icons/hi2";
import { MdOutlineWorkOutline } from "react-icons/md";
import { Link } from "react-router-dom";

export default function HeaderSecondMenu() {
  return (
    <ul className="flex gap-x-6 items-end text-secondary-600">
      <li>
        <Link to={`dashboard`} className="flex gap-x-2">
          <MdOutlineWorkOutline className="w-5 h-5" />
          <h2>کارفرمایان</h2>
        </Link>
      </li>
      <li>
        <Link to={`freelancers`} className="flex gap-x-2">
          <HiMiniComputerDesktop className="w-5 h-5" />
          <h2>فریلنسر ها</h2>
        </Link>
      </li>
      <li>
        <Link to={`help`} className="flex gap-x-2">
          <h2>راهنما</h2>
        </Link>
      </li>
    </ul>
  );
}
