import Expense from "../../types/Expense";
import ExpenseCategory from "../../types/ExpenseCategory";
import Income from "../../types/Income";
import IncomeCategory from "../../types/IncomeCategory";
import { Action } from "./ExpenseForm";
import { useState } from "react";

interface CategorySelectProps {
  categories: IncomeCategory[] | ExpenseCategory[];
  setCategory: (value: Action) => void;
  state: Income | Expense;
  // error: boolean;
  validate: (input: string, value: string | number) => boolean;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  categories,
  setCategory,
  state,
  // error,
  validate,
}) => {
  const [valid, setValid] = useState(false);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const isValid = validate("category", e.target.value);
    if (isValid) {
      setValid(false);
      setCategory({ type: "SET_CATEGORY", payload: e.target.value });
    } else {
      setValid(true);
    }
    console.log(valid);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="category"
        className="block mb-2"
      >
        Category:
      </label>
      <div className="w-full">
        <select
          id="category"
          // value={state.category}
          onChange={(e) => handleCategoryChange(e)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="">Choose a category</option>
          {categories.map((category) => (
            <option
              key={category.name}
              value={category.name}
            >
              {category.name}
            </option>
          ))}
        </select>
        {/* {error && <span className="text-red-500">{error}</span>} */}
        {valid ? (
          <span className="text-red-500">Category is required.</span>
        ) : null}
      </div>
    </div>
  );
};

export default CategorySelect;
