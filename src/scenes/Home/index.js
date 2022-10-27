import { useContext } from "react";
import { useLoaderData, useLocation, Outlet } from "react-router-dom";
import DisplayContext from '../../context/display/context';
import HomeScreenMobile from "../../components/Home/mobile";
import HomeScreenDesktop from "../../components/Home/desktop";
import Constants from "../../constants";

const HomeScene = () => {
  const { isMobileDisplay } = useContext(DisplayContext);
  const userAppConfig = useLoaderData();
  const { pathname } = useLocation();

  return (
    pathname === Constants.PATHS.HOME ? (
      isMobileDisplay ? (
        <HomeScreenMobile existingPaymentMethods={userAppConfig.paymentMethods} />
       ) : 
      ( <HomeScreenDesktop /> )
    ) : (
      <Outlet context={{ isMobileDisplay: isMobileDisplay }} />
    )
  );
}

export default HomeScene;