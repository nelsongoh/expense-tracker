const Constants = Object.freeze({
  PATHS: Object.freeze({
    INDEX: "/",
    EXPENSE_FORM: "/item"
  }),
  COLLECTIONS: Object.freeze({
    EXPENSE: "Expense",
    EXPENSE_SUBCOLLECTION_ENTRY: "Entry"
  }),
  CONTENT: Object.freeze({
    FORMS: Object.freeze({
      AUTH: Object.freeze({
        TITLE: "Sign-up / Sign-in",
        NAME_FIELD: "Name",
        REGISTER_LOGIN_GOOGLE_BTN: "Sign up / in with Google",
      }),
      EXPENSE: Object.freeze({
        TITLE: "Create an Expense",
        AMOUNT_FIELD_PREFIX: "$",
        AMOUNT_FIELD: "Amount",
        AMOUNT_FIELD_HELPER: "How much did we spend?",
        EXPENSE_TITLE_FIELD: "Title",
        EXPENSE_TITLE_FIELD_HELPER: "What did we spend on?",
        DESCRIPTION_FIELD: "Description (Optional)",
        DESCRIPTION_FIELD_HELPER: "Any details about this expense?",
        DATE_FIELD: "Date of expense",
        DATE_FIELD_HELPER: "When was this spent?",
        PAYMENT_MODE_FIELD: "Mode of payment",
        PAYMENT_MODE_FIELD_HELPER: "How was this paid by?",
        ISSUER_TYPE_FIELD: "Issuer type",
        ISSUER_TYPE_FIELD_HELPER: "How was this paid through?",
        CURRENCY_FIELD: "Currency",
        CURRENCY_FIELD_HELPER: "Which currency was this in?",
        SUBMIT_BTN: "Create Expense Entry",
      })
    }),
    CURRENCY: Object.freeze({
      DEFAULT: "SGD",
      LIST: Object.freeze([
        Object.freeze({ value: 'AUD', label: 'AUD' }),
        Object.freeze({ value: 'EUR', label: 'EUR' }),
        Object.freeze({ value: 'JPY', label: 'JPY' }),
        Object.freeze({ value: 'KRW', label: 'KRW' }),
        Object.freeze({ value: 'MYR', label: 'MYR' }),
        Object.freeze({ value: 'SGD', label: 'SGD' }),
        Object.freeze({ value: 'THB', label: 'THB' }),
        Object.freeze({ value: 'USD', label: 'USD' }),
      ])
    }),
    PAYMENT_MODE: Object.freeze({
      DEFAULT: "Credit",
      LIST: Object.freeze([
        Object.freeze({ value: 'Credit', label: 'Credit' }),
        Object.freeze({ value: 'Debit', label: 'Debit' }),
        Object.freeze({ value: 'Cash', label: 'Cash' }),
      ])
    }),
    ISSUER_TYPE: Object.freeze({
      DEFAULT: "HSBC",
      LIST: Object.freeze([
        Object.freeze({ value: 'AMEX', label: 'AMEX' }),
        Object.freeze({ value: 'Citibank', label: 'Citibank' }),
        Object.freeze({ value: 'DBS', label: 'DBS' }),
        Object.freeze({ value: 'HSBC', label: 'HSBC' }),
        Object.freeze({ value: 'Maybank', label: 'Maybank' }),
        Object.freeze({ value: 'OCBC', label: 'OCBC' }),
        Object.freeze({ value: 'UOB', label: 'UOB' }),
        Object.freeze({ value: 'Standard Chartered', label: 'Standard Chartered' }),
        Object.freeze({ value: 'Trust Bank', label: 'Trust Bank' }),
      ])
    }),
  }),
  ERROR_MESSAGES: Object.freeze({
    FORMS: Object.freeze({
      EXPENSE: Object.freeze({
        AMOUNT: "The amount must be a number that is greater than 0.",
        PAYMENT_MODE: "The payment mode selected must be from the dropdown list provided.",
        ISSUER_TYPE: "The issuer type selected must be from the dropdown list provided.",
        CURRENCY: "The currency selected must be from the dropdown list provided.",
        DATE: "The date should be in a valid format.",
        TITLE: "Please enter a title for this expense.",
        CREATE_FAIL: "Your expense entry was not created successfully. Please try again later."
      })
    }),
    MUST_BE_LOGGED_IN: "You need to be logged in before using any of the features."
  }),
  SUCCESS_MESSAGES: Object.freeze({
    FORMS: Object.freeze({
      EXPENSE: "Your expense entry has been created!"
    })
  }),
  FORMATS: Object.freeze({
    DATE: Object.freeze({
      YEAR_MONTH_DATE: "YYYY-MM-DD",
    })
  }),
});

export default Constants;
