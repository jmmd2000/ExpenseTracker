import { useEffect, useState } from "react";
import Expense from "../types/Expense";
import Income from "../types/Income";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { set } from "firebase/database";

interface TableRowProps {
  transaction: Income | Expense;
}

const TableRow: React.FC<TableRowProps> = ({ transaction }) => {
  const [clicked, setClicked] = useState(false);
  const [openHeight, setOpenHeight] = useState("h-10");
  const [shouldOpen, setShouldOpen] = useState(false);

  useEffect(() => {
    if ("amount" in transaction) {
      if (transaction.location !== "" || transaction.details !== "") {
        setShouldOpen(true);
      }
    } else {
      setShouldOpen(true);
    }
  }, [transaction]);

  const handleClick = () => {
    if (openHeight !== "h-10") {
      setClicked(!clicked);
      setOpenHeight("h-10");
      return;
    }

    // If it is an expense, the only things that can be shown on expansion
    // are location and details, both of which are optional fields.
    // So always open an income as the shown fields are always present.

    if ("amount" in transaction) {
      // Expense
      if (transaction.location == "" && transaction.details == "") {
        // No details or location, no need to expand
      } else if (transaction.location !== "" || transaction.details !== "") {
        // Either details or location is present, expand
        console.log("Details or location");
        setClicked(!clicked);
        setOpenHeight("h-20");
      } else {
        setClicked(!clicked);
        setOpenHeight("h-[7.5rem]");
      }
    } else {
      // Income
      if (transaction.details == "") {
        setClicked(!clicked);
        setOpenHeight("h-20");
      } else {
        setClicked(!clicked);
        setOpenHeight("h-[7.5rem]");
      }
    }
  };

  return (
    <div
      className={`relative p-2 mb-1 rounded-md transition-all duration-200 cursor-pointer bg-slate-900 text-slate-100 hover:bg-slate-800 grid grid-cols-5 gap-4
      ${openHeight}`}
      onClick={handleClick}
    >
      <div className="w-full">{transaction.category}</div>

      <div className="w-full">
        {transaction.day}/{transaction.month}/{transaction.year}
      </div>

      <div className="w-full relative">
        {transaction.platform}{" "}
        {shouldOpen && (
          <span className="absolute left-20 bg-slate-600 rounded-lg">
            {clicked ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </span>
        )}
      </div>

      {"net" in transaction && <div className="w-1/5"></div>}

      {"amount" in transaction ? (
        <div className="w-full h-6 bg-red-300 text-red-800 text-center rounded">
          {transaction.amount}
        </div>
      ) : (
        <div className="w-full h-6 bg-green-300 text-green-800 text-center rounded">
          {transaction.net}
        </div>
      )}

      {"amount" in transaction && <div className="w-1/5"></div>}

      {clicked && (
        <>
          {"net" in transaction && (
            <div className="col-span-5 flex">
              <span className="w-1/4 transition-all duration-300">
                <span className="text-xs align-middle relative top-[-0.5em] mr-1 bg-blue-300 text-blue-800 rounded p-[2px]">
                  Gross
                </span>
                {transaction.gross}
              </span>
              <span className="w-1/4 transition-all duration-300">
                <span className="text-xs align-middle relative top-[-0.5em] mr-1 bg-green-300 text-green-800 rounded p-[2px]">
                  Net
                </span>
                {transaction.net}
              </span>
              <span className="w-1/4 transition-all duration-300">
                <span className="text-xs align-middle relative top-[-0.5em] mr-1 bg-red-300 text-red-800 rounded p-[2px]">
                  Tax
                </span>
                {transaction.tax}
              </span>
              <span className="w-1/4 transition-all duration-300">
                {transaction.from}
              </span>
            </div>
          )}
          {"amount" in transaction && transaction.location !== "" && (
            <div className="col-span-5 flex">
              <span className="w-1/4 transition-all duration-300">
                {transaction.location}
              </span>
            </div>
          )}
          {transaction.details !== "" && (
            <div className="col-span-5 max-h-12 transition-all duration-300 overflow-hidden">
              {transaction.details}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TableRow;
