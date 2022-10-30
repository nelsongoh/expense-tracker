import { firebaseDB } from "../../firebase";
import { collection, doc, arrayUnion, increment, setDoc, Timestamp } from 'firebase/firestore';
import Constants from "../../constants";

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
    let expenseEntryDocumentId = subcollectionDate.toISOString().split('T')[0]; // Defaults to the DAILY frequency

    // If this is a weekly period entry
    if (expensePeriodConfig.frequency === Constants.CONTENT.EXPENSE_PERIOD.FREQUENCY.WEEKLY) {  
      const entryDayOfWeek = subcollectionDate.getDay();
      let daysOfWeekDifference = entryDayOfWeek - expensePeriodConfig.start;

      if (daysOfWeekDifference < 0) {
        daysOfWeekDifference = 7 + daysOfWeekDifference;
      }

      subcollectionDate.setDate(subcollectionDate.getDate() - daysOfWeekDifference);
      expenseEntryDocumentId = subcollectionDate.toISOString().split('T')[0];
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

      expenseEntryDocumentId = periodStartDate.toISOString().split('T')[0];
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

    writeOutcome.isSuccess = true;
  } catch (error) {
    console.log(error);
    writeOutcome.errorMsg = error.message;
  }

  return writeOutcome;
};

export const getTotalSpend = async (userID, startDate, endDate) => {

}
