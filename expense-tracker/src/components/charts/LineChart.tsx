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
import ErrorCard from "../ErrorCard";

interface ChartData {
  name: string;
  income: number;
  expenses: number;
}

interface LineGraphProps {
  transactions: Transaction[];
  title: string;
}

// const convertToChartData = (
//   transactions: Transaction[] | undefined
// ): ChartData[] => {
//   const thirtyDaysAgo = new Date();
//   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 1000);

//   return (transactions ?? [])
//     .filter((transaction) => new Date(transaction.date) >= thirtyDaysAgo)
//     .map((transaction) => {
//       const { date } = transaction;
//       const income = "net" in transaction ? transaction.net : 0;
//       const expenses = "amount" in transaction ? transaction.amount : 0;
//       return { name: date, income, expenses };
//     });
// };

const convertToChartData = (
  transactions: Transaction[] | undefined
): ChartData[] => {
  const aggregatedData: {
    [date: string]: { income: number; expenses: number };
  } = {};

  (transactions ?? []).forEach((transaction) => {
    const { date } = transaction;
    const income = "net" in transaction ? transaction.net : 0;
    const expenses = "amount" in transaction ? transaction.amount : 0;

    if (date in aggregatedData) {
      aggregatedData[date].income += income;
      aggregatedData[date].expenses += expenses;
    } else {
      aggregatedData[date] = { income, expenses };
    }
  });

  return Object.entries(aggregatedData).map(([date, { income, expenses }]) => ({
    name: date,
    income,
    expenses,
  }));
};

const LineGraph: React.FC<LineGraphProps> = ({ transactions, title }) => {
  const chartData = convertToChartData(transactions);

  return (
    <div
      // className="bg-slate-900 pt-6 pr-6 pb-1 pl-3 w-full rounded-lg h-max"
      className={`bg-slate-900  w-full rounded-lg h-max ${
        transactions.length == 0
          ? "h-[428px] p-6 flex flex-col gap-4 items-center justify-center"
          : "h-max pt-6 pr-6 pb-1 pl-3"
      }`}
    >
      {/* <div className="bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 pt-6 pr-6 pb-1 pl-3 w-full h-max"> */}
      <h1 className="text-white text-xl font-semibold text-center">{title}</h1>
      {transactions.length == 0 ? (
        <ErrorCard message={"No data within given range."} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default LineGraph;
