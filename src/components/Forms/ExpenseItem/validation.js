import dayjs from "dayjs";
import Constants from "../../../constants";

const validateExpenseItem = (formFields) => {
  const formValidity = {};

  // Initialize the form validity object that will be returned
  // based on the fields provided in the method argument
  Object.keys(formFields).forEach((fieldKey) => {
    formValidity[fieldKey] = null;
  });

  // Validate the expense amount
  if (
    isNaN(Number(formFields["amt"])) ||
    Number(formFields["amt"]) <= 0
  ) {
    formValidity["amt"] = Constants.ERROR_MESSAGES.FORMS.EXPENSE.AMOUNT;
  }

  // Validate the mode of payment
  if (!(Constants.CONTENT.PAYMENT_MODE.LIST.map((paymentMode) => paymentMode.value)).includes(formFields["paymentMode"])) {
    formValidity["paymentMode"] = Constants.ERROR_MESSAGES.FORMS.EXPENSE.PAYMENT_MODE;
  }

  // Validate the issuer type
  if (!(Constants.CONTENT.ISSUER_TYPE.LIST.map((issuerType) => issuerType.value)).includes(formFields["issuerType"])) {
    formValidity["issuerType"] = Constants.ERROR_MESSAGES.FORMS.EXPENSE.ISSUER_TYPE;
  }

  // Validate the currency
  if (!(Constants.CONTENT.CURRENCY.LIST.map((currency) => currency.value)).includes(formFields["currency"])) {
    formValidity["currency"] = Constants.ERROR_MESSAGES.FORMS.EXPENSE.CURRENCY;
  }

  // Validate the date
  if (!dayjs(formValidity["date"], 'YYYY-MM-DD', true).isValid()) {
    formValidity["date"] = Constants.ERROR_MESSAGES.FORMS.EXPENSE.DATE;
  }

  // Validate the expense title
  if (
    formFields["title"].trim() === "" ||
    formFields["title"] === null ||
    typeof formFields["title"] === "undefined"
  ) {
    formValidity["title"] = Constants.ERROR_MESSAGES.FORMS.EXPENSE.TITLE;
  }

  return formValidity;
}

export default validateExpenseItem;