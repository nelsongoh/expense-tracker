import { useContext, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/auth/context';
import DisplayContext from '../../../context/display/context';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AppDatePicker from '../../AppDatePicker';
import Styles from './styles';
import Constants from '../../../constants';
import validateExpenseItem from './validation';
import { createExpenseEntry } from '../../../dao/expense';
import ExpenseCategories from './ExpenseCategories';

const ExpenseItem = () => {
  const authUser = useContext(AuthContext);
  const { isMobileDisplay, formState, spendCategories, updateSnackbar } = useOutletContext();
  const navigate = useNavigate();
  const { maxContentHeight } = useContext(DisplayContext);
  const formStyles = Styles(isMobileDisplay);

  const [expense, setExpense] = useState({
    amt: "",
    title: "",
    desc: "",
    date: new Date().toISOString().split('T')[0],
    paymentName: formState.expense ? 
      formState.expense.paymentName : 
      "",
    paymentMode: formState.expense ? 
      formState.expense.paymentType : 
      Constants.CONTENT.PAYMENT_MODE.DEFAULT,
    issuerType: formState.expense ? 
      formState.expense.paymentIssuer : 
      Constants.CONTENT.ISSUER_TYPE.DEFAULT,
    currency: Constants.CONTENT.CURRENCY.DEFAULT,
    paymentCategories: [],
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
    setExpense({...expense, date: newValue.format(Constants.FORMATS.DATE.YEAR_MONTH_DATE)});
  }

  const handleSelectCategories = (selectedCategory) => {
    const selectedCategoryIdx = expense.paymentCategories.indexOf(selectedCategory);
    if (selectedCategoryIdx > -1) {
      setExpense((prevState) => ({
        ...prevState, 
        paymentCategories: prevState.paymentCategories.filter(category => category !== selectedCategory)
      }));
    } else {
      setExpense((prevState) => ({
        ...prevState, 
        paymentCategories: [...prevState.paymentCategories, selectedCategory]
      }));
    }
  }

  const writeExpenseEntry = async () => {
    const entryValidationOutcome = validateExpenseItem(expense);
    setErrorMsgs(entryValidationOutcome);
    const isExpenseEntryValid = Object.values(entryValidationOutcome).every((value) => value === null);
    if (isExpenseEntryValid) {
      if (authUser) {
        const outcome = await createExpenseEntry(expense, authUser.uid);
        if (outcome.isSuccess) {
          updateSnackbar(Constants.ALERT_TYPE.SUCCESS, Constants.SUCCESS_MESSAGES.FORMS.EXPENSE);
          // Redirect user to the Home page
          navigate(Constants.PATHS.HOME);
        } else {
          updateSnackbar(Constants.ALERT_TYPE.ERROR, Constants.ERROR_MESSAGES.FORMS.EXPENSE.CREATE_FAIL);
        }
      } else {
        updateSnackbar(Constants.ALERT_TYPE.ERROR, Constants.ERROR_MESSAGES.MUST_BE_LOGGED_IN);
      }
      
    }
  };

  return (
    <Stack display="flex" justifyContent="center" alignItems="center" maxHeight={maxContentHeight}>
      <Grid container direction="column" alignItems="center" spacing={3} sx={formStyles.formGrid}>
        <Paper variant='outlined' sx={formStyles.paper}>
          <Grid container direction="column" spacing={3}>
            {/* This is the form title */}
            <Grid xs display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h4" sx={formStyles.title}>
                {Constants.CONTENT.FORMS.EXPENSE.TITLE}
              </Typography>
            </Grid>
            {/* This is the row for the payment mode and issuer type */}
            <Grid container display="flex" spacing={1}>
              <Grid xs={isMobileDisplay ? 5 : 6}>
                <TextField
                  label={Constants.CONTENT.FORMS.EXPENSE.PAYMENT_MODE_FIELD}
                  helperText={isMobileDisplay ? "" : Constants.CONTENT.FORMS.EXPENSE.PAYMENT_MODE_FIELD_HELPER}
                  disabled={
                    formState.expense ? (
                      formState.expense.paymentType ? true : false
                    ) : false
                  }
                  error={errorMsgs.paymentMode !== null}
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
                  error={errorMsgs.issuerType !== null}
                  disabled={
                    formState.expense ? (
                      formState.expense.paymentIssuer ? true : false
                    ) : false
                  }
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
                  {expense.issuerType ? (
                    <MenuItem key={Math.random()} value={expense.issuerType}>{expense.issuerType}</MenuItem>
                  ) : null}
                </TextField>
              </Grid>
            </Grid>
            {/* This is the payment name field */}
            <Grid xs display="flex" justifyContent="center" alignItems="center">
              <TextField
                label={Constants.CONTENT.FORMS.EXPENSE.PAYMENT_NAME_FIELD}
                helperText={Constants.CONTENT.FORMS.EXPENSE.PAYMENT_NAME_FIELD_HELPER}
                disabled={
                    formState.expense ? (
                      formState.expense.paymentName ? true : false
                    ) : false
                  }
                value={expense.paymentName}
                onChange={(e) => { handleUpdateExpenseField("paymentName", e.target.value) }}
                size="small"
                sx={formStyles.textField}
              />
            </Grid>
            {/* This is the row for the currency and amount */}
            <Grid container display="flex" spacing={1}>
              <Grid xs={isMobileDisplay ? 4 : 6}>
                <TextField
                  label={Constants.CONTENT.FORMS.EXPENSE.CURRENCY_FIELD}
                  helperText={isMobileDisplay ? "" : Constants.CONTENT.FORMS.EXPENSE.CURRENCY_FIELD_HELPER}
                  error={errorMsgs.currency !== null}
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
                  error={errorMsgs.amt !== null}
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
            {/* This is the datepicker */}
            <Grid xs display="flex" justifyContent="center" alignItems="center">
              <AppDatePicker 
                dateYYYYMMDD={expense.date} 
                updateDate={handleUpdateDateField}
                label={Constants.CONTENT.FORMS.EXPENSE.DATE_FIELD}
                errorMessage={errorMsgs.date}
                helperText={Constants.CONTENT.FORMS.EXPENSE.DATE_FIELD_HELPER}
                sx={formStyles.textField}
              />
            </Grid>
            {/* This is the expense title */}
            <Grid xs display="flex" justifyContent="center" alignItems="center">
              <TextField 
                label={Constants.CONTENT.FORMS.EXPENSE.EXPENSE_TITLE_FIELD} 
                helperText={
                  errorMsgs.title === null ? Constants.CONTENT.FORMS.EXPENSE.EXPENSE_TITLE_FIELD_HELPER :
                  errorMsgs.title
                }
                error={errorMsgs.title !== null}
                value={expense.title}
                required
                onChange={(e) => handleUpdateExpenseField("title", e.target.value)}
                size="small"
                sx={formStyles.textField} />
            </Grid>
            {/* This is the list of expense categories to pick from */}
            <Grid display="flex" justifyContent="center" alignItems="center">
              <ExpenseCategories 
                preconfigSpendCategories={spendCategories} 
                selectedCategories={expense.paymentCategories} 
                handleSelectCategories={handleSelectCategories} 
              />
            </Grid>
            {/* This is the expense description */}
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
        <Grid>
          <Button variant='contained' onClick={async () => { await writeExpenseEntry(); }} sx={formStyles.btn}>
            {Constants.CONTENT.FORMS.EXPENSE.SUBMIT_BTN}
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default ExpenseItem;