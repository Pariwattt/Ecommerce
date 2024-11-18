import { Outlet } from "react-router-dom";
import NavbarMain from "./navbars/navbar.main";
import SidebarMain from "./sidebars/sidebar.main";
import { useState } from "react";

const MainLayout = () => {
  //state
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className=" h-screen">
      <Outlet />
    </div>
  );
};

export default MainLayout;
