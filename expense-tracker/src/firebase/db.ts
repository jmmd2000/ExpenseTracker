import firebase from "firebase/app";
import "firebase/database";
import Expense from "../types/Expense";
import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import Income from "../types/Income";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addExpense = async (expense: Expense) => {
  const expenseRef = collection(db, "expenses");

  await addDoc(expenseRef, expense)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    })
    .finally(() => {
      console.log("Done adding document");
    });
};

export const addIncome = async (income: Income) => {
  const incomeRef = collection(db, "income");

  await addDoc(incomeRef, income)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    })
    .finally(() => {
      console.log("Done adding document");
    });
};

export const getExpenses = async (
  userID: string,
  startDate?: Date,
  endDate?: Date
) => {
  const expensesRef = collection(db, "expenses");
  const q = query(expensesRef, where("userID", "==", userID));
  const querySnapshot = await getDocs(q);
  const expenses: Expense[] = [];
  querySnapshot.forEach((doc) => {
    const expense = doc.data() as Expense;
    if (startDate && endDate) {
      if (
        new Date(expense.date) >= startDate &&
        new Date(expense.date) <= endDate
      ) {
        expenses.push(expense);
      }
    } else {
      expenses.push(expense);
    }
  });
  return expenses;
};

export const getIncomes = async (
  userID: string,
  startDate?: Date,
  endDate?: Date
) => {
  const incomesRef = collection(db, "income");
  const q = query(incomesRef, where("userID", "==", userID));
  const querySnapshot = await getDocs(q);
  const incomes: Income[] = [];
  querySnapshot.forEach((doc) => {
    const income = doc.data() as Income;
    if (startDate && endDate) {
      if (
        new Date(income.date) >= startDate &&
        new Date(income.date) <= endDate
      ) {
        incomes.push(income);
      }
    } else {
      incomes.push(income);
    }
  });
  return incomes;
};
