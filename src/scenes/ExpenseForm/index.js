import { useContext } from "react";
import DisplayContext from "../../context/display/context";
import ExpenseItem from "../../components/Forms/ExpenseItem";

const ExpenseFormScene = () => {
  const { isMobileDisplay } = useContext(DisplayContext);

  return (
    <ExpenseItem isMobileDisplay={isMobileDisplay} />
  );
}

export default ExpenseFormScene;