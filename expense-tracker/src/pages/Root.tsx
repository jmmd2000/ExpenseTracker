import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import HomePage from "./HomePage";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../context/AuthContext";

const RootLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { signInWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {user ? (
        <div>
          <Sidebar
            isOpen={isSidebarOpen}
            toggleOpen={handleToggleSidebar}
          />
          <div className="ml-[50px] pt-6 pl-6 pr-6 pb-6 bg-slate-700 h-screen">
            {/* <div className="pl-[60px] pt-6 pl-6 pr-6 pb-6 bg-gradient-to-r from-green-300 via-blue-500 to-purple-700 h-screen"> */}
            <HomePage />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-start gap-10 bg-slate-700 h-screen">
          <div className="text-4xl m-20 font-bold text-center text-white">
            Welcome to
            <span className="text-green-400"> Spend</span>
            <span className="text-red-400">Wise</span>
          </div>
          <div className="text-2xl text-center m-10 text-white">
            Please login to continue.
          </div>
          <div
            className="bg-blue-500 text-white w-max p-2 rounded-lg self-center cursor-pointer hover:bg-blue-600"
            onClick={handleLogin}
          >
            <GoogleIcon /> Login with Google
          </div>
        </div>
      )}
    </>
  );
};

export default RootLayout;
