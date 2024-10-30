import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AppLayout({ children }) {
  return (
    <div className="grid grid-cols-[15rem_1fr] grid-rows-[auto_1fr] h-screen">
      <Header />
      {/* <Sidebar /> */}
      {children}
      <div className="bg-secondary-100 p-8 overflow-y-auto">
        <div className="mx-auto max-w-screen-lg flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
