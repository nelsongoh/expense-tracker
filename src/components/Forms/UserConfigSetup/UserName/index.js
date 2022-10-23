import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Styles from './styles';
import Constants from '../../../../constants';
import validateNameEntry from './validation';

const ConfigUserName = () => {
  const { isMobileDisplay, configData, setConfigData } = useOutletContext();
  const navigate = useNavigate();
  const formStyles = Styles(isMobileDisplay);
  const handleUpdateName = (newName) => {
    setConfigData((prevState) => ({ ...prevState, userName: newName }));
  };

  const [errorMsg, setErrorMsg] = useState(null); 
  const goToNextSetup = () => {
    const outcome = validateNameEntry(configData.userName);
    if (outcome) {
      setErrorMsg(outcome);
    } else {
      navigate(Constants.PATHS.CONFIG.ROOT + "/" + Constants.PATHS.CONFIG.SUB_CONFIG_TWO);
    }
  }

  // TODO: Implement the "Skip Setup" logic to redirect user to the Home page

  return (
    <>
      <TextField 
        label={Constants.CONTENT.FORMS.USER_CONFIG_SETUP.NAME_FIELD}
        error={errorMsg !== null}
        helperText={errorMsg ? errorMsg : Constants.CONTENT.FORMS.USER_CONFIG_SETUP.NAME_HELPER_TEXT}
        sx={formStyles.textField} 
        value={configData.userName}
        onChange={(e) => { handleUpdateName(e.target.value) }}
      />
      <Grid container direction="row" spacing={3} justifyContent="center" sx={formStyles.buttons}>
        <Grid>
          <Button>{Constants.CONTENT.FORMS.USER_CONFIG_SETUP.SKIP_BTN}</Button>
        </Grid>
        <Grid>
          <Button variant="contained" onClick={goToNextSetup}>{Constants.CONTENT.FORMS.USER_CONFIG_SETUP.NEXT_BTN}</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default ConfigUserName;