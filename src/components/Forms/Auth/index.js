import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/auth/context';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Styles from './styles';
import Constants from '../../../constants';
import loginSignUp from './loginSignUp';
import FullScreenSpinner from '../../Spinner';

const AuthForm = ({ isMobileDisplay }) => {
  const formStyles = Styles(isMobileDisplay);
  const authUser = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authUser) {
      navigate(Constants.PATHS.EXPENSE_FORM, { replace: true });
    }
  }, [authUser, navigate]);

  const registerOrLogin = async () => {
    // Load the spinner while waiting
    setIsLoading(true);
    // Perform the login / registration with Google
    const registerOrLoginOutcome = await loginSignUp();
    // Stop the spinner
    setIsLoading(false);
    // If successful, the user will be redirected to the Expense Item form via the 
    // React Router's BrowserRouter hook that does a conditional check before loading
    // the relevant element

    // TODO: Display an error on the page if something has gone wrong
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper variant='outlined' sx={formStyles.paper}>
        <Grid container direction="column" spacing={3}>
          <Grid xs display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" sx={formStyles.title}>
              {Constants.CONTENT.FORMS.AUTH.TITLE}
            </Typography>
          </Grid>
          <Grid xs display="flex" justifyContent="center" alignItems="center">
            <Button variant="contained" onClick={registerOrLogin}>{Constants.CONTENT.FORMS.AUTH.REGISTER_LOGIN_GOOGLE_BTN}</Button>
          </Grid>
        </Grid>
      </Paper>
      <FullScreenSpinner isActive={isLoading} />
    </Box>
  );
}

export default AuthForm;