import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

const AppDatePicker = ({ dateYYYYMMDD, updateDate, label, helperText, errorMessage, sx }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disableFuture
        openTo='day'
        views={['year', 'month', 'day']}
        value={dayjs(dateYYYYMMDD)}
        onChange={(newDate) => { updateDate(newDate); }}
        inputFormat="DD MMM YYYY"
        renderInput={(params) => 
          <TextField 
            sx={sx} 
            label={label} 
            helperText={errorMessage === null ? helperText : errorMessage} 
            size="small" {...params} />
        }
      />
    </LocalizationProvider>
  );
}

export default AppDatePicker;