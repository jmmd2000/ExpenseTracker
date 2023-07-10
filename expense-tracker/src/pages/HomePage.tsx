import { useState, useEffect } from "react";
import Table from "../components/Table";
import LineChart from "../components/charts/LineChart";
import { getIncomes, getExpenses } from "../firebase/db";
import Expense from "../types/Expense";
import Income from "../types/Income";
import Transaction from "../types/Transaction";
import PieChartComponent from "../components/charts/PieChart";
import { dateFilter } from "../functions/dateFilter";
import DateRangePicker from "../components/DateRangePicker";
import { fakeTransactions } from "../assets/fakedata";
import ErrorCard from "../components/ErrorCard";
import { useAuth } from "../context/AuthContext";

const parseDaysBack = (days: number, startDate?: Date, endDate?: Date) => {
  if (startDate === undefined && endDate === undefined) {
    switch (days) {
      case 7:
        return "Income and Expenses for the last week";
      case 30:
        return "Income and Expenses for the last month";
      case 90:
        return "Income and Expenses for the last 3 months";
      case 365:
        return "Income and Expenses for the last year";
      case 999999:
        return "Income and Expenses, all time";
      default:
        return "Invalid date range";
    }
  } else if (startDate === undefined && endDate !== undefined) {
    return "Invalid date range";
  } else if (startDate !== undefined && endDate === undefined) {
    return "Income and Expenses from " + parseDate(startDate) + " to now";
  } else {
    return (
      "Income and Expenses from " +
      parseDate(startDate!) +
      " to " +
      parseDate(endDate!)
    );
  }
};

const parseDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formattedDate: string = date
    .toLocaleString("en-US", options)
    .replace(",", "");
  // .replace(/(\d)(st|nd|rd|th)/, "$1$2");

  return formattedDate;
};

const HomePage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [range, setRange] = useState<number>(30);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { user } = useAuth();

  const fetchTransactions = async () => {
    let transactions: Transaction[] = [];
    const incomes = await getIncomes(user!.uid);
    const expenses = await getExpenses(user!.uid);
    transactions = [...incomes, ...expenses];

    let filteredTransactions: Transaction[] = [];

    if (startDate == undefined && endDate == undefined) {
      // If the start and end dates are undefined, then default to range
      filteredTransactions = dateFilter(transactions, range);
    } else if (startDate === undefined && endDate !== undefined) {
      // If the start date is undefined but the end date is not, error
      filteredTransactions = [];
    } else if (startDate !== undefined && endDate === undefined) {
      // If the start date is defined but the end date is not, return between start and now
      filteredTransactions = dateFilter(
        transactions,
        undefined,
        startDate,
        new Date()
      );
    } else if (startDate !== undefined && endDate !== undefined) {
      // If both start and end dates are defined, return between start and end
      filteredTransactions = dateFilter(
        transactions,
        undefined,
        startDate,
        endDate
      );
    } else if (startDate! > endDate!) {
      // If the start date is after the end date, error
      filteredTransactions = [];
    }
    // const filteredTransactions = dateFilter(transactions, range);

    filteredTransactions.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    setTransactions(filteredTransactions);
  };

  useEffect(() => {
    fetchTransactions();
  }, [range, startDate, endDate]);
  return (
    <div className="relative w-full grid grid-cols-10 grid-rows-2 gap-6">
      <DateRangePicker
        rangeCallback={setRange}
        startDateCallback={setStartDate}
        endDateCallback={setEndDate}
      />
      <div className="col-start-1 col-end-5 row-start-1 row-end-3">
        <Table transactions={transactions} />
      </div>
      <div className="col-start-5 col-end-11">
        <LineChart
          transactions={transactions}
          title={parseDaysBack(range, startDate, endDate)}
        />
      </div>
      <div className="col-start-5 col-end-8">
        <PieChartComponent
          transactions={transactions}
          displayMode={"categories"}
          daysBack={300}
          title="Expenses by Category"
        />
      </div>
      <div className="col-start-8 col-end-11">
        <PieChartComponent
          transactions={transactions}
          displayMode={"income-expense"}
          daysBack={300}
          title="Income vs Expenses"
        />
      </div>
      {/* <ErrorCard message={"No data within given range."} /> */}
    </div>
  );
};

export default HomePage;
