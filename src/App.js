import { useContext } from 'react';
import AuthContext from './context/auth/context';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Constants from "./constants";
import LandingScene from "./scenes/Landing";
import ExpenseFormScene from "./scenes/ExpenseForm";

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
    }
  ]);

  return (
    <RouterProvider router={appRouter}>
      {children}
    </RouterProvider>
  );
}

export default App;
