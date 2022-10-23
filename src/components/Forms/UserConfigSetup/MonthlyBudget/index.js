import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Constants from '../../../../constants';
import Styles from './styles';
import validateBudgetEntry from './validation';

const ConfigMonthlyBudget = () => {
  const { isMobileDisplay, configData, setConfigData } = useOutletContext();
  const navigate = useNavigate();
  const formStyles = Styles(isMobileDisplay);
  const handleUpdateBudget = (budget) => {
    setConfigData((prevState) => ({ ...prevState, monthlyBudget: budget }));
  };
  const [errorMsg, setErrorMsg] = useState(null);
  const goToNextSetup = () => {
    const outcome = validateBudgetEntry(configData.monthlyBudget);
    if (outcome) {
      setErrorMsg(outcome);
    } else {
      navigate(Constants.PATHS.CONFIG.ROOT + "/" + Constants.PATHS.CONFIG.SUB_CONFIG_THREE);
    }
  }

  return (
    <>
      <TextField 
        label={Constants.CONTENT.FORMS.USER_CONFIG_SETUP.MONTHLY_BUDGET_FIELD}
        error={errorMsg !== null}
        helperText={errorMsg ? errorMsg : Constants.CONTENT.FORMS.USER_CONFIG_SETUP.MONTHLY_BUDGET_HELPER_TEXT}
        fullWidth
        InputProps={{
          startAdornment: 
          <InputAdornment position="start">
            {Constants.CONTENT.FORMS.EXPENSE.AMOUNT_FIELD_PREFIX}
          </InputAdornment>
        }}
        inputProps={{ inputMode: 'decimal' }}
        value={configData.monthlyBudget}
        onChange={(e) => { handleUpdateBudget(e.target.value) }}
      />
      <Grid container direction="row" spacing={3} justifyContent="center" sx={formStyles.buttons}>
        <Grid>
          <Button 
            onClick={() => { navigate(Constants.PATHS.CONFIG.ROOT + "/" + Constants.PATHS.CONFIG.SUB_CONFIG_ONE) }}
          >
            {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.BACK_BTN}
          </Button>
        </Grid>
        <Grid>
          <Button variant="contained" onClick={goToNextSetup}>{Constants.CONTENT.FORMS.USER_CONFIG_SETUP.NEXT_BTN}</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ConfigMonthlyBudget;