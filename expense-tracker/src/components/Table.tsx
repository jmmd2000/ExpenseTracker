import { useEffect, useState } from "react";
import { getExpenses, getIncomes } from "../firebase/db";
import Expense from "../types/Expense";
import Income from "../types/Income";
import TableRow from "./TableRow";

const Table: React.FC = () => {
  type Transaction = Income | Expense;
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      let transactions: Transaction[] = [];
      const incomes = await getIncomes("");
      const expenses = await getExpenses("");
      transactions = [...incomes, ...expenses];

      transactions.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getSeconds() - dateB.getSeconds();
      });
      console.log(transactions);
      setTransactions(transactions);
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-w-[550px] max-w-[550px]">
      {transactions.map((transaction) => {
        return <TableRow transaction={transaction} />;
      })}
    </div>
  );
};

export default Table;
