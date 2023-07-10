import { useReducer, useState } from "react";
import Income from "../../types/Income";
import { addIncome } from "../../firebase/db";
import { useAuth } from "../../context/AuthContext";

type State = Income;
type Action =
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_DETAILS"; payload: string }
  | { type: "SET_GROSS"; payload: number }
  | { type: "SET_NET"; payload: number }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_FROM"; payload: string }
  | { type: "SET_PLATFORM"; payload: string }
  | { type: "SET_USER"; payload: string };

const initialState: State = {
  category: "",
  details: "",
  gross: 0,
  net: 0,
  tax: 0,
  day: 0,
  month: 0,
  year: 0,
  date: "",
  from: "",
  platform: "",
  userID: "",
  incomeID: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_DETAILS":
      return { ...state, details: action.payload };
    case "SET_GROSS":
      // console.log(action.payload - state.net);
      if (isNaN(action.payload - state.net)) {
        return {
          ...state,
          gross: action.payload,
        };
      } else {
        return {
          ...state,
          gross: action.payload,
          tax: action.payload - state.net,
          incomeID: (action.payload * Math.random() * 1000).toLocaleString(),
        };
      }
    case "SET_NET":
      // console.log(state.gross - action.payload);
      if (isNaN(state.gross - action.payload)) {
        return {
          ...state,
          net: action.payload,
        };
      } else {
        return {
          ...state,
          net: action.payload,
          tax: state.gross - action.payload,
        };
      }
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
    case "SET_FROM":
      return { ...state, from: action.payload };
    case "SET_PLATFORM":
      return { ...state, platform: action.payload };
    case "SET_USER":
      return { ...state, userID: action.payload };
    default:
      return state;
  }
};

interface IncomeFormProps {
  setForm: (formName: string) => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ setForm }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState<{ [key in keyof State]?: string }>({});
  const { user } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors: { [key in keyof State]?: string } = {};

    // Validate category
    if (!state.category) {
      validationErrors.category = "Category is required";
    }

    // Validate gross
    if (state.gross <= 0) {
      validationErrors.gross = "Gross amount must be greater than zero";
    }

    // Validate gross
    if (state.net <= 0 || state.net > state.gross) {
      validationErrors.net =
        "Net amount must be greater than zero and less/equal to gross amount ";
    }

    // Validate date
    if (state.day <= 0 || state.month <= 0 || state.year <= 0) {
      validationErrors.day = "Invalid day.";
      validationErrors.month = "Invalid month.";
      validationErrors.year = "Invalid year.";
    }

    // Validate location
    if (!state.from) {
      validationErrors.from = "Payor is required";
    }

    // Validate platform
    if (!state.platform) {
      validationErrors.platform = "Platform is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch({ type: "SET_USER", payload: user!.uid });

    // Validation successful, log the result
    // console.log(state);
    await addIncome(state);
    location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      // className="max-w-sm mx-auto bg-white shadow-md rounded-md px-4 py-6"
      className="mt-10"
    >
      <h1 className="text-2xl font-semibold text-center mb-4 text-white bg-slate-800 rounded-lg p-2">
        Add Income
      </h1>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block mb-2 text-white"
        >
          Category<span className="text-red-500">*</span>
        </label>
        <div className="min-w-[250px] max-w-[250px]">
          <input
            type="text"
            id="category"
            value={state.category}
            onChange={(e) =>
              dispatch({ type: "SET_CATEGORY", payload: e.target.value })
            }
            className={`min-w-[250px] max-w-[250px] bg-transparent  text-white border border-gray-300 rounded-md px-3 py-2 ${
              errors.category && "bg-red-200 border-red-500"
            }`}
          />
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
            className="min-w-[250px] max-w-[250px] bg-transparent  text-white border border-gray-300 rounded-md px-3 py-2"
          />
          {errors.details && (
            <span className="text-red-500">{errors.details}</span>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="gross"
          className="block mb-2 text-white"
        >
          Gross<span className="text-red-500">*</span>
        </label>
        <div className="min-w-[250px] max-w-[250px]">
          <input
            type="number"
            id="gross"
            value={state.gross}
            onChange={(e) =>
              dispatch({
                type: "SET_GROSS",
                payload: parseFloat(e.target.value),
              })
            }
            className={`min-w-[250px] max-w-[250px] bg-transparent  text-white border border-gray-300 rounded-md px-3 py-2 ${
              errors.gross && "bg-red-200 border-red-500"
            }`}
          />
          {errors.gross && <span className="text-red-500">{errors.gross}</span>}
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="net"
          className="block mb-2 text-white"
        >
          Net<span className="text-red-500">*</span>
        </label>
        <div className="min-w-[250px] max-w-[250px]">
          <input
            type="number"
            id="net"
            value={state.net}
            onChange={(e) =>
              dispatch({
                type: "SET_NET",
                payload: parseFloat(e.target.value),
              })
            }
            className={`min-w-[250px] max-w-[250px] bg-transparent  text-white border border-gray-300 rounded-md px-3 py-2 ${
              errors.net && "bg-red-200 border-red-500"
            }`}
          />
          {errors.net && <span className="text-red-500">{errors.net}</span>}
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
            className={`min-w-[250px] max-w-[250px] bg-transparent  text-white border border-gray-300 rounded-md px-3 py-2 ${
              errors.date && "bg-red-200 border-red-500"
            }`}
          />
          {(errors.day || errors.month || errors.year) && (
            <span className="text-red-500">
              {errors.day} {errors.month} {errors.year}
            </span>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="location"
          className="block mb-2 text-white"
        >
          Payor<span className="text-red-500">*</span>
        </label>
        <div className="min-w-[250px] max-w-[250px]">
          <input
            type="text"
            id="from"
            value={state.from}
            onChange={(e) =>
              dispatch({ type: "SET_FROM", payload: e.target.value })
            }
            className={`min-w-[250px] max-w-[250px] bg-transparent  text-white border border-gray-300 rounded-md px-3 py-2 ${
              errors.from && "bg-red-200 border-red-500"
            }`}
          />
          {errors.from && <span className="text-red-500">{errors.from}</span>}
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
            className={`min-w-[250px] max-w-[250px] bg-transparent  text-white border border-gray-300 rounded-md px-3 py-2 ${
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

export default IncomeForm;
