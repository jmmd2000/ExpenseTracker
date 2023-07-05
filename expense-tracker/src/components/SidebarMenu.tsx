import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";

import { Link } from "react-router-dom";

const menuItems = [
  {
    name: "Home",
    icon: <HomeIcon fontSize="large" />,
    path: "/",
  },
  {
    name: "Add Expense",
    icon: <AddIcon fontSize="large" />,
    path: "/add-expense",
  },
  {
    name: "Profile",
    icon: <PersonIcon fontSize="large" />,
    path: "/add-expense",
  },
  {
    name: "Settings",
    icon: <SettingsIcon fontSize="large" />,
    path: "/add-expense",
  },
  {
    name: "Analytics",
    icon: <AnalyticsIcon fontSize="large" />,
    path: "/add-expense",
  },
];

interface SidebarMenuProps {
  className?: string;
  isOpen?: boolean;
  toggleOpen: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  className,
  isOpen,
  toggleOpen,
}) => {
  return (
    <ul className={className}>
      {menuItems.map((item) => (
        <Link
          to={item.path}
          key={item.name}
        >
          <li
            className={`flex items-center justify-start gap-4 space-x-2 p-4 rounded-lg text-white transition-all duration-300 ease-in-out ${
              isOpen ? "hover:bg-slate-700 hover:cursor-pointer" : ""
            }`}
          >
            <span
              className={`transition-transform duration-300 ease-in-out transform p-1 ${
                isOpen
                  ? "translate-x-0 inline"
                  : "translate-x-[225px] hover:bg-slate-700 hover:cursor-pointer rounded-lg"
              }`}
              onClick={isOpen ? undefined : () => toggleOpen()}
            >
              {item.icon}
            </span>

            <span
              className={`text-lg transition-transform duration-100 ease-in-out transform ${
                isOpen ? "block" : "hidden"
              }`}
            >
              {item.name}
            </span>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default SidebarMenu;
