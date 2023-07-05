import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const RootLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    // <div className="flex items-center justify-center">
    <div>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleOpen={handleToggleSidebar}
      />
      <div className="ml-[50px] pt-6 pl-6 pr-6 pb-6 bg-slate-700 h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
