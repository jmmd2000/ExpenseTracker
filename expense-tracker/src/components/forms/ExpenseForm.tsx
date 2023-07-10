import React, { useReducer, useState } from "react";
import Expense from "../../types/Expense";
import { addExpense } from "../../firebase/db";
import ExpenseCategory from "../../types/ExpenseCategory";
import { useAuth } from "../../context/AuthContext";

const categories = [
  new ExpenseCategory("Food", ""),
  new ExpenseCategory("Transport", ""),
  new ExpenseCategory("Entertainment", ""),
  new ExpenseCategory("Transfers", ""),
  new ExpenseCategory("Utilities", ""),
  new ExpenseCategory("Rent", ""),
  new ExpenseCategory("Clothing", ""),
  new ExpenseCategory("Groceries", ""),
  new ExpenseCategory("Online", ""),
  new ExpenseCategory("Other", ""),
];

type State = Expense;
export type Action =
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_DETAILS"; payload: string }
  | { type: "SET_AMOUNT"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_LOCATION"; payload: string }
  | { type: "SET_PLATFORM"; payload: string }
  | { type: "SET_USER"; payload: string };

const initialState: State = {
  category: "",
  details: "",
  amount: 0,
  day: 0,
  month: 0,
  year: 0,
  date: "",
  location: "",
  platform: "",
  userID: "",
  expenseID: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_DETAILS":
      return { ...state, details: action.payload };
    case "SET_AMOUNT":
      return {
        ...state,
        amount: parseFloat(action.payload),
        expenseID: (
          parseFloat(action.payload) *
          Math.random() *
          1000
        ).toLocaleString(),
      };
    case "SET_DATE": {
      const date = action.payload;
      return {
        ...state,
        day: new Date(date).getDate(),
        month: new Date(date).getMonth() + 1,
        year: new Date(date).getFullYear(),
        date: date,
      };
    }
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_PLATFORM":
      return { ...state, platform: action.payload };
    case "SET_USER":
      return { ...state, userID: action.payload };
    default:
      return state;
  }
};

interface ExpenseFormProps {
  setForm: (formName: string) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ setForm }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState<{ [key in keyof State]?: string }>({});
  const { user } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors: { [key in keyof State]?: string } = {};

    // Validate category
    if (!state.category || state.category === "") {
      validationErrors.category = "Category is required.";
    }

    // Validate amount
    if (state.amount <= 0) {
      validationErrors.amount = "Amount must be greater than zero.";
    }

    // Validate date
    if (state.day <= 0 || state.month <= 0 || state.year <= 0) {
      validationErrors.date = "Invalid date.";
    }

    // Validate platform
    if (!state.platform) {
      validationErrors.platform = "Platform is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Validation successful, log the result
    console.log(state);

    await addExpense(state);
    // location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      // className="max-w-sm mx-auto bg-white shadow-md rounded-md px-4 py-6"
      className="mt-10"
    >
      <h1 className="text-2xl font-semibold text-center mb-4 text-white bg-slate-800 rounded-lg p-2">
        Add Expense
      </h1>

      <div className="mb-4">
        <label
          htmlFor="category"
          className="block mb-2 text-white"
        >
          Category<span className="text-red-500">*</span>
        </label>
        <div className="min-w-[250px] max-w-[250px]">
          <select
            id="category"
            onChange={(e) =>
              dispatch({ type: "SET_CATEGORY", payload: e.target.value })
            }
            className={`min-w-[250px] max-w-[250px] bg-transparent  text-white border border-gray-300 rounded-md px-3 py-2 ${
              errors.category && "bg-red-200 border-red-500"
            }`}
          >
            <option value="">Choose a category</option>
            {categories.map((category) => (
              <option
                key={category.name}
                value={category.name}
                className="text-white bg-slate-800"
              >
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500">{errors.category}</span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="details"
          className="block mb-2 text-white"
        >
          Details
        </label>
        <div className="min-w-[250px] max-w-[250px]">
          <input
            type="text"
            id="details"
            value={state.details}
            onChange={(e) =>
              dispatch({ type: "SET_DETAILS", payload: e.target.value })
            }
            className="min-w-[250px] max-w-[250px] bg-transparent text-white border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block mb-2 text-white"
        >
          Amount<span className="text-red-500">*</span>
        </label>
        <div className="min-w-[250px] max-w-[250px]">
          <input
            type="number"
            id="amount"
            value={state.amount}
            onChange={(e) =>
              dispatch({ type: "SET_AMOUNT", payload: e.target.value })
            }
            className={`min-w-[250px] max-w-[250px] bg-transparent text-white border border-gray-300 rounded-md px-3 py-2 ${
              errors.amount && "bg-red-200 border-red-500"
            }`}
          />
          {errors.amount && (
            <span className="text-red-500">{errors.amount}</span>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="date"
          className="block mb-2 text-white"
        >
          Date<span className="text-red-500">*</span>
        </label>
        <div className="min-w-[250px] max-w-[250px]">
          <input
            type="date"
            id="date"
            onChange={(e) =>
              dispatch({ type: "SET_DATE", payload: e.target.value })
            }
            className={`min-w-[250px] max-w-[250px] bg-transparent text-white border border-gray-300 rounded-md px-3 py-2 ${
              errors.date && "bg-red-200 border-red-500"
            }`}
          />
          {errors.date && <span className="text-red-500">{errors.date}</span>}
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="location"
          className="block mb-2 text-white"
        >
          Location
        </label>
        <div className="min-w-[250px] max-w-[250px]">
          <input
            type="text"
            id="location"
            value={state.location}
            onChange={(e) =>
              dispatch({ type: "SET_LOCATION", payload: e.target.value })
            }
            className="min-w-[250px] max-w-[250px] bg-transparent text-white border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="platform"
          className="block mb-2 text-white"
        >
          Platform<span className="text-red-500">*</span>
        </label>
        <div className="min-w-[250px] max-w-[250px]">
          <input
            type="text"
            id="platform"
            value={state.platform}
            onChange={(e) =>
              dispatch({ type: "SET_PLATFORM", payload: e.target.value })
            }
            className={`min-w-[250px] max-w-[250px] bg-transparent text-white border border-gray-300 rounded-md px-3 py-2 ${
              errors.platform && "bg-red-200 border-red-500"
            }`}
          />
          {errors.platform && (
            <span className="text-red-500">{errors.platform}</span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-left gap-5">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={() => dispatch({ type: "SET_USER", payload: user!.uid })}
        >
          Submit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={() => setForm("")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
