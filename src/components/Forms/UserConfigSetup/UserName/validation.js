import Constants from "../../../../constants";

const validateNameEntry = (name) => {
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

export default validateNameEntry;