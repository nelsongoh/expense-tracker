import Constants from "../../constants";

export const validateNameEntry = (name) => {
  let errorMsg = null;

  // Validate the name of the user in the configuration setup
  if (
    name.trim() === "" ||
    name === null ||
    typeof name === "undefined"
  ) {
    errorMsg = Constants.ERROR_MESSAGES.FORMS.USER_CONFIG_SETUP.USER_NAME;
  }

  return errorMsg;
}

export const validateBudgetEntry = (budget) => {
  let errorMsg = null;

  // Validate the expense amount
  if (
    isNaN(Number(budget)) ||
    Number(budget) <= 0
  ) {
    errorMsg = Constants.ERROR_MESSAGES.FORMS.EXPENSE.AMOUNT;
  }

  return errorMsg;
}