import { useEffect, useState } from "react";
import { getExpenses, getIncomes } from "../firebase/db";
import Expense from "../types/Expense";
import Income from "../types/Income";
import Transaction from "../types/Transaction";
import TableRow from "./TableRow";

interface TableProps {
  transactions: Transaction[];
}

const Table: React.FC<TableProps> = ({ transactions }) => {
  return (
    <>
      {transactions.length !== 0 ? (
        <div className="w-full max-h-[95vh] overflow-y-auto scrollbar scrollbar-thumb-slate-800 scrollbar-track-slate-700  scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg">
          {transactions.map((transaction) => {
            return (
              <TableRow
                transaction={transaction}
                key={Math.random()}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full max-h-[95vh] animate-pulse bg-slate-300 rounded-2xl"></div>
      )}
    </>
  );
};

export default Table;
