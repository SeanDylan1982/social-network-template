import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  Badge,
  Button,
  useTheme,
} from '@mui/material';
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  AdminPanelSettings as AdminIcon,
  Bookmark as BookmarkIcon,
  Dashboard as DashboardIcon,
  Help as HelpIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { signOut, useSession } from 'next-auth/react';
import { useTheme as useAppTheme } from '@/contexts/ThemeContext';

interface AvatarMenuProps {
  user: {
    name: string;
    email: string;
    image?: string;
    role?: string;
  };
  notificationCount?: number;
  onViewProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({
  user,
  notificationCount = 0,
  onViewProfile,
  onSettings,
  onLogout,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const { data: session } = useSession();
  const { toggleTheme, mode } = useAppTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    handleClose();
    if (onViewProfile) {
      onViewProfile();
    } else {
      router.push(`/profile/${user.name?.toLowerCase().replace(/\s+/g, '')}`);
    }
  };

  const handleSettings = () => {
    handleClose();
    if (onSettings) {
      onSettings();
    } else {
      router.push('/settings');
    }
  };

  const handleLogout = async () => {
    handleClose();
    if (onLogout) {
      onLogout();
    } else {
      await signOut({ callbackUrl: '/auth/signin', redirect: true });
    }
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setAnchorEl(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <Box sx={{ position: 'relative' }} ref={menuRef}>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={menuOpen ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
        sx={{
          p: 0,
          '&:hover': {
            opacity: 0.9,
          },
        }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color="success"
          invisible={!user}
        >
          <Avatar
            src={user?.image || '/default-avatar.png'}
            alt={user?.name || 'User'}
            sx={{
              width: 36,
              height: 36,
              border: `2px solid ${theme.palette.primary.main}`,
              '&:hover': {
                boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
              },
            }}
          />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={menuOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1.5,
            minWidth: 280,
            borderRadius: 2,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* User Info Section */}
        <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar
              src={user?.image || '/default-avatar.png'}
              alt={user?.name || 'User'}
              sx={{ width: 48, height: 48, mr: 1.5 }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight={600} noWrap>
                {user?.name || 'User'}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {user?.email || 'user@example.com'}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            fullWidth
            size="small"
            onClick={handleViewProfile}
            sx={{
              mt: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            View Profile
          </Button>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ px: 1, py: 0.5 }}>
          <MenuItem onClick={handleViewProfile}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => router.push('/saved')}>
            <ListItemIcon>
              <BookmarkIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Saved Items</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleSettings}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          {user?.role === 'admin' && (
            <MenuItem onClick={() => router.push('/admin')}>
              <ListItemIcon>
                <AdminIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Admin Dashboard</ListItemText>
            </MenuItem>
          )}
        </Box>

        <Divider />

        {/* Theme Toggle */}
        <MenuItem onClick={handleThemeToggle}>
          <ListItemIcon>
            {mode === 'dark' ? (
              <LightModeIcon fontSize="small" />
            ) : (
              <DarkModeIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>
            {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </ListItemText>
        </MenuItem>

        {/* Help & Support */}
        <MenuItem onClick={() => router.push('/help')}>
          <ListItemIcon>
            <HelpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Help & Support</ListItemText>
        </MenuItem>

        <Divider />

        {/* Logout */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ color: 'error' }}>
            Logout
          </ListItemText>
        </MenuItem>

        {/* Footer */}
        <Box sx={{ px: 2, py: 1, bgcolor: 'action.hover', textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            v{process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'}
          </Typography>
        </Box>
      </Menu>
    </Box>
  );
};

export default AvatarMenu;
