import Expense from "../types/Expense";
import Income from "../types/Income";

const getRandomCategory = (): string => {
  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Transfers",
    "Utilities",
    "Rent",
    "Clothing",
    "Groceries",
    "Online",
    "Other",
  ];
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
};

const getRandomPlatform = (): string => {
  const platforms = ["PTSB", "Revolut", "Cash"];
  const randomIndex = Math.floor(Math.random() * platforms.length);
  return platforms[randomIndex];
};

const getRandomShortDescription = (): string => {
  const descriptions = [
    "Random expense",
    "Shopping",
    "Dining out",
    "Travel",
    "Bills",
    "Rent",
    "Groceries",
    "Online purchase",
    "Other expense",
  ];
  const randomIndex = Math.floor(Math.random() * descriptions.length);
  return descriptions[randomIndex];
};

const generateExpenses = (): Expense[] => {
  const expenses: Expense[] = [];

  const currentDate = new Date("2023-07-08");
  const startDate = new Date("2021-07-08");

  const currentDateCopy = new Date(startDate);
  while (currentDateCopy <= currentDate) {
    const expenseCount = Math.floor(Math.random() * 5) + 1; // Random number of expenses per day

    for (let i = 0; i < expenseCount; i++) {
      const expense: Expense = {
        category: getRandomCategory(),
        details: getRandomShortDescription(),
        amount: Math.random() * 1000, // Random expense amount
        day: currentDateCopy.getDate(),
        month: currentDateCopy.getMonth() + 1, // Months are zero-based, so add 1
        year: currentDateCopy.getFullYear(),
        date: currentDateCopy.toISOString().split("T")[0],
        location: "Random location",
        platform: getRandomPlatform(),
        userID: "",
      };

      expenses.push(expense);
    }

    currentDateCopy.setDate(currentDateCopy.getDate() + 1);
  }

  return expenses;
};

const generateIncomes = (): Income[] => {
  const incomes: Income[] = [];

  const currentDate = new Date("2023-07-08");
  const startDate = new Date("2021-07-08");

  const currentDateCopy = new Date(startDate);
  while (currentDateCopy <= currentDate) {
    const gross = Math.random() * 5000;
    const net = Math.random() * 5000;
    const tax = gross - net;
    if (currentDateCopy.getDate() === 1) {
      const income: Income = {
        category: "Work",
        details: getRandomShortDescription(),
        gross: gross, // Random income amount
        net: net, // Random net income amount
        tax: tax, // Assuming no tax in this example
        day: currentDateCopy.getDate(),
        month: currentDateCopy.getMonth() + 1, // Months are zero-based, so add 1
        year: currentDateCopy.getFullYear(),
        date: currentDateCopy.toISOString().split("T")[0],
        from: "Ericsson",
        platform: "PTSB",
        userID: "",
      };

      incomes.push(income);
    }

    currentDateCopy.setDate(currentDateCopy.getDate() + 1);
  }

  return incomes;
};

// Generate two years worth of data
const expensesData = generateExpenses();
const incomesData = generateIncomes();

// console.log(expensesData);
// console.log(incomesData);
