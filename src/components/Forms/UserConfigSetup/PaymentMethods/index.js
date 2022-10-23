import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Constants from '../../../../constants';
import Styles from './styles';
import validateNewPaymentMethodEntry from './validation';
import PaymentMethodEntryMobileDisplay from './mobile';

const ConfigPaymentMethods = () => {
  const { isMobileDisplay, configData, setConfigData } = useOutletContext();
  const navigate = useNavigate();
  const formStyles = Styles(isMobileDisplay);

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
    <>
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
      <Grid container direction="row" spacing={3} justifyContent="center" sx={formStyles.buttons}>
        <Grid>
          <Button 
            onClick={() => { navigate(Constants.PATHS.CONFIG.ROOT + "/" + Constants.PATHS.CONFIG.SUB_CONFIG_TWO) }}
          >
            {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.BACK_BTN}
          </Button>
        </Grid>
        <Grid>
          <Button 
            variant="contained" 
            onClick={() => { navigate(Constants.PATHS.CONFIG.ROOT + "/" + Constants.PATHS.CONFIG.SUB_CONFIG_FOUR); }}
          >
            {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.NEXT_BTN}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ConfigPaymentMethods;