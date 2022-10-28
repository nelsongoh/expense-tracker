import { useOutletContext } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Constants from '../../../../constants';

const ConfigPeriodBudget = () => {
  const { configData, setConfigData, errorMsgs } = useOutletContext();
  const handleUpdateBudget = (budget) => {
    setConfigData((prevState) => ({ ...prevState, periodBudget: budget }));
  };

  return (
    <TextField 
      label={Constants.CONTENT.FORMS.USER_CONFIG_SETUP.PERIOD_BUDGET_FIELD}
      error={errorMsgs.periodBudget !== null}
      helperText={
        errorMsgs.periodBudget ? 
        errorMsgs.periodBudget : 
        Constants.CONTENT.FORMS.USER_CONFIG_SETUP.PERIOD_BUDGET_HELPER_TEXT
      }
      fullWidth
      InputProps={{
        startAdornment: 
        <InputAdornment position="start">
          {Constants.CONTENT.FORMS.EXPENSE.AMOUNT_FIELD_PREFIX}
        </InputAdornment>
      }}
      inputProps={{ inputMode: 'decimal' }}
      value={configData.periodBudget}
      onChange={(e) => { handleUpdateBudget(e.target.value) }}
    />
  );
}

export default ConfigPeriodBudget;