import Table from "../components/Table";
import ExpenseForm from "../components/forms/ExpenseForm";
import IncomeForm from "../components/forms/IncomeForm";

const HomePage: React.FC = () => {
  return (
    <div className="w-full h-screen pb-10">
      <ExpenseForm />
      {/* <IncomeForm /> */}
      <Table />
    </div>
  );
};

export default HomePage;
