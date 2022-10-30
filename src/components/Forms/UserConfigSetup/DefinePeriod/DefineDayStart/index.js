import { useContext } from 'react';
import DisplayContext from '../../../../../context/display/context';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Constants from '../../../../../constants';

const ConfigExpenseDayStart = ({ expensePeriod, setExpensePeriod }) => {
  const { isMobileDisplay } = useContext(DisplayContext);
  let weekdays = [];
  let weekends = [];

  Object.keys(Constants.CONTENT.EXPENSE_PERIOD.DAY_OF_WEEK).forEach((day) => {
    let btn = (
      <Button
        key={day}
        variant={
          expensePeriod.start === Constants.CONTENT.EXPENSE_PERIOD.DAY_OF_WEEK[day] ?
          'contained' : 'outlined'
        } 
        onClick={() => { 
          setExpensePeriod(
            Constants.CONTENT.EXPENSE_PERIOD.FREQUENCY.WEEKLY, 
            Constants.CONTENT.EXPENSE_PERIOD.DAY_OF_WEEK[day]
          )
        }}
      >
        {day}
      </Button>
    );
    
    // If it's the weekends
    if (
      Constants.CONTENT.EXPENSE_PERIOD.DAY_OF_WEEK[day] === 6 || 
      Constants.CONTENT.EXPENSE_PERIOD.DAY_OF_WEEK[day] === 0
    ) {
      weekends.push(btn);
    } else {
      weekdays.push(btn);
    }
    
  });
  
  return (
    <>
      <ButtonGroup>
        {isMobileDisplay ? weekdays : [...weekdays, ...weekends]}
      </ButtonGroup>
      {
        isMobileDisplay ? (
          <ButtonGroup>
            {weekends}
          </ButtonGroup> 
        ): null
      }
    </>
  )
}

export default ConfigExpenseDayStart;