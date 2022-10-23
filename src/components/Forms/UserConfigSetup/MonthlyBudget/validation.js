import Constants from "../../../../constants";

const validateBudgetEntry = (budget) => {
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

export default validateBudgetEntry;