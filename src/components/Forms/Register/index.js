import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Styles from './styles';
import Constants from '../../../constants';

const RegisterForm = ({ isMobileDisplay }) => {
  const formStyles = Styles(isMobileDisplay);
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper variant='outlined' sx={formStyles.paper}>
        <Grid container direction="column" spacing={3}>
          <Grid xs display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" sx={formStyles.title}>{Constants.CONTENT.FORMS.REGISTER.TITLE}</Typography>
          </Grid>
          <Grid xs display="flex" justifyContent="center" alignItems="center">
            <TextField variant="outlined" label={Constants.CONTENT.FORMS.REGISTER.NAME_FIELD} sx={formStyles.textField} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default RegisterForm;