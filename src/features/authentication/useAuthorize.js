import { useLocation } from "react-router-dom";
import useUser from "./useUser";

export default function useAuthorize() {
  const { isLoading, user } = useUser();
  const { pathname } = useLocation();

  //   console.log(pathname);

  let isAuthenticated = false;
  if (user) isAuthenticated = true;

  let isAuthorized = false;

  let isVerified = false;
  if (user && Number(user.status) === 2) isVerified = true;
  //   if (pathname.includes("owner")) {
  //     if (user && user.role === "OWNER") isAuthorized = true;
  //   }

  //   if (pathname.includes("freelancer")) {
  //     if (user && user.role === "FREELANCER") isAuthorized = true;
  //   }

  //   if (pathname.includes("admin")) {
  //     if (user && user.role === "ADMIN") isAuthorized = true;
  //   }

  const desiredRole = pathname.split("/").at(1); //freelance

  const ROLES = {
    admin: "ADMIN",
    freelancer: "FREELANCER",
    owner: "OWNER",
  };

  if (Object.keys(ROLES).includes(desiredRole)) {
    if (user && user.role === ROLES[desiredRole]) isAuthorized = true;
  }

  return { isLoading, isAuthenticated, isAuthorized, isVerified };
}
