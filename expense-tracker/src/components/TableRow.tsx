import Expense from "../types/Expense";
import Income from "../types/Income";

interface TableRowProps {
  // category: string;
  // details: string;
  // amount?: number;
  // date: string;
  // location?: string;
  // platform: string;
  // day: number;
  // month: number;
  // year: number;
  // gross?: number;
  // net?: number;
  // tax?: number;
  // from?: string;
  transaction: Income | Expense;
}

const TableRow: React.FC<TableRowProps> = ({
  // category,
  // details,
  // amount,
  // date,
  // location,
  // platform,
  // day,
  // month,
  // year,
  // gross,
  // net,
  // tax,
  // from,
  transaction,
}) => {
  return (
    <div
      className={`flex p-2 mb-1 rounded-md ${
        "amount" in transaction
          ? "bg-red-200 hover:bg-red-100"
          : "bg-green-200 hover:bg-green-100"
      }`}
    >
      <div className="w-1/5">{transaction.category}</div>

      <div className="w-1/5">
        {transaction.day}/{transaction.month}/{transaction.year}
      </div>
      <div className="w-1/5">{transaction.platform}</div>
      {"amount" in transaction && <div className="w-1/5"></div>}
      {"amount" in transaction ? (
        <div className="w-1/5">{transaction.amount}</div>
      ) : (
        <div className="w-1/5">{transaction.net}</div>
      )}
    </div>
  );
};

export default TableRow;
