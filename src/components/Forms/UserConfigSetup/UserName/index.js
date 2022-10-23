import { useOutletContext } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Constants from '../../../../constants';

const ConfigUserName = () => {
  const { configData, setConfigData, errorMsgs } = useOutletContext();
  const handleUpdateName = (newName) => {
    setConfigData((prevState) => ({ ...prevState, userName: newName }));
  };

  return (
    <TextField 
      label={Constants.CONTENT.FORMS.USER_CONFIG_SETUP.NAME_FIELD}
      error={errorMsgs.userName !== null}
      helperText={
        errorMsgs.userName ? 
        errorMsgs.userName : 
        Constants.CONTENT.FORMS.USER_CONFIG_SETUP.NAME_HELPER_TEXT
      }
      fullWidth 
      value={configData.userName}
      onChange={(e) => { handleUpdateName(e.target.value) }}
    />
  )
}

export default ConfigUserName;