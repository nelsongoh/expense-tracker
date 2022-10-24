import { firebaseDB } from "../../firebase";
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import Constants from "../../constants";

/**
 * A DAO function to fully replace or create the user's configurations
 * for the expense tracker
 * @param {Object} expenseDetails The expense details for this user
 * @param {String} userID The user ID tagged to this user
 * @returns 
 */
export const createOrReplaceUserConfig = async (configDetails, userID) => {
  const writeOutcome = {
    isSuccess: false,
    errorMsg: ""
  };

  try {
    const appConfigEntryRef = doc(firebaseDB, Constants.COLLECTIONS.APPLICATION_CONFIG, userID);
    const appConfigData = {
      userName: configDetails.userName,
      monthlyBudget: configDetails.monthlyBudget,
      paymentMethods: configDetails.paymentMethods,
      spendingCategories: configDetails.spendingCategories,
      lastModifiedDate: Timestamp.fromDate(new Date()),
    };
    await setDoc(appConfigEntryRef, appConfigData);
    writeOutcome.isSuccess = true;
  } catch (error) {
    writeOutcome.errorMsg = error.message;
  }

  return writeOutcome;
};

export const getUserConfig = async (userID) => {
  const docRef = doc(firebaseDB, Constants.COLLECTIONS.APPLICATION_CONFIG, userID);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return docSnapshot.data();
  }

  return null;
}
