import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Constants from '../../../constants';

const DashboardSummary = ({ periods, currentPeriod, budget }) => {
  return (
    <>
      <Typography variant='h4' textAlign="center">{Constants.CONTENT.DASHBOARD.SUMMARY_TITLE}</Typography>
      <Stack direction="column" sx={{ marginLeft: 3, marginRight: 3, marginTop: 5 }} spacing={3}>
        <Typography variant='h5'>
          {`${Constants.CONTENT.DASHBOARD.EXPENSE_PERIOD_SUBTITLE} ${currentPeriod.date}`}
        </Typography>
        <Typography>
          {`${Constants.CONTENT.DASHBOARD.TOTAL_SPEND.PREFIX} 
          ${currentPeriod.data.totalPeriodExpense} 
          ${Constants.CONTENT.DASHBOARD.TOTAL_SPEND.SUFFIX} ${Number(budget).toLocaleString()}`}
        </Typography>
      </Stack>
    </>
  )
}

export default DashboardSummary;