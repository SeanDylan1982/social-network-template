import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Badge, 
  Avatar, 
  Box, 
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Button,
  InputBase,
  alpha,
  styled
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  Email as MessageIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  Campaign as CampaignIcon
} from '@mui/icons-material';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface HeaderProps {
  onMenuClick: () => void;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.grey[500],
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();
  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const handleProfileClick = () => {
    handleMenuClose();
    router.push('/profile');
  };

  const handleSettingsClick = () => {
    handleMenuClose();
    router.push('/settings');
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? (
        <>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">{user.email}</Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleProfileClick}>
            <ListItemIcon>
              <AccountIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleSettingsClick}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </>
      ) : (
        <MenuItem onClick={() => router.push('/auth/signin')}>
          <ListItemIcon>
            <AccountIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Login</ListItemText>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <AppBar 
      position="fixed" 
      color="default" 
      elevation={1}
      sx={{
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#fff',
        color: '#495057',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
      }}
    >
      <Toolbar disableGutters sx={{ px: 2, minHeight: '64px' }}>
        {/* Logo */}
        <Box className="header-logo">
          <CampaignIcon sx={{ color: 'primary.main', fontSize: 28 }} />
        </Box>
        
        {/* Search Bar */}
        <Search sx={{ 
          backgroundColor: '#f1f3f7',
          borderRadius: '20px',
          maxWidth: '500px',
          margin: '0 20px 0 30px',
          flex: 1
        }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        
        {/* Navigation Links */}
        <Box className="header-nav" sx={{ display: { xs: 'none', md: 'flex' }, marginRight: '20px' }}>
          <Button color="inherit" sx={{ textTransform: 'none', mx: 1 }}>Demo</Button>
          <Button color="inherit" sx={{ textTransform: 'none', mx: 1 }}>Pages</Button>
          <Button 
            color="inherit" 
            sx={{ 
              textTransform: 'none', 
              mx: 1,
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(114, 105, 239, 0.1)'
              }
            }}
          >
            Account
          </Button>
          <Button color="inherit" sx={{ textTransform: 'none', mx: 1 }}>My Network</Button>
        </Box>
        
        {/* Right Icons */}
        <Box className="header-actions" sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            size="large" 
            color="inherit" 
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
            onClick={() => router.push('/messages')}
          >
            <Badge badgeContent={4} color="error">
              <MessageIcon />
            </Badge>
          </IconButton>
          
          <IconButton 
            size="large" 
            color="inherit" 
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
            onClick={() => router.push('/settings')}
          >
            <SettingsIcon />
          </IconButton>
          
          <IconButton
            size="large"
            color="inherit"
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
            onClick={() => router.push('/notifications')}
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            sx={{ 
              marginLeft: '10px',
              '&:hover': {
                backgroundColor: 'transparent'
              }
            }}
          >
            <Avatar 
              alt={user?.name} 
              src={user?.avatar} 
              sx={{ 
                width: 36, 
                height: 36,
                border: '2px solid #fff',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }} 
            />
          </IconButton>
          
          {/* Mobile Menu Button */}
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ 
              display: { md: 'none' },
              marginLeft: '10px',
              color: 'text.secondary'
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      
      {renderMenu}
    </AppBar>
  );
};

export default Header;
