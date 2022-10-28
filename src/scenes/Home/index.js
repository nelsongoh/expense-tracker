import { useState, useContext } from "react";
import { useLoaderData, useLocation, Outlet } from "react-router-dom";
import DisplayContext from '../../context/display/context';
import HomeScreenMobile from "../../components/Home/mobile";
import HomeScreenDesktop from "../../components/Home/desktop";
import Constants from "../../constants";

const HomeScene = () => {
  const { isMobileDisplay } = useContext(DisplayContext);
  const userAppConfig = useLoaderData();
  const { pathname } = useLocation();
  const [formState, setFormState] = useState({
    expense: null,
    income: null,
  });

  return (
    pathname === Constants.PATHS.HOME ? (
      isMobileDisplay ? (
        <HomeScreenMobile 
          existingPaymentMethods={userAppConfig.paymentMethods} 
          handleFormState={setFormState}
        />
       ) : 
      ( <HomeScreenDesktop /> )
    ) : (
      <Outlet context={{ 
        isMobileDisplay: isMobileDisplay,
        formState,
        spendCategories: userAppConfig.spendCategories
      }} />
    )
  );
}

export default HomeScene;