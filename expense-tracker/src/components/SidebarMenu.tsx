import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";

const menuItems = [
  {
    name: "Dashboard",
    icon: <DashboardIcon fontSize="large" />,
  },
  {
    name: "Profile",
    icon: <PersonIcon fontSize="large" />,
  },
  {
    name: "Settings",
    icon: <SettingsIcon fontSize="large" />,
  },
  {
    name: "Analytics",
    icon: <AnalyticsIcon fontSize="large" />,
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
        <li
          key={item.name}
          className={`flex items-center justify-start gap-4 space-x-2 p-4 rounded-lg text-white transition-all duration-300 ease-in-out ${
            isOpen ? "hover:bg-slate-600 hover:cursor-pointer" : ""
          }`}
        >
          <span
            className={`transition-transform duration-300 ease-in-out transform p-1 ${
              isOpen
                ? "translate-x-0 inline"
                : "translate-x-[225px] hover:bg-slate-600 hover:cursor-pointer rounded-lg"
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
      ))}
    </ul>
  );
};

export default SidebarMenu;
