// src/components/layout/AppLayout.tsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { NotificationCenter } from '../../components/notifications/NotificationCenter';
import { 
  Box, 
  Container, 
  AppBar, 
  Toolbar, 
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Avatar,
  Menu,
  MenuItem,
  Stack
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatIcon from '@mui/icons-material/Chat';
import TimelineIcon from '@mui/icons-material/Timeline';
import SchoolIcon from '@mui/icons-material/School';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';



const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0'
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2'
    }
  }
});

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Overview', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Student Profile', icon: <PersonIcon />, path: '/dashboard/profile' },
    { text: 'Progress', icon: <TimelineIcon />, path: '/dashboard/progress' },
    { text: 'Team Chat', icon: <ChatIcon />, path: '/dashboard/chat' },
    { text: 'Documents', icon: <DocumentScannerIcon />, path: '/dashboard/documents' },
    { text: 'AI Reports', icon: <AutoAwesomeIcon />, path: '/dashboard/reports' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/dashboard/settings' }
];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleMenuClose();
    navigate('/');
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" noWrap component="div">
          BridgeEd AI
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
        <AppBar position="fixed" sx={{ width: '100%', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            {isAuthenticated && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Typography 
              variant="h6" 
              component="a" 
              href="/"
              sx={{ 
                flexGrow: 1, 
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer'
              }}
            >
              BridgeEd AI
            </Typography>

            {!isAuthenticated && !isAuthPage && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button color="inherit" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </Box>
            )}

            {isAuthenticated && (
              <Stack direction="row" spacing={1} alignItems="center">
                <NotificationCenter />
                <IconButton onClick={handleMenuOpen}>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    {user?.name?.[0] || 'U'}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => { navigate('/dashboard/profile'); handleMenuClose(); }}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Stack>
            )}
          </Toolbar>
        </AppBar>

        {isAuthenticated && (
          <>
            <Drawer
              variant={isMobile ? "temporary" : "permanent"}
              open={isMobile ? mobileOpen : true}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                width: 250,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 250, boxSizing: 'border-box' },
                display: { xs: 'block' }
              }}
            >
              {drawer}
            </Drawer>
            <Box component="main" sx={{ 
              flexGrow: 1, 
              p: 3, 
              width: { md: `calc(100% - 250px)` },
              ml: { md: '250px' },
              mt: '64px'
            }}>
              {children}
            </Box>
          </>
        )}

        {!isAuthenticated && (
          <Box component="main" sx={{ flexGrow: 1, width: '100%', mt: '64px' }}>
            {children}
          </Box>
        )}

        <Box 
          component="footer" 
          sx={{ 
            py: 3, 
            px: 2,
            mt: 'auto',
            bgcolor: 'grey.200'
          }}
        >
          <Container>
            <Typography variant="body2" color="text.secondary" align="center">
              © 2025 BridgeEd AI - Transforming Special Education
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};