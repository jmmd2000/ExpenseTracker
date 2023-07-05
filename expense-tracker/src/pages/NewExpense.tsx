import Table from "../components/Table";
import ExpenseForm from "../components/forms/ExpenseForm";
import IncomeForm from "../components/forms/IncomeForm";

const NewExpense: React.FC = () => {
  return (
    <div className="w-full">
      <ExpenseForm />
      <IncomeForm />
    </div>
  );
};

export default NewExpense;
