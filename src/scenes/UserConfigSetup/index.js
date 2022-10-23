import { useState, useContext } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import DisplayContext from "../../context/display/context";
import Styles from './styles';
import Constants from "../../constants";

const UserConfigSetupScene = () => {
  const location = useLocation();
  const { isMobileDisplay } = useContext(DisplayContext);
  const formStyles = Styles(isMobileDisplay);
  const [configFormData, setConfigFormData] = useState({
    userName: "",
    monthlyBudget: "",
    paymentMethods: [],
    spendingCategories: Constants.CONTENT.FORMS.USER_CONFIG_SETUP.SPEND_CATEGORIES_DEFAULT,
  });
  
  return (
    <Box display="flex" justifyContent="center" alignItems="center" maxHeight="100vh" sx={formStyles.box}>
      <Grid container direction="column" spacing={6} alignItems="center">
        <Paper variant='outlined' sx={formStyles.paper}>
          <Grid xs>
            <Typography variant="h4" sx={formStyles.title} textAlign="center">
              {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.TITLE}
            </Typography>
          </Grid>
          <Grid xs sx={formStyles.stepper}>
            <Stepper activeStep={Number(location.pathname[location.pathname.length - 1]) - 1} alternativeLabel>
              {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.CONFIG_STEPS.map((label) => (
                <Step key={label} sx={formStyles.step}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid xs sx={formStyles.configFields}>
            <Outlet context={{ isMobileDisplay, configData: configFormData, setConfigData: setConfigFormData}} />
          </Grid>
        </Paper>
      </Grid>
    </Box>
  );
}

export default UserConfigSetupScene;