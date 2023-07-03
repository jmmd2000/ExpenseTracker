import { Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const RootLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleOpen={handleToggleSidebar}
      />
      <button onClick={handleToggleSidebar}>Toggle Sidebar</button>
    </div>
  );
};

export default RootLayout;
