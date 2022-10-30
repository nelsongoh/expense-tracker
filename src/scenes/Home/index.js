import { useState, useContext } from "react";
import { useLoaderData, useLocation, Outlet } from "react-router-dom";
import DisplayContext from '../../context/display/context';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
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
  const [snackbarState, setSnackbarState] = useState({
    alertType: Constants.ALERT_TYPE.ERROR,
    msg: null,
  });
  const handleClearSnackbarState = () => {
    setSnackbarState({
      alertType: Constants.ALERT_TYPE.ERROR,
      msg: null
    });
  }
  const handleUpdateSnackbarState = (alertType, msg) => {
    setSnackbarState({ alertType, msg });
  }

  let homeScreenType = <HomeScreenDesktop 
    existingPaymentMethods={
      userAppConfig ? userAppConfig.paymentMethods : []
    } 
    handleFormState={setFormState} 
  />;

  if (pathname === Constants.PATHS.HOME) {
    if (isMobileDisplay) {
      homeScreenType = <HomeScreenMobile 
        existingPaymentMethods={
          userAppConfig ? userAppConfig.paymentMethods : []
        } 
        handleFormState={setFormState}
      />;
    }
  } else {
    homeScreenType = <Outlet context={{ 
      isMobileDisplay: isMobileDisplay,
      formState,
      spendCategories: userAppConfig ? userAppConfig.spendCategories : null,
      userAppConfig,
      updateSnackbar: handleUpdateSnackbarState
    }} />
  }

  return (
    <>
      {snackbarState.msg ? (
        <Snackbar 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
          open={snackbarState.msg !== null}
          autoHideDuration={9000}
          onClose={() => handleClearSnackbarState()}
          key={'topcenter'}
        >
          <MuiAlert variant='filled' severity={snackbarState.alertType} onClose={() => handleClearSnackbarState()}>
            {snackbarState.msg}
          </MuiAlert>
        </Snackbar> ) : null
      }
      {homeScreenType}
    </>
  );
}

export default HomeScene;