import { firebaseDB } from "../../firebase";
import { collection, doc, arrayUnion, increment, setDoc, Timestamp, getDoc } from 'firebase/firestore';
import Constants from "../../constants";
import { dateToYYYYMMDDString } from "../../utils";

/**
 * A DAO function to create an expense entry for a given user
 * @param {Object} expenseDetails The expense details for this user
 * @param {Object} expensePeriodConfig The user's configuration for their expense period
 * @param {String} userID The user ID tagged to this user
 * @returns 
 */
export const createExpenseEntry = async (expenseDetails, expensePeriodConfig, userID) => {
  const writeOutcome = {
    isSuccess: false,
    errorMsg: ""
  };

  try {
    // Determine the collection to write to in the database
    let subcollectionDate = new Date(expenseDetails.date);  // Subcollection defaults to the expense entry's date
    let expenseEntryDocumentId = dateToYYYYMMDDString(subcollectionDate); // Defaults to the DAILY frequency

    // If this is a weekly period entry
    if (expensePeriodConfig.frequency === Constants.CONTENT.EXPENSE_PERIOD.FREQUENCY.WEEKLY) {  
      const entryDayOfWeek = subcollectionDate.getDay();
      let daysOfWeekDifference = entryDayOfWeek - expensePeriodConfig.start;

      if (daysOfWeekDifference < 0) {
        daysOfWeekDifference = 7 + daysOfWeekDifference;
      }

      subcollectionDate.setDate(subcollectionDate.getDate() - daysOfWeekDifference);
      expenseEntryDocumentId = dateToYYYYMMDDString(subcollectionDate);
    }
    // Else if this is a monthly period entry
    else if (expensePeriodConfig.frequency === Constants.CONTENT.EXPENSE_PERIOD.FREQUENCY.MONTHLY) {
      const entryDateObj = new Date(expenseDetails.date);
      const periodStartDate = new Date();
      periodStartDate.setDate(expensePeriodConfig.start);
      periodStartDate.setMonth(entryDateObj.getMonth());
      periodStartDate.setFullYear(entryDateObj.getFullYear());

      if (periodStartDate > entryDateObj) {
        periodStartDate.setMonth(entryDateObj.getMonth() - 1);
      }

      expenseEntryDocumentId = dateToYYYYMMDDString(periodStartDate);
    }

    // Create an entry in the database
    const expenseEntryRef = doc(
      collection(
        firebaseDB, 
        Constants.COLLECTIONS.EXPENSE, 
        userID, 
        Constants.COLLECTIONS.EXPENSE_SUBCOLLECTION_PERIOD
      ), 
      expenseEntryDocumentId
    );
    
    const expenseEntryData = {
      amount: expenseDetails.amt,
      title: expenseDetails.title,
      date: Timestamp.fromDate(new Date(expenseDetails.date)),
      paymentMode: expenseDetails.paymentMode,
      issuerType: expenseDetails.issuerType,
      currency: expenseDetails.currency,
      paymentName: expenseDetails.paymentName,
      paymentCategories: expenseDetails.paymentCategories,
    };

    await setDoc(
      expenseEntryRef, {
        entries: arrayUnion(expenseEntryData),
        totalPeriodExpense: increment(expenseDetails.amt)
      }, 
      { merge: true }
    );

    // Update the entry in the list of expense periods for this user
    const expenseMetadataRef = doc(
      collection(
        firebaseDB, 
        Constants.COLLECTIONS.EXPENSE, 
        userID, 
        Constants.COLLECTIONS.EXPENSE_SUBCOLLECTION_PERIOD
      ), 
      Constants.COLLECTIONS.EXPENSE_PERIOD_METADATA
    );

    await setDoc(
      expenseMetadataRef, {
        periods: arrayUnion(expenseEntryDocumentId),
      }, 
      { merge: true }
    );

    writeOutcome.isSuccess = true;
  } catch (error) {
    console.log(error);
    writeOutcome.errorMsg = error.message;
  }

  return writeOutcome;
};

/**
 * Retrieves the Expense metadata for a given user to further retrieve Expense details
 * @param {String} userID 
 */
export const getExpenseMetadata = async (userID) => {
  const writeOutcome = {
    isSuccess: false,
    data: null,
    errorMsg: "",
  };

  try {
    const expenseMetadataDocRef = doc(
      firebaseDB, 
      Constants.COLLECTIONS.EXPENSE, 
      userID, 
      Constants.COLLECTIONS.EXPENSE_SUBCOLLECTION_PERIOD,
      Constants.COLLECTIONS.EXPENSE_PERIOD_METADATA
    );

    const docSnapshot = await getDoc(expenseMetadataDocRef);
    if (docSnapshot.exists()) {
      writeOutcome.isSuccess = true;
      writeOutcome.data = docSnapshot.data().periods;
    } else {
      writeOutcome.errorMsg = Constants.ERROR_MESSAGES.DASHBOARD.NO_METADATA_FOUND;
    }
  } catch (error) {
    writeOutcome.errorMsg = Constants.ERROR_MESSAGES.DASHBOARD.METADATA_RETRIEVE_ERROR;
  }

  return writeOutcome;
}

/**
 * Method to retrieve Expense data for a given period
 * @param {String} userID The user ID of the user 
 * @param {String} period The Expense period for which to retrieve the Expense data
 */
export const getExpenseDataByPeriod = async (userID, period) => {
  const writeOutcome = {
    isSuccess: false,
    data: null,
    errorMsg: "",
  };

  try {
    const expenseDocRef = doc(
      firebaseDB, 
      Constants.COLLECTIONS.EXPENSE, 
      userID, 
      Constants.COLLECTIONS.EXPENSE_SUBCOLLECTION_PERIOD,
      period
    );

    const docSnapshot = await getDoc(expenseDocRef);
    if (docSnapshot.exists()) {
      writeOutcome.isSuccess = true;
      writeOutcome.data = docSnapshot.data();
    } else {
      writeOutcome.errorMsg = Constants.ERROR_MESSAGES.DASHBOARD.NO_EXPENSE_DATA_FOUND;
    }
  } catch (error) {
    writeOutcome.errorMsg = Constants.ERROR_MESSAGES.DASHBOARD.EXPENSE_DATA_RETRIEVE_ERROR;
  }

  return writeOutcome;
}

/**
 * A wrapper function to retrieve the initial data required to display the dashboard
 * @param {String} userID The user's ID
 * @returns An object containing the data, null if any of the inner data retrieval methods have failed 
 */
export const getInitialDashboardData = async (userID) => {
  const expensePeriods = await getExpenseMetadata(userID);
  if (expensePeriods.isSuccess) {
    const latestPeriod = dateToYYYYMMDDString(new Date(
      Math.max(...expensePeriods.data.map(e => new Date(e)))
    ));
    const latestPeriodData = await getExpenseDataByPeriod(userID, latestPeriod);
    
    if (latestPeriodData.isSuccess) {
      return {
        periods: expensePeriods,
        latestPeriod,
        latestPeriodData: latestPeriodData.data,
      }
    } else {
      return null;
    }
  }

  return null;
}
