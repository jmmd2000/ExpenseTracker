import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarMenu from "./SidebarMenu";

interface SidebarProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleOpen }) => {
  return (
    <div
      className={` top-0 left-0 w-[300px] h-screen bg-slate-700 p-3 transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "-translate-x-[250px]"
      }`}
    >
      <span
        className={`fixed top-3  p-2 bg-slate-800 rounded-xl hover:bg-slate-600 hover:cursor-pointer transition-all duration-300 ease-in-out ${
          !isOpen ? "-right-5" : "right-3"
        }`}
        onClick={toggleOpen}
      >
        {!isOpen ? (
          <MenuIcon className="text-white" />
        ) : (
          <CloseIcon className="text-white" />
        )}
      </span>

      <p className="text-4xl text-left font-bold text-white">TaskFlow</p>

      <SidebarMenu
        className="mt-20"
        isOpen={isOpen}
        toggleOpen={toggleOpen}
      />
    </div>
  );
};

export default Sidebar;
