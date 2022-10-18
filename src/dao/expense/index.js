import { firebaseDB } from "../../firebase";
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Constants from "../../constants";

/**
 * A DAO function to create an expense entry for a given user
 * @param {Object} expenseDetails The expense details for this user
 * @param {String} userID The user ID tagged to this user
 * @returns 
 */
export const createExpenseEntry = async (expenseDetails, userID) => {
  const writeOutcome = {
    isSuccess: false,
    errorMsg: ""
  };

  try {
    await addDoc(collection(firebaseDB, Constants.COLLECTIONS.EXPENSE, userID), {
      amount: expenseDetails.amt,
      title: expenseDetails.title,
      date: Timestamp.fromDate(new Date(expenseDetails.date)),
      paymentMode: expenseDetails.paymentMode,
      issuerType: expenseDetails.issuerType,
      currency: expenseDetails.currency
    });
    writeOutcome.isSuccess = true;
  } catch (error) {
    writeOutcome.errorMsg = error.message;
  }

  return writeOutcome;
};
