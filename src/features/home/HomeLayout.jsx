import { Outlet } from "react-router-dom";
import Header from "../../ui/Header";

export default function HomeLayout({ children }) {
  return (
    <div className="grid grid-cols-[1fr] grid-rows-[auto_1fr] h-screen">
      <Header />
      {children}
      <div className="bg-secondary-100 p-8 overflow-y-auto">
        <div className="mx-auto max-w-screen-lg flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
