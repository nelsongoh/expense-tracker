import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const FullScreenSpinner = ({ isActive }) => {
  return (
    <Backdrop open={isActive}>
      <CircularProgress />
    </Backdrop>
  );
}

export default FullScreenSpinner;