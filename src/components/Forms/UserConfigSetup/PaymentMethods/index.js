import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Constants from '../../../../constants';
import validateNewPaymentMethodEntry from './validation';
import PaymentMethodEntryMobileDisplay from './mobile';

const ConfigPaymentMethods = () => {
  const { configData, setConfigData } = useOutletContext();

  const [newPaymentEntry, setNewPaymentEntry] = useState({
    paymentName: "",
    paymentType: Constants.CONTENT.PAYMENT_MODE.DEFAULT,
    paymentIssuer: "",
  });
  const handleUpdateNewPaymentEntryField = (field, value) => {
    setNewPaymentEntry({ ...newPaymentEntry, [field]: value });
  }

  const [errorMsgs, setErrorMsgs] = useState({
    paymentName: null,
    paymentType: null,
    paymentIssuer: null
  }); 

  const addPaymentMethod = () => {
    const validationOutcome = validateNewPaymentMethodEntry(newPaymentEntry)
    setErrorMsgs(validationOutcome);
    const isNewPaymentEntryValid = Object.values(validationOutcome).every((value) => value === null);
    if (isNewPaymentEntryValid) {
      setConfigData((prevState) => ({ ...prevState, paymentMethods: [...prevState.paymentMethods, newPaymentEntry] }));
      // Clear the state of the component-local new payment entry
      setNewPaymentEntry({
        paymentName: "",
        paymentType: Constants.CONTENT.PAYMENT_MODE.DEFAULT,
        paymentIssuer: "",
      });
    }
  }

  const removePaymentMethod = (idxToRemove) => {
    setConfigData((prevState) => ({ 
      ...prevState, 
      paymentMethods: prevState.paymentMethods.filter((_, idx) => idx !== idxToRemove) 
    }));
  }

  return (
    <PaymentMethodEntryMobileDisplay 
      isMobileDisplay
      paymentMethodData={configData.paymentMethods}
      paymentName={newPaymentEntry.paymentName}
      updatePaymentEntry={handleUpdateNewPaymentEntryField}
      paymentIssuer={newPaymentEntry.paymentIssuer}
      paymentType={newPaymentEntry.paymentType}
      addPaymentMethod={addPaymentMethod}
      removePaymentMethod={removePaymentMethod}
      errorMsgs={errorMsgs}
    />
  );
}

export default ConfigPaymentMethods;