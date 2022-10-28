import { useContext } from 'react';
import AuthContext from './context/auth/context';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Constants from "./constants";
import LandingScene from "./scenes/Landing";
import UserConfigSetupScene from './scenes/UserConfigSetup';
import HomeScene from "./scenes/Home";
import Navbar from './components/Nav';
import ConfigUserName from './components/Forms/UserConfigSetup/UserName';
import ConfigMonthlyBudget from './components/Forms/UserConfigSetup/MonthlyBudget';
import ConfigPaymentMethods from './components/Forms/UserConfigSetup/PaymentMethods';
import ConfigSpendCategories from './components/Forms/UserConfigSetup/SpendCategories';
import ExpenseEntry from './components/Forms/ExpenseEntry';
import { getUserConfig } from './dao/userConfig';

const App = ({ children }) => {
  const authUser = useContext(AuthContext);
  const appRouter = createBrowserRouter([
    {
      path: Constants.PATHS.INDEX.ROOT,
      element: authUser !== null ? <Navbar /> : <Navigate to={Constants.PATHS.REGISTER_LOGIN} replace />,
      children: [
        {
          path: Constants.PATHS.INDEX.HOME.ROOT,
          element: authUser !== null ? <HomeScene /> : <Navigate to={Constants.PATHS.REGISTER_LOGIN} replace />,
          loader: async () => {
            return await getUserConfig(authUser.uid);
          },
          children: [
            {
              path: Constants.PATHS.INDEX.HOME.CREATE_EXPENSE_ENTRY,
              element: <ExpenseEntry />
            }
          ]
        },
        {
          path: Constants.PATHS.INDEX.DASHBOARD,
          element: null
        }
      ]
    },
    {
      path: Constants.PATHS.REGISTER_LOGIN,
      element: authUser === null ? <LandingScene /> : <Navigate to={Constants.PATHS.HOME} replace />
    },
    {
      path: Constants.PATHS.CONFIG.ROOT,
      element: authUser !== null ? <UserConfigSetupScene /> : <Navigate to={Constants.PATHS.REGISTER_LOGIN} replace />,
      loader: async () => {
        return await getUserConfig(authUser.uid);
      },
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
