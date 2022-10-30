import { useOutletContext } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Constants from '../../../../constants';
import ConfigExpenseDayStart from './DefineDayStart';
import ConfigExpenseMonthStart from './DefineMonthStart';

const ConfigExpensePeriod = () => {
  const { configData, setConfigData } = useOutletContext();
  const DEFAULT_PERIOD_DAILY = Object.freeze({ 
    frequency: Constants.CONTENT.EXPENSE_PERIOD.FREQUENCY.DAILY, 
    start: "NA" 
  });
  const DEFAULT_PERIOD_WEEKLY = Object.freeze({ 
    frequency: Constants.CONTENT.EXPENSE_PERIOD.FREQUENCY.WEEKLY, 
    start: Constants.CONTENT.EXPENSE_PERIOD.DAY_OF_WEEK.MON 
  });
  const DEFAULT_PERIOD_MONTHLY = Object.freeze({ 
    frequency: Constants.CONTENT.EXPENSE_PERIOD.FREQUENCY.MONTHLY, 
    start: 1 
  });
  const handleUpdateExpensePeriod = (freq, periodStart) => {
    setConfigData((prevState) => ({...prevState, expensePeriod: { frequency: freq, start: periodStart }}));
  }

  return (
    <Stack spacing={3} justifyContent="center" alignItems="center">
      <Typography variant='h5'>{Constants.CONTENT.FORMS.USER_CONFIG_SETUP.DEFINE_PERIOD_BTN_CAPTION}</Typography>
      <Stack direction="row" spacing={3}>  
        <Button 
          variant={
            configData.expensePeriod.frequency === Constants.CONTENT.EXPENSE_PERIOD.FREQUENCY.DAILY ? 
            'contained' : 'outlined'
          }
          onClick={() => { handleUpdateExpensePeriod(DEFAULT_PERIOD_DAILY.frequency, DEFAULT_PERIOD_DAILY.start) }}
        >
          {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.DEFINE_PERIOD_DAY_BTN}
        </Button>
        <Button 
          variant={
            configData.expensePeriod.frequency === Constants.CONTENT.EXPENSE_PERIOD.FREQUENCY.WEEKLY ? 
            'contained' : 'outlined'
          }
          onClick={() => { handleUpdateExpensePeriod(DEFAULT_PERIOD_WEEKLY.frequency, DEFAULT_PERIOD_WEEKLY.start) }}
        >
          {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.DEFINE_PERIOD_WEEK_BTN}
        </Button>
        <Button 
          variant={
            configData.expensePeriod.frequency === Constants.CONTENT.EXPENSE_PERIOD.FREQUENCY.MONTHLY ? 
            'contained' : 'outlined'
          }
          onClick={() => { handleUpdateExpensePeriod(DEFAULT_PERIOD_MONTHLY.frequency, DEFAULT_PERIOD_MONTHLY.start) }}
        >
          {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.DEFINE_PERIOD_MONTH_BTN}
        </Button>
      </Stack>
      {
        configData.expensePeriod.frequency === Constants.CONTENT.EXPENSE_PERIOD.FREQUENCY.WEEKLY ? 
        <>
          <Typography variant='h5'>
            {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.DEFINE_PERIOD_WEEK_SUBTITLE}
          </Typography>
          <ConfigExpenseDayStart 
            expensePeriod={configData.expensePeriod} 
            setExpensePeriod={handleUpdateExpensePeriod}
          />
          <Typography variant='body1'>
            {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.DEFINE_PERIOD_WEEK_HELPER_TEXT}
          </Typography>
        </> : null
      }
      {
        configData.expensePeriod.frequency === Constants.CONTENT.EXPENSE_PERIOD.FREQUENCY.MONTHLY ? 
        <>
          <Typography variant='h5'>
            {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.DEFINE_PERIOD_MONTH_SUBTITLE}
          </Typography>
          <ConfigExpenseMonthStart 
            expensePeriod={configData.expensePeriod}
            setExpensePeriod={handleUpdateExpensePeriod}
          />
          <Typography variant='body1'>
            {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.DEFINE_PERIOD_MONTH_HELPER_TEXT}
          </Typography>
        </> : null
      }
    </Stack>
  );
}

export default ConfigExpensePeriod;