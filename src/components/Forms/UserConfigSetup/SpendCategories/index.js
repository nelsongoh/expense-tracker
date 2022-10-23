import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Constants from '../../../../constants';
import Styles from './styles';
import validateSpendCategoryEntry from './validation';

const ConfigSpendCategories = () => {
  const { isMobileDisplay, configData, setConfigData } = useOutletContext();
  const navigate = useNavigate();
  const formStyles = Styles(isMobileDisplay);
  const [spendCategory, setSpendCategory] = useState("");
  const [error, setError] = useState(null);
  const handleAddCategory = (newCategory) => {
    const errorMsg = validateSpendCategoryEntry(newCategory);
    if (errorMsg) {
      setError(errorMsg);
    } else {
      setConfigData((prevState) => ({
        ...prevState,
        spendingCategories: [...prevState.spendingCategories, newCategory]
      }));
      setSpendCategory("");
      setError(null);
    }
  }

  const handleDeleteCategory = (idxToDelete) => {
    setConfigData((prevState) => ({
      ...prevState, 
      spendingCategories: prevState.spendingCategories.filter((_, idx) => idx !== idxToDelete)
    }));
  }

  return (
    <>
      <Grid container direction="row">
        <Grid xs={10} sx={formStyles.textField}>
          <TextField 
            fullWidth
            label={Constants.CONTENT.FORMS.USER_CONFIG_SETUP.SPEND_CATEGORIES_FIELD}
            error={error !== null}
            helperText={
              error ? error : Constants.CONTENT.FORMS.USER_CONFIG_SETUP.SPEND_CATEGORIES_HELPER_TEXT
            }
            value={spendCategory}
            onChange={(e) => { setSpendCategory(e.target.value) }}
          />
        </Grid>
        <Grid xs sx={formStyles.addNewSpendCategoryBtn}>
          <Fab size="medium" color="primary" onClick={() => { handleAddCategory(spendCategory) }}>
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
      {configData.spendingCategories.length > 0 ? 
        <Grid xs sx={formStyles.categoryChipGrid}>
          {configData.spendingCategories.map((spendCategory, idx) => (
            <Chip sx={formStyles.categoryChip} label={spendCategory} onDelete={() => { handleDeleteCategory(idx) }} />
          ))}
        </Grid> : null
      }
      <Grid container direction="row" spacing={3} justifyContent="center" sx={formStyles.buttons}>
        <Grid>
          <Button 
            onClick={() => { navigate(Constants.PATHS.CONFIG.ROOT + "/" + Constants.PATHS.CONFIG.SUB_CONFIG_THREE) }}
          >
            {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.BACK_BTN}
          </Button>
        </Grid>
        <Grid>
          <Button 
            variant="contained" 
            onClick={() => {  }}
          >
            {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.SAVE_BTN}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ConfigSpendCategories;