import Expense from "../types/Expense";
import Income from "../types/Income";
import Transaction from "../types/Transaction";

export const dateFilter = (
  transactions: Transaction[],
  daysBack?: number,
  startDate?: Date,
  endDate?: Date
): Transaction[] => {
  let filteredTransactions: Transaction[] = transactions;

  if (daysBack !== undefined) {
    const today = new Date();
    const cutoffDate = new Date(today.setDate(today.getDate() - daysBack));
    filteredTransactions = filteredTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= cutoffDate;
    });
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    filteredTransactions = filteredTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= start && transactionDate <= end;
    });
  }

  return filteredTransactions;
};
