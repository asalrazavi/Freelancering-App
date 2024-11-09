import { Link } from "react-router-dom";
import useUser from "./useUser";

export default function UserAvatar() {
  const { user } = useUser();

  // console.log(user);

  return (
    <div className="flex items-center gap-x-2 text-secondary-600">
      <img
        className="w-7 h-7 rounded-full object-cover object-center"
        src="/user.jpg"
        alt="user-account"
      />
      {user ? (
        <span>{user?.name}</span>
      ) : (
        <span className="text-sm">
          <Link to={`auth`}>ورود</Link>
        </span>
      )}
    </div>
  );
}
