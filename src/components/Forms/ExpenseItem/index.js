import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AppDatePicker from '../../AppDatePicker';
import Styles from './styles';
import Constants from '../../../constants';
import validateExpenseItem from './validation';

const ExpenseItem = ({ isMobileDisplay }) => {
  const formStyles = Styles(isMobileDisplay);
  const [expense, setExpense] = useState({
    amt: "",
    title: "",
    desc: "",
    date: new Date().toISOString().split('T')[0],
    paymentMode: Constants.CONTENT.PAYMENT_MODE.DEFAULT,
    issuerType: Constants.CONTENT.ISSUER_TYPE.DEFAULT,
    currency: Constants.CONTENT.CURRENCY.DEFAULT,
  });

  const [errorMsgs, setErrorMsgs] = useState({
    amt: null,
    title: null,
    date: null,
    paymentMode: null,
    issuerType: null,
    currency: null
  });

  const handleUpdateExpenseField = (field, newValue) => {
    setExpense({...expense, [field]: newValue});
  }

  const handleUpdateDateField = (newValue) => {
    setExpense({...expense, date: newValue.format('YYYY-MM-DD')});
  }

  const validateFormErrors = () => {
    setErrorMsgs(validateExpenseItem(expense));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" maxHeight="100vh" sx={formStyles.box}>
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Paper variant='outlined' sx={formStyles.paper}>
          <Grid container direction="column" spacing={3}>
            <Grid xs display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h4" sx={formStyles.title}>
                {Constants.CONTENT.FORMS.EXPENSE.TITLE}
              </Typography>
            </Grid>
            <Grid container display="flex" spacing={1}>
              <Grid xs={isMobileDisplay ? 5 : 6}>
                <TextField
                  label={Constants.CONTENT.FORMS.EXPENSE.PAYMENT_MODE_FIELD}
                  helperText={isMobileDisplay ? "" : Constants.CONTENT.FORMS.EXPENSE.PAYMENT_MODE_FIELD_HELPER}
                  error={errorMsgs.paymentMode}
                  select
                  required
                  value={expense.paymentMode}
                  onChange={(e) => { handleUpdateExpenseField("paymentMode", e.target.value) }}
                  size="small"
                  sx={formStyles.paymentModeField}
                >
                  {Constants.CONTENT.PAYMENT_MODE.LIST.map((paymentMode) => (
                    <MenuItem key={Math.random()} value={paymentMode.value}>{paymentMode.label}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs>
                <TextField
                  label={Constants.CONTENT.FORMS.EXPENSE.ISSUER_TYPE_FIELD}
                  helperText={isMobileDisplay ? "" : Constants.CONTENT.FORMS.EXPENSE.ISSUER_TYPE_FIELD_HELPER}
                  error={errorMsgs.issuerType}
                  select
                  required
                  value={expense.issuerType}
                  onChange={(e) => { handleUpdateExpenseField("issuerType", e.target.value) }}
                  size="small"
                  sx={formStyles.issuerTypeField}
                >
                  {Constants.CONTENT.ISSUER_TYPE.LIST.map((issuerType) => (
                    <MenuItem key={Math.random()} value={issuerType.value}>{issuerType.label}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid container display="flex" spacing={1}>
              <Grid xs={isMobileDisplay ? 4 : 6}>
                <TextField
                  label={Constants.CONTENT.FORMS.EXPENSE.CURRENCY_FIELD}
                  helperText={isMobileDisplay ? "" : Constants.CONTENT.FORMS.EXPENSE.CURRENCY_FIELD_HELPER}
                  error={errorMsgs.currency}
                  select
                  required
                  value={expense.currency}
                  onChange={(e) => { handleUpdateExpenseField("currency", e.target.value) }}
                  size="small"
                  sx={formStyles.currencyField}
                >
                  {Constants.CONTENT.CURRENCY.LIST.map((currency) => (
                    <MenuItem key={Math.random()} value={currency.value}>{currency.label}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs>
                <TextField
                  label={Constants.CONTENT.FORMS.EXPENSE.AMOUNT_FIELD}
                  helperText={
                    isMobileDisplay ? "" : 
                    errorMsgs.amt === null ? Constants.CONTENT.FORMS.EXPENSE.AMOUNT_FIELD_HELPER :
                    errorMsgs.amt
                  }
                  error={errorMsgs.amt}
                  required
                  value={expense.amt}
                  onChange={(e) => handleUpdateExpenseField("amt", e.target.value)}
                  InputProps={{
                    startAdornment: 
                    <InputAdornment position="start">
                      {Constants.CONTENT.FORMS.EXPENSE.AMOUNT_FIELD_PREFIX}
                    </InputAdornment>
                  }}
                  inputProps={{ inputMode: 'decimal' }}
                  size="small"
                  sx={formStyles.amtField} />
              </Grid>
            </Grid>
            <Grid xs display="flex" justifyContent="center" alignItems="center">
              <AppDatePicker 
                dateYYYYMMDD={expense.date} 
                updateDate={handleUpdateDateField}
                label={Constants.CONTENT.FORMS.EXPENSE.DATE_FIELD}
                error={errorMsgs.date}
                helperText={Constants.CONTENT.FORMS.EXPENSE.DATE_FIELD_HELPER}
                sx={formStyles.textField}
              />
            </Grid>
            <Grid xs display="flex" justifyContent="center" alignItems="center">
              <TextField 
                label={Constants.CONTENT.FORMS.EXPENSE.EXPENSE_TITLE_FIELD} 
                helperText={
                  errorMsgs.title === null ? Constants.CONTENT.FORMS.EXPENSE.EXPENSE_TITLE_FIELD_HELPER :
                  errorMsgs.title
                }
                error={errorMsgs.title}
                value={expense.title}
                required
                onChange={(e) => handleUpdateExpenseField("title", e.target.value)}
                size="small"
                sx={formStyles.textField} />
            </Grid>
            <Grid xs display="flex" justifyContent="center" alignItems="center">
              <TextField 
                label={Constants.CONTENT.FORMS.EXPENSE.DESCRIPTION_FIELD}
                helperText={Constants.CONTENT.FORMS.EXPENSE.DESCRIPTION_FIELD_HELPER}
                value={expense.desc}
                onChange={(e) => handleUpdateExpenseField("desc", e.target.value)}
                multiline
                rows={2}
                size="small"
                sx={formStyles.textField} />
            </Grid>
          </Grid>
        </Paper>
        <Grid xs>
          <Button variant='contained' onClick={validateFormErrors} sx={formStyles.btn}>
            {Constants.CONTENT.FORMS.EXPENSE.SUBMIT_BTN}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ExpenseItem;