import { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Chip from '@mui/material/Chip';
import Constants from '../../../../constants';
import Styles from './styles';

const ExpenseCategories = ({ preconfigSpendCategories, handleSelectCategories, selectedCategories }) => {
  const styles = Styles();
  const [displayedCategories, setDisplayedCategories] = useState(
    Constants.CONTENT.FORMS.USER_CONFIG_SETUP.SPEND_CATEGORIES_DEFAULT);

  useEffect(() => {
    if (preconfigSpendCategories && preconfigSpendCategories.length > 0) {
      setDisplayedCategories(preconfigSpendCategories);
    }
  }, [preconfigSpendCategories])

  return (
    <Grid sx={styles.chipGrid}>
      {displayedCategories.map((spendCategory, idx) => (
        <Chip 
          sx={styles.categoryChip} 
          label={spendCategory}
          color={selectedCategories.includes(spendCategory) ? "primary" : undefined}
          onClick={() => { handleSelectCategories(spendCategory) }}
          key={idx}
        />
      ))}
    </Grid>
  )
}

export default ExpenseCategories;