import Constants from "../../../../constants";

const validateSpendCategoryEntry = (spendCategory) => {
  let errorMsg = null;

  // Validate the custom spend category in the configuration setup
  if (
    spendCategory.trim() === "" ||
    spendCategory === null ||
    typeof spendCategory === "undefined"
  ) {
    errorMsg = Constants.ERROR_MESSAGES.FORMS.USER_CONFIG_SETUP.SPEND_CATEGORY;
  }

  return errorMsg;
}

export default validateSpendCategoryEntry;