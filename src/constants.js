const Constants = Object.freeze({
  PATHS: Object.freeze({
    INDEX: "/",
    EXPENSE_FORM: "/item",
    CONFIG: Object.freeze({
      ROOT: "/config",
      SUB_CONFIG_ONE: "1",
      SUB_CONFIG_TWO: "2",
      SUB_CONFIG_THREE: "3",
      SUB_CONFIG_FOUR: "4",
    }),
  }),
  COLLECTIONS: Object.freeze({
    EXPENSE: "Expense",
    EXPENSE_SUBCOLLECTION_ENTRY: "Entry",
    APPLICATION_CONFIG: "ApplicationConfiguration",
  }),
  CONTENT: Object.freeze({
    FORMS: Object.freeze({
      USER_CONFIG_SETUP: Object.freeze({
        TITLE: "Expense Tracker Configuration",
        CONFIG_STEPS: Object.freeze([
          "Provide your name",
          "Set your monthly budget",
          "Add payment methods",
          "Set up spend categories"
        ]),
        SKIP_BTN: "SKIP SETUP",
        NEXT_BTN: "NEXT",
        BACK_BTN: "BACK",
        SAVE_BTN: "SAVE",
        NAME_FIELD: "Name",
        NAME_HELPER_TEXT: "What's your name!",
        MONTHLY_BUDGET_FIELD: "Monthly Budget",
        MONTHLY_BUDGET_HELPER_TEXT: "How much do you plan to cap your spending to each month?",
        SPEND_CATEGORIES_FIELD: "Custom spending category",
        SPEND_CATEGORIES_DEFAULT: Object.freeze([
          "Food", "Transport", "Utilities", "Entertainment", "Shopping"
        ]),
        SPEND_CATEGORIES_HELPER_TEXT: "Create your own spend category here",
        PAYMENT_METHOD_FIELD: "Payment method",
        PAYMENT_ISSUER_FIELD: "Issuing bank",
        PAYMENT_TYPE_FIELD: "Payment type",
        NO_PAYMENT_METHODS: "You do not have any payment methods set up.",
      }),
      AUTH: Object.freeze({
        TITLE: "Sign-up / Sign-in",
        REGISTER_LOGIN_GOOGLE_BTN: "Register / sign-in with Google",
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
      }),
      USER_CONFIG_SETUP: Object.freeze({
        USER_NAME: "Please enter your name.",
        MONTHLY_BUDGET: "Please enter an amount greater than 0.",
        PAYMENT_NAME: "Please enter a name for the payment method you are adding.",
        PAYMENT_TYPE: "Please select a valid payment type.",
        PAYMENT_ISSUER: "Please enter a valid issuer name for the payment method you are adding.",
        INVALID_PAYMENT_METHOD: "One or more payment methods have invalid values.",
        SPEND_CATEGORY: "Please enter a valid spend category.",
      }),
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
