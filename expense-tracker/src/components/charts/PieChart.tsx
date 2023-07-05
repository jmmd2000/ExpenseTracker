import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Expense from "../../types/Expense";
import Transaction from "../../types/Transaction";
import { randomTailwindColors } from "../../functions/randomTailwindColors";
import Income from "../../types/Income";

interface PieChartProps {
  transactions: Transaction[];
  displayMode: "income-expense" | "categories";
  daysBack: number;
  title: string;
}

const PieChartComponent: React.FC<PieChartProps> = ({
  transactions,
  displayMode,
  daysBack,
  title,
}) => {
  let filteredTransactions: Transaction[] = [...transactions];

  if (daysBack > 0) {
    const today = new Date();
    const cutoffDate = new Date(
      today.getTime() - daysBack * 24 * 60 * 60 * 1000
    );

    filteredTransactions = filteredTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= cutoffDate;
    });
  }

  let data: { name: string; value: number }[] = [];

  if (displayMode === "income-expense") {
    const totalIncome = filteredTransactions
      .filter((transaction): transaction is Income => "gross" in transaction)
      .reduce((sum, income) => sum + income.net, 0);

    const totalExpense = filteredTransactions
      .filter((transaction): transaction is Expense => "amount" in transaction)
      .reduce((sum, expense) => sum + (expense as Expense).amount, 0);

    data = [
      { name: "Income", value: parseFloat(totalIncome.toFixed(2)) },
      { name: "Expenses", value: parseFloat(totalExpense.toFixed(2)) },
    ];
  } else if (displayMode === "categories") {
    const expenseCategories = filteredTransactions
      .filter(
        (transaction): transaction is Expense => "category" in transaction
      )
      .map((transaction) => (transaction as Expense).category);

    const uniqueCategories = Array.from(new Set(expenseCategories));

    data = uniqueCategories.map((category) => {
      const totalAmount = filteredTransactions
        .filter(
          (transaction) =>
            "category" in transaction &&
            transaction.category === category &&
            "amount" in transaction
        )
        .reduce((sum, expense) => sum + (expense as Expense).amount, 0);

      return { name: category, value: parseFloat(totalAmount.toFixed(2)) };
    });
  }

  const colors =
    displayMode === "income-expense"
      ? ["#4ade80", "#f87171"]
      : randomTailwindColors();

  return (
    <div className="bg-slate-900 pt-6 pr-6 pb-1 pl-3 w-full rounded-lg h-max">
      <h1 className="text-white text-xl font-semibold text-center">{title}</h1>
      <ResponsiveContainer
        width="100%"
        height={372}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
            stroke="#fff"
            strokeWidth={1}
          >
            {data.map((_entry, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
