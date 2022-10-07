import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DisplayContext from './context';

const DisplayProvider = ({ children }) => {
  const theme = useTheme();
  const isCurrMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const [displayState, setDisplayState] = useState({
    isMobileDisplay: isCurrMobileDisplay,
    setIsMobileDisplay: (mobileDisplayState) => {
      setDisplayState({...displayState, isMobileDisplay: mobileDisplayState })
    }
  });

  return (
    <DisplayContext.Provider value={displayState}>
      {children}
    </DisplayContext.Provider>
  )
}

export default DisplayProvider;