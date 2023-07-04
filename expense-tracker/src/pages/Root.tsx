import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const RootLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex items-center justify-center">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleOpen={handleToggleSidebar}
      />
      <div className="ml-[50px] p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
