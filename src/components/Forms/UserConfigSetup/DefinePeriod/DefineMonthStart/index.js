import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Constants from '../../../../../constants';
import Styles from './styles';

const ConfigExpenseMonthStart = ({ expensePeriod, setExpensePeriod }) => {
  const styles = Styles();

  const validateDateOfMonth = (date) => {
    if (date !== "") {
      if (isNaN(Number(date)) || Number(date) < 1 || Number(date) > 31) {
        return false;
      }
    }

    return true;
  }

  const handleUpdateMonthStart = (date) => {
    if (validateDateOfMonth(date)) {
      setExpensePeriod(
        Constants.CONTENT.EXPENSE_PERIOD.FREQUENCY.MONTHLY,
        date
      )
    }
  }

  const getOrdinalSuffix = (date) => {
    let ordinal = 'ST';
    const lastDigit = date % 10;
    
    if (lastDigit === 0 || lastDigit >= 4 || (date >= 10 && date <= 20)) {
      ordinal = 'TH';
    } else if (lastDigit === 2) {
      ordinal = 'ND';
    } else if (lastDigit === 3) {
      ordinal = 'RD';
    }

    return ordinal;
  } 
  
  return (
    <Stack direction="row">
      <TextField 
        variant='standard' 
        helperText={Constants.CONTENT.FORMS.USER_CONFIG_SETUP.DEFINE_PERIOD_MONTH_FIELD_HELPER} 
        inputProps={styles.dateFieldInputProps}
        sx={styles.dateField}
        value={expensePeriod.start}
        onChange={(e) => { handleUpdateMonthStart(e.target.value) }}
      />
      <Typography variant='body2' sx={styles.ordinalText}>
        {getOrdinalSuffix(expensePeriod.start)}
      </Typography>
    </Stack>
  )
}

export default ConfigExpenseMonthStart;