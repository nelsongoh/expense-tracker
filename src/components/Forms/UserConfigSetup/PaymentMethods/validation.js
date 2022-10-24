import Constants from "../../../../constants";

const validateNewPaymentMethodEntry = (formFields) => {
  const formValidity = {};

  // Initialize the form validity object that will be returned
  // based on the fields provided in the method argument
  Object.keys(formFields).forEach((fieldKey) => {
    formValidity[fieldKey] = null;
  });

  // Validate the name for this payment method to be added
  if (
    formFields["paymentName"].trim() === "" ||
    formFields["paymentName"] === null ||
    typeof formFields["paymentName"] === "undefined"
  ) {
    formValidity["paymentName"] = Constants.ERROR_MESSAGES.FORMS.USER_CONFIG_SETUP.PAYMENT_NAME;
  }

  // Validate the name for payment issuer to be added
  if (
    formFields["paymentIssuer"].trim() === "" ||
    formFields["paymentIssuer"] === null ||
    typeof formFields["paymentIssuer"] === "undefined"
  ) {
    formValidity["paymentIssuer"] = Constants.ERROR_MESSAGES.FORMS.USER_CONFIG_SETUP.PAYMENT_ISSUER;
  }

  // Validate the payment type from approved list
  const paymentTypeValues = Constants.CONTENT.PAYMENT_MODE.LIST.map((labelValuePair) => labelValuePair.value);
  if (!paymentTypeValues.includes(formFields["paymentType"])) {
    formValidity["paymentType"] = Constants.ERROR_MESSAGES.FORMS.USER_CONFIG_SETUP.PAYMENT_TYPE;
  }

  return formValidity;
}

export default validateNewPaymentMethodEntry;