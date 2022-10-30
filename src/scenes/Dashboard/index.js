import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import DashboardSummary from '../../components/Dashboard/Summary';
import Styles from './styles';
import Constants from '../../constants';

const DashboardScene = () => {
  const styles = Styles();
  const { periods, latestPeriod, latestPeriodData, userConfig } = useLoaderData();
  const [selectedPeriod, setSelectedPeriod] = useState(latestPeriod ? latestPeriod : null);
  const [currentPeriod, setCurrentPeriod] = useState({
    date: latestPeriod ? latestPeriod : Constants.CONTENT.DASHBOARD.EXPENSE_PERIOD_UNAVAILABLE,
    data: latestPeriodData ? latestPeriodData : null
  });

  useEffect(() => {

  }, []);

  return (
    <Grid container direction="column" alignItems="center" sx={styles.parentGrid}>
      <Grid xs>
        <DashboardSummary 
          periods={periods}
          budget={userConfig.periodBudget}
          currentPeriod={currentPeriod}
        />
      </Grid>
    </Grid>
  );
}

export default DashboardScene;