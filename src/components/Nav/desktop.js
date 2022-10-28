import { Outlet, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import Constants from '../../constants';
import Styles from './styles';

const DesktopNav = () => {
  const navigate = useNavigate();
  const styles = Styles();

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5' sx={{ flex: 1 }}>{Constants.CONTENT.APP_TITLE}</Typography>
          <Grid container spacing={4}>
            <Grid xs={3}>
              <Button 
                sx={styles.desktopNavBtn} 
                startIcon={<HomeIcon />}
                onClick={() => { navigate(Constants.PATHS.HOME) }}
              >
                {Constants.CONTENT.NAVBAR.HOME}
              </Button>
            </Grid>
            <Grid xs={4}>
              <Button 
                sx={styles.desktopNavBtn} 
                startIcon={<AssessmentIcon />}
                onClick={() => { navigate(Constants.PATHS.DASHBOARD) }}
              >
                {Constants.CONTENT.NAVBAR.DASHBOARD}
              </Button>
            </Grid>
            <Grid xs={4}>
              <Button 
                sx={styles.desktopNavBtn} 
                startIcon={<SettingsIcon />}
                onClick={() => { navigate(Constants.PATHS.CONFIG_ONE) }}
              >
                {Constants.CONTENT.NAVBAR.CONFIG}
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default DesktopNav;