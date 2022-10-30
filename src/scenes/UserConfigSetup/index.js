import { useState, useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate, useLoaderData } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DisplayContext from "../../context/display/context";
import AuthContext from "../../context/auth/context";
import Styles from './styles';
import Constants from "../../constants";
import { validateNameEntry, validateBudgetEntry, validateAllConfigEntries, validateExpensePeriod } from "./validation";
import { createOrReplaceUserConfig } from "../../dao/userConfig";

const UserConfigSetupScene = () => {
  const location = useLocation();
  const { isMobileDisplay } = useContext(DisplayContext);
  const authUser = useContext(AuthContext);
  const navigate = useNavigate();
  const formStyles = Styles(isMobileDisplay);
  const userAppConfig = useLoaderData();
  const [configFormData, setConfigFormData] = useState({
    userName: userAppConfig ? userAppConfig.userName : "",
    periodBudget: userAppConfig ? userAppConfig.periodBudget : "",
    paymentMethods: userAppConfig ? userAppConfig.paymentMethods : [],
    spendCategories: userAppConfig ? userAppConfig.spendCategories : 
      Constants.CONTENT.FORMS.USER_CONFIG_SETUP.SPEND_CATEGORIES_DEFAULT,
    expensePeriod: userAppConfig ? userAppConfig.expensePeriod :
      { frequency: Constants.CONTENT.EXPENSE_PERIOD.FREQUENCY.MONTHLY, start: 1 }
  });
  const [relativePageIdx, setRelativePageIdx] = useState(Number(location.pathname[location.pathname.length - 1]) - 1);
  useEffect(() => {
    setRelativePageIdx(Number(location.pathname[location.pathname.length - 1]) - 1)
  }, [location.pathname]);

  const [errorMsgs, setErrorMsgs] = useState({
    userName: null,
    expensePeriod: null,
    periodBudget: null,
    paymentMethods: null,
    spendCategories: null
  });

  const [snackbarError, setSnackbarError] = useState(null);
  const pageNavConfig = {
    0: {
      buttonLeft: {
        text: Constants.CONTENT.FORMS.USER_CONFIG_SETUP.SKIP_BTN,
        func: () => {
          navigate(Constants.PATHS.INDEX.ROOT)
        }
      },
      buttonRight: {
        text: Constants.CONTENT.FORMS.USER_CONFIG_SETUP.NEXT_BTN,
        func: () => {
          const outcome = validateNameEntry(configFormData.userName);
          if (outcome) {
            setErrorMsgs((prevState) => ({ ...prevState, userName: outcome }));
          } else {
            setErrorMsgs((prevState) => ({ ...prevState, userName: null }));
            navigate(Constants.PATHS.CONFIG.ROOT + "/" + Constants.PATHS.CONFIG.SUB_CONFIG_TWO);
          }
        }
      }
    },
    1: {
      buttonLeft: {
        text: Constants.CONTENT.FORMS.USER_CONFIG_SETUP.BACK_BTN,
        func: () => {
          navigate(Constants.PATHS.CONFIG.ROOT + "/" + Constants.PATHS.CONFIG.SUB_CONFIG_ONE)
        }
      },
      buttonRight: {
        text: Constants.CONTENT.FORMS.USER_CONFIG_SETUP.NEXT_BTN,
        func: () => {
          const outcome = validateExpensePeriod(configFormData.expensePeriod);
          if (outcome) {
            setErrorMsgs((prevState) => ({ ...prevState, expensePeriod: outcome }));
          } else {
            setErrorMsgs((prevState) => ({ ...prevState, expensePeriod: null }));
            navigate(Constants.PATHS.CONFIG.ROOT + "/" + Constants.PATHS.CONFIG.SUB_CONFIG_THREE);
          }
        }
      }
    },
    2: {
      buttonLeft: {
        text: Constants.CONTENT.FORMS.USER_CONFIG_SETUP.BACK_BTN,
        func: () => {
          navigate(Constants.PATHS.CONFIG.ROOT + "/" + Constants.PATHS.CONFIG.SUB_CONFIG_TWO)
        }
      },
      buttonRight: {
        text: Constants.CONTENT.FORMS.USER_CONFIG_SETUP.NEXT_BTN,
        func: () => {
          const outcome = validateBudgetEntry(configFormData.periodBudget);
          if (outcome) {
            setErrorMsgs((prevState) => ({ ...prevState, periodBudget: outcome }));
          } else {
            setErrorMsgs((prevState) => ({ ...prevState, periodBudget: null }));
            navigate(Constants.PATHS.CONFIG.ROOT + "/" + Constants.PATHS.CONFIG.SUB_CONFIG_FOUR);
          }
        }
      }
    },
    3: {
      buttonLeft: {
        text: Constants.CONTENT.FORMS.USER_CONFIG_SETUP.BACK_BTN,
        func: () => {
          navigate(Constants.PATHS.CONFIG.ROOT + "/" + Constants.PATHS.CONFIG.SUB_CONFIG_THREE)
        }
      },
      buttonRight: {
        text: Constants.CONTENT.FORMS.USER_CONFIG_SETUP.NEXT_BTN,
        func: () => {
          navigate(Constants.PATHS.CONFIG.ROOT + "/" + Constants.PATHS.CONFIG.SUB_CONFIG_FIVE)
        }
      }
    },
    4: {
      buttonLeft: {
        text: Constants.CONTENT.FORMS.USER_CONFIG_SETUP.BACK_BTN,
        func: () => {
          navigate(Constants.PATHS.CONFIG.ROOT + "/" + Constants.PATHS.CONFIG.SUB_CONFIG_FOUR)
        }
      },
      buttonRight: {
        text: Constants.CONTENT.FORMS.USER_CONFIG_SETUP.SAVE_BTN,
        func: async () => {
          const allFieldsOutcome = validateAllConfigEntries(configFormData);
          if (Object.values(allFieldsOutcome).every((outcome) => outcome === null)) {
            const { isSuccess, errorMsg } = await createOrReplaceUserConfig(configFormData, authUser.uid);
            if (isSuccess) {
              navigate(Constants.PATHS.HOME);
            } else {
              // Remove the stepper errors
              setStepError([false, false, false, false]);
              setSnackbarError(errorMsg);
            }
            
          } else {
            const stepperError = [];
            Object.values(allFieldsOutcome).forEach((outcome) => {
              if (outcome) {
                stepperError.push(true);
              } else {
                stepperError.push(false);
              }
            });
            setStepError(stepperError);
          }
        }
      }
    }
  };
  const [stepError, setStepError] = useState([false, false, false, false]);
  
  return (
    <Box display="flex" justifyContent="center" alignItems="center" maxHeight="100vh" sx={formStyles.box}>
      <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
        open={snackbarError !== null}
        autoHideDuration={9000}
        onClose={() => setSnackbarError(null)}
        key={'topcenter'}
      >
        <MuiAlert variant='filled' severity='success' onClose={() => setSnackbarError(null)}>
          {snackbarError}
        </MuiAlert>
      </Snackbar>
      <Grid container direction="column" spacing={6} alignItems="center">
        <Paper variant='outlined' sx={formStyles.paper}>
          <Grid xs>
            <Typography variant="h4" sx={formStyles.title} textAlign="center">
              {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.TITLE}
            </Typography>
          </Grid>
          <Grid xs sx={formStyles.stepper}>
            <Stepper activeStep={relativePageIdx} alternativeLabel>
              {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.CONFIG_STEPS.map((label, idx) => (
                <Step key={label} sx={formStyles.step}>
                  <StepLabel error={stepError[idx]}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid xs sx={formStyles.configFields}>
            <Outlet context={{ 
              isMobileDisplay, 
              configData: configFormData, 
              setConfigData: setConfigFormData,
              errorMsgs
            }} />
          </Grid>
        </Paper>
        <Grid container direction="row" spacing={3} justifyContent="center" sx={formStyles.buttons}>
          <Grid>
            <Button
              onClick={pageNavConfig[relativePageIdx].buttonLeft.func}
            >
              {pageNavConfig[relativePageIdx].buttonLeft.text}
            </Button>
          </Grid>
          <Grid>
            <Button 
              variant="contained" 
              onClick={async () => { await pageNavConfig[relativePageIdx].buttonRight.func(); }}
            >
              {pageNavConfig[relativePageIdx].buttonRight.text}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserConfigSetupScene;