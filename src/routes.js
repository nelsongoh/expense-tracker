import { createBrowserRouter } from "react-router-dom";
import Constants from "./constants";
import LandingScene from "./scenes/Landing";
import ExpenseFormScene from "./scenes/ExpenseForm";

const appRouter = createBrowserRouter([
  {
    path: Constants.PATHS.INDEX,
    element: <LandingScene />
  },
  {
    path: Constants.PATHS.EXPENSE_FORM,
    element: <ExpenseFormScene />
  }
]);

export default appRouter;