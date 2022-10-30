import { useContext } from 'react';
import AuthContext from './context/auth/context';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Constants from "./constants";
import LandingScene from "./scenes/Landing";
import UserConfigSetupScene from './scenes/UserConfigSetup';
import HomeScene from "./scenes/Home";
import DashboardScene from './scenes/Dashboard';
import Navbar from './components/Nav';
import ConfigUserName from './components/Forms/UserConfigSetup/UserName';
import ConfigPeriodBudget from './components/Forms/UserConfigSetup/PeriodBudget';
import ConfigExpensePeriod from './components/Forms/UserConfigSetup/DefinePeriod';
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
          element: <DashboardScene />
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
          element: <ConfigExpensePeriod />
        },
        {
          path: Constants.PATHS.CONFIG.SUB_CONFIG_THREE,
          element: <ConfigPeriodBudget />
        },
        {
          path: Constants.PATHS.CONFIG.SUB_CONFIG_FOUR,
          element: <ConfigPaymentMethods />
        },
        {
          path: Constants.PATHS.CONFIG.SUB_CONFIG_FIVE,
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
