import { Outlet } from "react-router-dom";
import TopNavbar from "./navbar/top/TopNavbar";
import SideNavbar from "./navbar/side/SideNavbar";

const AppLayout = () => (
  <>
    <TopNavbar />
    <div className="max-w-7xl mx-auto p-4 py-8 flex">
      <SideNavbar />
      <main className="w-full mt-16 md:ml-52 text-neutral-100 min-w-0">
        <Outlet />
      </main>
    </div>
  </>
);

export default AppLayout;
