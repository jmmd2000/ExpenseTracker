import { useEffect, useState } from "react";
import Expense from "../types/Expense";
import Income from "../types/Income";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableRowChip from "./TableRowChip";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteExpense, deleteIncome } from "../firebase/db";

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
      // return;
    } else {
      setClicked(!clicked);
      setOpenHeight("h-min");
    }

    // If it is an expense, the only things that can be shown on expansion
    // are location and details, both of which are optional fields.
    // So always open an income as the shown fields are always present.

    // if ("amount" in transaction) {
    //   // Expense
    //   if (transaction.location == "" && transaction.details == "") {
    //     // No details or location, no need to expand
    //   } else if (transaction.location !== "" || transaction.details !== "") {
    //     // Either details or location is present, expand
    //     console.log("Details or location");
    //     setClicked(!clicked);
    //     setOpenHeight("h-20");
    //   } else {
    //     setClicked(!clicked);
    //     setOpenHeight("h-[7.5rem]");
    //   }
    // } else {
    //   // Income
    //   if (transaction.details == "") {
    //     setClicked(!clicked);
    //     setOpenHeight("h-20");
    //   } else {
    //     setClicked(!clicked);
    //     setOpenHeight("h-[7.5rem]");
    //   }
    // }
  };

  const handleDelete = async () => {
    if ("amount" in transaction) {
      await deleteExpense(transaction);
      // location.reload();
    } else {
      await deleteIncome(transaction);
      // location.reload();
    }
  };

  return (
    <div
      className={`relative text-md p-2 mb-1 rounded-md transition-all duration-200 cursor-pointer bg-slate-900 text-slate-100 hover:bg-slate-800 grid grid-cols-6 gap-4 overflow-hidden
      ${openHeight}`}
      onClick={handleClick}
    >
      {/* // <div
    //   className={`relative p-2 mb-1 rounded-md transition-all duration-200 cursor-pointer bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 text-slate-100 hover:bg-slate-800 grid grid-cols-5 gap-4 overflow-hidden
    //   ${openHeight}`}
    //   onClick={handleClick}
    // > */}
      <div className="w-full">{transaction.category}</div>

      <div className="w-full">
        {transaction.day}/{transaction.month}/{transaction.year}
      </div>

      <div className="w-full relative">{transaction.platform} </div>
      <div className="w-full flex">
        <span
          className=" bg-red-600 rounded-lg hover:bg-red-400 mr-5"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </span>
        {shouldOpen && (
          <span className=" bg-slate-600 rounded-lg text-center">
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
                <TableRowChip
                  label={"Gross"}
                  color={"blue"}
                />
                {transaction.gross}
              </span>
              <span className="w-1/4 transition-all duration-300">
                <TableRowChip
                  label={"Net"}
                  color={"green"}
                />
                {transaction.net}
              </span>
              <span className="w-1/4 transition-all duration-300">
                <TableRowChip
                  label={"Tax"}
                  color={"red"}
                />
                {transaction.tax}
              </span>
              <span className="w-1/4 transition-all duration-300">
                <TableRowChip
                  label={"From"}
                  color={"orange"}
                />
                {transaction.from}
              </span>
            </div>
          )}
          {"amount" in transaction && transaction.location !== "" && (
            <div className="col-span-5 flex">
              <span className="w-full transition-all duration-300">
                <TableRowChip
                  label={"Location"}
                  color={"cyan"}
                />
                {transaction.location}
              </span>
            </div>
          )}
          {transaction.details !== "" && (
            <div className="col-span-5 max-h-12 transition-all duration-300">
              <span className="text-xs align-middle relative top-[-0.5em] mr-1 bg-purple-300 text-purple-800 rounded p-[2px]">
                Details
              </span>
              {transaction.details}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TableRow;
