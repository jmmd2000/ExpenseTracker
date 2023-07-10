import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarMenu from "./SidebarMenu";
import { useState } from "react";
import ExpenseForm from "./forms/ExpenseForm";
import IncomeForm from "./forms/IncomeForm";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleOpen }) => {
  const [selectedForm, setSelectedForm] = useState("");
  const { user } = useAuth();
  const { signOut } = useAuth();

  const showForm = (formName: string) => {
    setSelectedForm(formName);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-[300px] h-screen z-50 bg-slate-900 p-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "-translate-x-[250px]"
      }`}
    >
      {/* <div
      className={`fixed top-0 left-0 w-[300px] h-screen z-50 bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 p-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "-translate-x-[250px]"
      }`}
    > */}
      <span
        className={`fixed top-3 p-2 bg-slate-800 rounded-xl hover:bg-slate-600 hover:cursor-pointer transition-all duration-300 ease-in-out ${
          isOpen ? "-right-5" : "right-[6px]"
        }`}
        onClick={toggleOpen}
      >
        {!isOpen ? (
          <MenuIcon className="text-white" />
        ) : (
          <CloseIcon className="text-white" />
        )}
      </span>

      <p className="text-4xl text-center font-bold text-white">SpendWise</p>
      <p className="text-white bg-slate-800 w-max p-2 rounded-lg m-auto mt-2">
        Welcome {user!.displayName}!
      </p>
      <p
        className="text-white bg-red-800 w-max p-2 rounded-lg m-auto mt-2 hover:bg-red-600 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </p>
      {selectedForm === "expense" ? (
        <ExpenseForm setForm={showForm} />
      ) : selectedForm === "income" ? (
        <IncomeForm setForm={showForm} />
      ) : selectedForm === "expense-c" ? (
        <h1>Expense Category Form</h1>
      ) : selectedForm === "income-c" ? (
        <h1>Expense Category Form</h1>
      ) : (
        <SidebarMenu
          className="mt-20"
          isOpen={isOpen}
          toggleOpen={toggleOpen}
          setForm={showForm}
        />
      )}
    </div>
  );
};

export default Sidebar;
