import { useState, useEffect } from "react";
import Table from "../components/Table";
import LineChart from "../components/charts/LineChart";
import { getIncomes, getExpenses } from "../firebase/db";
import Expense from "../types/Expense";
import Income from "../types/Income";
import Transaction from "../types/Transaction";
import PieChartComponent from "../components/charts/PieChart";
import { dateFilter } from "../functions/dateFilter";

const parseDaysBack = (days: number) => {
  switch (days) {
    case 7:
      return "for the last week";
    case 30:
      return "for the last month";
    case 90:
      return "for the last 3 months";
    case 365:
      return "for the last year";
    case 999999:
      return "for all time";
  }
};

const HomePage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [range, setRange] = useState<number>(999999);

  const fetchTransactions = async () => {
    // let transactions: Transaction[] = [];
    // const incomes = await getIncomes("");
    // const expenses = await getExpenses("");
    // transactions = [...incomes, ...expenses];

    const transactions: Transaction[] = [
      {
        category: "Food",
        details: "Lunch",
        amount: 10.99,
        day: 12,
        month: 4,
        year: 2023,
        date: "2023-04-12",
        location: "Restaurant",
        platform: "PTSB",
        userID: "",
      },
      {
        category: "Rent",
        details: "Monthly rent payment",
        amount: 1000,
        day: 8,
        month: 6,
        year: 2023,
        date: "2023-06-08",
        location: "Home",
        platform: "Revolut",
        userID: "",
      },
      {
        category: "Entertainment",
        details: "Movie tickets",
        amount: 25.5,
        day: 15,
        month: 7,
        year: 2023,
        date: "2023-07-5",
        location: "Cinema",
        platform: "Cash",
        userID: "",
      },
      {
        category: "Transfers",
        details: "Transfer to friend",
        amount: 50,
        day: 21,
        month: 7,
        year: 2023,
        date: "2023-02-21",
        location: "Bank",
        platform: "PTSB",
        userID: "",
      },
      {
        category: "Utilities",
        details: "Electricity bill",
        amount: 75.8,
        day: 5,
        month: 8,
        year: 2023,
        date: "2023-02-05",
        location: "Home",
        platform: "Revolut",
        userID: "",
      },
      {
        category: "Rent",
        details: "Monthly rent payment",
        amount: 1000,
        day: 1,
        month: 9,
        year: 2023,
        date: "2023-01-01",
        location: "Home",
        platform: "Cash",
        userID: "",
      },
      {
        category: "Clothing",
        details: "New shoes",
        amount: 80.5,
        day: 10,
        month: 9,
        year: 2023,
        date: "2023-03-10",
        location: "Mall",
        platform: "PTSB",
        userID: "",
      },
      {
        category: "Groceries",
        details: "",
        amount: 45.75,
        day: 18,
        month: 9,
        year: 2023,
        date: "2022-09-18",
        location: "Supermarket",
        platform: "Revolut",
        userID: "",
      },
      {
        category: "Online",
        details: "Online purchase",
        amount: 60.99,
        day: 25,
        month: 9,
        year: 2023,
        date: "2023-04-25",
        location: "",
        platform: "Cash",
        userID: "",
      },
      {
        category: "Food",
        details: "Dinner",
        amount: 30.5,
        day: 2,
        month: 10,
        year: 2023,
        date: "2023-05-02",
        location: "Restaurant",
        platform: "PTSB",
        userID: "",
      },
      {
        category: "Entertainment",
        details: "Concert tickets",
        amount: 75,
        day: 10,
        month: 10,
        year: 2023,
        date: "2023-06-10",
        location: "Arena",
        platform: "Revolut",
        userID: "",
      },
      {
        category: "Transfers",
        details: "Transfer to family",
        amount: 100,
        day: 18,
        month: 10,
        year: 2023,
        date: "2023-01-18",
        location: "Bank",
        platform: "Cash",
        userID: "",
      },
      {
        category: "Utilities",
        details: "Water bill",
        amount: 55.25,
        day: 25,
        month: 10,
        year: 2023,
        date: "2023-02-25",
        location: "Home",
        platform: "PTSB",
        userID: "",
      },
      {
        category: "Rent",
        details: "Monthly rent payment",
        amount: 1000,
        day: 1,
        month: 11,
        year: 2023,
        date: "2021-11-01",
        location: "Home",
        platform: "Revolut",
        userID: "",
      },
      {
        category: "Clothing",
        details: "New shirt",
        amount: 35.99,
        day: 8,
        month: 11,
        year: 2023,
        date: "2022-11-08",
        location: "Mall",
        platform: "Cash",
        userID: "",
      },
      {
        category: "Groceries",
        details: "",
        amount: 65.25,
        day: 15,
        month: 11,
        year: 2023,
        date: "2022-11-15",
        location: "Supermarket",
        platform: "PTSB",
        userID: "",
      },
      {
        category: "Online",
        details: "Online purchase",
        amount: 40.5,
        day: 22,
        month: 11,
        year: 2023,
        date: "2023-06-22",
        location: "",
        platform: "Revolut",
        userID: "",
      },
      {
        category: "Food",
        details: "Breakfast",
        amount: 8.99,
        day: 1,
        month: 12,
        year: 2023,
        date: "2023-02-01",
        location: "Cafeteria",
        platform: "Cash",
        userID: "",
      },
      {
        category: "Entertainment",
        details: "Movie tickets",
        amount: 20,
        day: 8,
        month: 12,
        year: 2023,
        date: "2023-04-08",
        location: "Cinema",
        platform: "PTSB",
        userID: "",
      },
      {
        category: "Transfers",
        details: "Transfer to friend",
        amount: 50,
        day: 15,
        month: 12,
        year: 2023,
        date: "2023-06-15",
        location: "Bank",
        platform: "Revolut",
        userID: "",
      },
      {
        category: "Utilities",
        details: "Gas bill",
        amount: 40.75,
        day: 22,
        month: 12,
        year: 2023,
        date: "2023-03-22",
        location: "Home",
        platform: "Cash",
        userID: "",
      },
      {
        category: "Work",
        details: "Salary",
        gross: 5000,
        net: 4000,
        tax: 1000,
        day: 5,
        month: 9,
        year: 2023,
        date: "2023-02-05",
        from: "Ericsson",
        platform: "Revolut",
        userID: "",
      },
      {
        category: "Work",
        details: "Freelance Payment",
        gross: 1500,
        net: 1200,
        tax: 300,
        day: 12,
        month: 9,
        year: 2023,
        date: "2023-02-12",
        from: "Ericsson",
        platform: "Cash",
        userID: "",
      },
      {
        category: "Work",
        details: "Consulting Fee",
        gross: 2000,
        net: 1600,
        tax: 400,
        day: 18,
        month: 9,
        year: 2023,
        date: "2023-02-18",
        from: "Ericsson",
        platform: "PTSB",
        userID: "",
      },
      {
        category: "Work",
        details: "Bonus",
        gross: 1000,
        net: 800,
        tax: 200,
        day: 25,
        month: 9,
        year: 2023,
        date: "2023-02-25",
        from: "Ericsson",
        platform: "Revolut",
        userID: "",
      },
      {
        category: "Work",
        details: "Commission",
        gross: 2500,
        net: 2000,
        tax: 500,
        day: 3,
        month: 10,
        year: 2023,
        date: "2023-06-03",
        from: "Ericsson",
        platform: "Cash",
        userID: "",
      },
    ];

    const filteredTransactions = dateFilter(transactions, range);

    filteredTransactions.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    setTransactions(filteredTransactions);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <div className="w-full grid grid-cols-10 grid-rows-2 gap-6">
      <div className="col-start-1 col-end-5 row-start-1 row-end-3">
        <Table transactions={transactions} />
      </div>
      <div className="col-start-5 col-end-11">
        <LineChart
          transactions={transactions}
          title={`Income and Expenses ${parseDaysBack(range)}`}
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
    </div>
  );
};

export default HomePage;
