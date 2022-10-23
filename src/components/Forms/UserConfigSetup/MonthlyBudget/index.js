import { useOutletContext } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Constants from '../../../../constants';

const ConfigMonthlyBudget = () => {
  const { configData, setConfigData, errorMsgs } = useOutletContext();
  const handleUpdateBudget = (budget) => {
    setConfigData((prevState) => ({ ...prevState, monthlyBudget: budget }));
  };

  return (
    <TextField 
      label={Constants.CONTENT.FORMS.USER_CONFIG_SETUP.MONTHLY_BUDGET_FIELD}
      error={errorMsgs.monthlyBudget !== null}
      helperText={
        errorMsgs.monthlyBudget ? 
        errorMsgs.monthlyBudget : 
        Constants.CONTENT.FORMS.USER_CONFIG_SETUP.MONTHLY_BUDGET_HELPER_TEXT
      }
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
  );
}

export default ConfigMonthlyBudget;