import { useContext } from 'react';
import AuthContext from './context/auth/context';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Constants from "./constants";
import LandingScene from "./scenes/Landing";
import ExpenseFormScene from "./scenes/ExpenseForm";
import UserConfigSetupScene from './scenes/UserConfigSetup';
import ConfigUserName from './components/Forms/UserConfigSetup/UserName';
import ConfigMonthlyBudget from './components/Forms/UserConfigSetup/MonthlyBudget';
import ConfigPaymentMethods from './components/Forms/UserConfigSetup/PaymentMethods';
import ConfigSpendCategories from './components/Forms/UserConfigSetup/SpendCategories';

const App = ({ children }) => {
  const authUser = useContext(AuthContext);
  const appRouter = createBrowserRouter([
    {
      path: Constants.PATHS.INDEX,
      element: authUser === null ? <LandingScene /> : 
        <Navigate to={Constants.PATHS.EXPENSE_FORM} replace />,
    },
    {
      path: Constants.PATHS.EXPENSE_FORM,
      element: authUser !== null ? <ExpenseFormScene /> : <Navigate to={Constants.PATHS.INDEX} replace />
    },
    {
      path: Constants.PATHS.CONFIG.ROOT,
      element: authUser !== null ? <UserConfigSetupScene /> : <Navigate to={Constants.PATHS.INDEX} replace />,
      children: [
        {
          path: Constants.PATHS.CONFIG.SUB_CONFIG_ONE,
          element: <ConfigUserName />
        },
        {
          path: Constants.PATHS.CONFIG.SUB_CONFIG_TWO,
          element: <ConfigMonthlyBudget />
        },
        {
          path: Constants.PATHS.CONFIG.SUB_CONFIG_THREE,
          element: <ConfigPaymentMethods />
        },
        {
          path: Constants.PATHS.CONFIG.SUB_CONFIG_FOUR,
          element: <ConfigSpendCategories />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={appRouter}>
      {children}
    </RouterProvider>
  );
}

export default App;
