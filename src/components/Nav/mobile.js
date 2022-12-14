import { useRef, useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import DisplayContext from '../../context/display/context';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import Styles from './styles';
import Constants from '../../constants';

const MobileNav = ({ navValue }) => {
  const styles = Styles();
  const navigate = useNavigate();
  const mobileNavBarRef = useRef();
  const { setMaxContentHeight } = useContext(DisplayContext);

  useEffect(() => {
    setMaxContentHeight(window.innerHeight - mobileNavBarRef.current.clientHeight);
  }, [setMaxContentHeight]);

  return (
    <Box>
      <Outlet />
      <Paper sx={styles.mobileNavBarBackground} elevation={3} ref={mobileNavBarRef}>
        <BottomNavigation showLabels value={navValue}>
          <BottomNavigationAction 
            label={Constants.CONTENT.NAVBAR.HOME} 
            icon={<HomeIcon />}
            onClick={() => { navigate(Constants.PATHS.HOME); }}
          />
          <BottomNavigationAction 
            label={Constants.CONTENT.NAVBAR.DASHBOARD} 
            icon={<AssessmentIcon />} 
            onClick={() => { navigate(Constants.PATHS.DASHBOARD); }}  
          />
          <BottomNavigationAction 
            label={Constants.CONTENT.NAVBAR.CONFIG} 
            icon={<SettingsIcon />} 
            onClick={() => { navigate(Constants.PATHS.CONFIG_ONE); }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}

export default MobileNav;