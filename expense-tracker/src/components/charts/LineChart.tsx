import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import Transaction from "../../types/Transaction";

interface ChartData {
  name: string;
  income: number;
  expenses: number;
}

interface LineGraphProps {
  transactions: Transaction[];
  title: string;
}

const convertToChartData = (
  transactions: Transaction[] | undefined
): ChartData[] => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 1000);

  return (transactions ?? [])
    .filter((transaction) => new Date(transaction.date) >= thirtyDaysAgo)
    .map((transaction) => {
      const { date } = transaction;
      const income = "net" in transaction ? transaction.net : 0;
      const expenses = "amount" in transaction ? transaction.amount : 0;
      return { name: date, income, expenses };
    });
};

const LineGraph: React.FC<LineGraphProps> = ({ transactions, title }) => {
  const chartData = convertToChartData(transactions);

  return (
    <div className="bg-slate-900 pt-6 pr-6 pb-1 pl-3 w-full rounded-lg h-max">
      <h1 className="text-white text-xl font-semibold text-center">{title}</h1>
      <ResponsiveContainer
        width={"100%"}
        height={372}
      >
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="1 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="#4ade80"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="#f87171"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
