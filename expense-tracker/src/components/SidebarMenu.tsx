import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CategoryIcon from "@mui/icons-material/Category";

const menuItems = [
  {
    name: "Add Expense",
    icon: (
      <TrendingDownIcon
        fontSize="large"
        className="text-red-500"
      />
    ),
    form: "expense",
  },
  {
    name: "Add Income",
    icon: (
      <TrendingUpIcon
        fontSize="large"
        className="text-green-500"
      />
    ),
    form: "income",
  },
  // {
  //   name: "Add Expense Category",
  //   icon: (
  //     <CategoryIcon
  //       fontSize="large"
  //       className="text-red-500"
  //     />
  //   ),
  //   form: "expense-c",
  // },
  // {
  //   name: "Add Income Category",
  //   icon: (
  //     <CategoryIcon
  //       fontSize="large"
  //       className="text-green-500"
  //     />
  //   ),
  //   form: "income-c",
  // },
];

interface SidebarMenuProps {
  className?: string;
  isOpen?: boolean;
  toggleOpen: () => void;
  setForm: (formName: string) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  className,
  isOpen,
  toggleOpen,
  setForm,
}) => {
  return (
    <ul className={className}>
      {menuItems.map((item) => (
        <li
          className={`flex items-center justify-start gap-4 space-x-2 p-4 rounded-lg text-white transition-all duration-300 ease-in-out ${
            isOpen ? "hover:bg-slate-700 hover:cursor-pointer" : ""
          }`}
          onClick={() => setForm(item.form)}
          key={item.name}
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
            className={`text-md transition-transform duration-100 ease-in-out transform ${
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
