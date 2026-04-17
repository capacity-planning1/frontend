import { Box, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import appLogo from '../assets/images/app-logo.jpg';

const AppHeader = () => {
  return (
    <Paper className="app-header" elevation={0} square sx={{ borderRadius: 0 }}>
      <Box className="header-left">
        <Box className="header-avatar">
          <Box
            component="img"
            src={appLogo}
            alt="Header logo"
            className="header-logo"
          />
        </Box>
        <Box className="header-tabs">
          <Button
            component={Link}
            to="/projects"
            className="header-tab"
            disableRipple
            sx={{ textTransform: 'none' }}
          >
            Мои проекты
          </Button>
          <Button
            component={Link}
            to="/tasks"
            className="header-tab"
            disableRipple
            sx={{ textTransform: 'none' }}
          >
            Мои задачи
          </Button>
        </Box>
      </Box>
      <Button
        component={Link}
        to="/login"
        className="header-logout"
        disableRipple
        sx={{ textTransform: 'none' }}
      >
        Выйти
      </Button>
    </Paper>
  );
};

export default AppHeader;