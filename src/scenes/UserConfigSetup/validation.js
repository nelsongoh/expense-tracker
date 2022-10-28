import Constants from "../../constants";
import validateNewPaymentMethodEntry from "../../components/Forms/UserConfigSetup/PaymentMethods/validation";
import validateSpendCategoryEntry from "../../components/Forms/UserConfigSetup/SpendCategories/validation";

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

export const validateAllConfigEntries = (configEntries) => {
  const outcome = {};

  Object.keys(configEntries).forEach((field) => {
    outcome[field] = null
  });

  outcome["userName"] = validateNameEntry(configEntries.userName);
  outcome["monthlyBudget"] = validateBudgetEntry(configEntries.monthlyBudget);

  if (configEntries.paymentMethods.length > 0) {
    for (let i = 0; i < configEntries.paymentMethods.length; i += 1) {
      const currPaymentMethodValidity = validateNewPaymentMethodEntry(configEntries.paymentMethods[i]);
      if (!Object.values(currPaymentMethodValidity).every((val) => val === null)) {
        outcome["paymentMethods"] = Constants.ERROR_MESSAGES.FORMS.USER_CONFIG_SETUP.INVALID_PAYMENT_METHOD;
        break;
      }
    }
  }

  if (configEntries.spendCategories.length > 0) {
    for (let i = 0; i < configEntries.spendCategories.length; i += 1) {
      const spendCategoryOutcome = validateSpendCategoryEntry(configEntries.spendCategories[i]);
      if (spendCategoryOutcome) {
        outcome["spendCategories"] = spendCategoryOutcome;
        break;
      }
    }
  }

  return outcome;
}