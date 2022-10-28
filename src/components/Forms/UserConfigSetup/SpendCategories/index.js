import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Constants from '../../../../constants';
import Styles from './styles';
import validateSpendCategoryEntry from './validation';

const ConfigSpendCategories = () => {
  const { isMobileDisplay, configData, setConfigData } = useOutletContext();
  
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
        spendCategories: [...prevState.spendCategories, newCategory]
      }));
      setSpendCategory("");
      setError(null);
    }
  }

  const handleDeleteCategory = (idxToDelete) => {
    setConfigData((prevState) => ({
      ...prevState, 
      spendCategories: prevState.spendCategories.filter((_, idx) => idx !== idxToDelete)
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
      {configData.spendCategories.length > 0 ? 
        <Grid xs sx={formStyles.categoryChipGrid}>
          {configData.spendCategories.map((spendCategory, idx) => (
            <Chip 
              sx={formStyles.categoryChip} 
              label={spendCategory} 
              onDelete={() => { handleDeleteCategory(idx) }}
              key={idx}
            />
          ))}
        </Grid> : null
      }
    </>
  );
}

export default ConfigSpendCategories;