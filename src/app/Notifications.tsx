import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Chip,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  MoreVert as MoreVertIcon,
  Check as CheckIcon,
  NotificationsOff as MuteIcon,
  Report as ReportIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  NotificationsNone as NotificationsNoneIcon
} from '@mui/icons-material';

// Types
interface User {
  id: number;
  name: string;
  avatar: string;
}

interface NotificationItem {
  id: number;
  type: 'like' | 'comment' | 'follow' | 'group' | 'event' | 'birthday';
  user: User;
  content: string;
  time: string;
  unread: boolean;
  actionUser?: string;
  comment?: string;
}

// Styled Components
const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  '& .MuiTabs-indicator': {
    height: 4,
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    minWidth: 'auto',
    padding: theme.spacing(2, 3),
    fontSize: '1rem',
    fontWeight: 500,
    '&.Mui-selected': {
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
  },
}));

const NotificationItemStyled = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'unread',
})<{ unread?: boolean }>(({ theme, unread }) => ({
  padding: theme.spacing(2.5, 3),
  backgroundColor: unread ? theme.palette.primary.light : 'transparent',
  borderLeft: unread ? `4px solid ${theme.palette.primary.main}` : 'none',
  alignItems: 'flex-start',
  transition: theme.transitions.create(['background-color', 'transform']),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateX(4px)',
  },
  '& .MuiListItemSecondaryAction-root': {
    right: 8,
  },
  '& .MuiAvatar-root': {
    width: 48,
    height: 48,
    flexShrink: 0,
    marginRight: theme.spacing(2),
  },
  '& .MuiListItemText-root': {
    flex: 1,
  },
}));

const NotificationTime = styled('div', {
  shouldForwardProp: (prop) => prop !== 'unread',
})<{ unread?: boolean }>(({ theme, unread }) => ({
  display: 'flex',
  alignItems: 'center',
  color: unread ? theme.palette.primary.main : theme.palette.text.secondary,
  fontSize: '0.875rem',
  fontWeight: unread ? 600 : 400,
  marginLeft: theme.spacing(2),
  '& svg': {
    marginLeft: theme.spacing(0.5),
    fontSize: '1rem',
  },
}));

const NotificationActions = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  '& .MuiButton-root': {
    textTransform: 'none',
    fontSize: '0.875rem',
    padding: theme.spacing(0.75, 2),
    borderRadius: theme.shape.borderRadius,
    fontWeight: 500,
    boxShadow: 'none',
    '&.primary': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    '&.outlined': {
      borderColor: theme.palette.divider,
      '&:hover': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

// Mock Data
const allNotifications: NotificationItem[] = [
  {
    id: 1,
    type: 'like',
    user: {
      id: 1,
      name: 'Sarah Johnson',
      avatar: '/avatar-1.jpg',
    },
    content: 'liked your post',
    time: '5 min ago',
    unread: true,
  },
  {
    id: 2,
    type: 'comment',
    user: {
      id: 2,
      name: 'Mike Chen',
      avatar: '/avatar-2.jpg',
    },
    content: 'commented on your post',
    comment: 'This is an amazing post! Thanks for sharing your thoughts.',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    type: 'follow',
    user: {
      id: 3,
      name: 'Emma Davis',
      avatar: '/avatar-3.jpg',
    },
    content: 'started following you',
    time: '3 hours ago',
    unread: true,
  },
  {
    id: 4,
    type: 'group',
    user: {
      id: 4,
      name: 'Design Enthusiasts',
      avatar: '/group-1.jpg',
    },
    content: 'You were added to the group',
    actionUser: 'by David Wilson',
    time: '1 day ago',
    unread: false,
  },
  {
    id: 5,
    type: 'event',
    user: {
      id: 5,
      name: 'Tech Conference 2023',
      avatar: '/event-1.jpg',
    },
    content: 'starts tomorrow',
    time: '2 days ago',
    unread: false,
  },
];

const Notifications: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [notifications, setNotifications] = useState<NotificationItem[]>(allNotifications);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNotification, setSelectedNotification] = useState<number | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedNotification(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNotification(null);
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, unread: false } : notification
    ));
    handleMenuClose();
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      unread: false
    })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    handleMenuClose();
  };

  const filteredNotifications = tabValue === 0 
    ? notifications 
    : tabValue === 1 
      ? notifications.filter(n => n.unread) 
      : [];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', px: isMobile ? 1 : 3, py: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        px: isMobile ? 1 : 0
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <NotificationsNoneIcon 
            color="primary" 
            sx={{ 
              fontSize: 32, 
              mr: 1.5,
              [theme.breakpoints.down('sm')]: {
                display: 'none'
              }
            }} 
          />
          <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
            Notifications
            {unreadCount > 0 && (
              <Chip 
                label={`${unreadCount} new`}
                color="primary" 
                size="small" 
                sx={{ 
                  ml: 1.5, 
                  color: 'white', 
                  fontWeight: 500,
                  height: 20,
                  '& .MuiChip-label': {
                    px: 1,
                    py: 0.5
                  }
                }} 
              />
            )}
          </Typography>
        </Box>
        <Button 
          variant="text" 
          color="primary"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          sx={{ textTransform: 'none' }}
        >
          Mark all as read
        </Button>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
        <StyledTabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="notification tabs"
        >
          <Tab label="All" />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Unread
                {unreadCount > 0 && (
                  <Box 
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      ml: 1,
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                    }}
                  >
                    {unreadCount}
                  </Box>
                )}
              </Box>
            } 
          />
        </StyledTabs>
      </Paper>

      <List disablePadding sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 1, mb: 3 }}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <NotificationItemStyled 
                alignItems="flex-start"
                secondaryAction={
                  <IconButton 
                    edge="end" 
                    aria-label="more"
                    onClick={(e) => handleMenuOpen(e, notification.id)}
                    size="small"
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.03)'
                      }
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                }
                unread={notification.unread}
              >
                <Box sx={{ position: 'relative', mr: 2 }}>
                  <Avatar 
                    alt={notification.user.name} 
                    src={notification.user.avatar} 
                    sx={{ 
                      width: 48, 
                      height: 48,
                    }}
                  />
                  {notification.unread && (
                    <Box 
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 14,
                        height: 14,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '50%',
                        border: '2px solid white',
                        transition: 'all 0.2s ease-in-out',
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Typography 
                          component="span" 
                          sx={{ 
                            fontWeight: 600,
                            color: 'primary.main',
                            '&:hover': {
                              textDecoration: 'underline',
                              cursor: 'pointer'
                            }
                          }}
                        >
                          {notification.user.name}
                        </Typography>
                        <Typography component="span" sx={{ color: 'text.secondary', ml: 0.5 }}>
                          {notification.content}
                        </Typography>
                        {notification.actionUser && (
                          <Typography component="span" sx={{ color: 'text.secondary', ml: 0.5 }}>
                            {notification.actionUser}
                          </Typography>
                        )}
                      </Box>
                    }
                    secondary={
                      <NotificationTime unread={notification.unread}>
                        {notification.time}
                        {notification.unread && <CheckCircleIcon fontSize="inherit" />}
                      </NotificationTime>
                    }
                    sx={{ 
                      m: 0,
                      '& .MuiListItemText-primary': {
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        lineHeight: 1.4
                      },
                      '& .MuiListItemText-secondary': {
                        display: 'flex',
                        alignItems: 'center',
                        mt: 0.5
                      }
                    }}
                  />
                  
                  {notification.comment && (
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        mt: 1.5, 
                        bgcolor: 'action.hover',
                        borderRadius: 1.5,
                        maxWidth: '90%',
                        borderLeft: `3px solid ${theme.palette.divider}`,
                        '&:hover': {
                          bgcolor: 'action.selected',
                        }
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary',
                          lineHeight: 1.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {notification.comment}
                      </Typography>
                    </Paper>
                  )}

                  {(notification.type === 'like' || notification.type === 'follow') && (
                    <NotificationActions>
                      <Button 
                        variant={notification.type === 'follow' ? 'contained' : 'outlined'}
                        size="small"
                        className={notification.type === 'follow' ? 'primary' : 'outlined'}
                        sx={{
                          minWidth: 100,
                        }}
                      >
                        {notification.type === 'follow' ? 'Follow back' : 'View post'}
                      </Button>
                      {notification.type === 'follow' && (
                        <Button 
                          variant="outlined" 
                          size="small"
                          className="outlined"
                          sx={{ minWidth: 100 }}
                        >
                          Remove
                        </Button>
                      )}
                    </NotificationActions>
                  )}
                </Box>
              </NotificationItemStyled>
              <Divider component="li" sx={{ my: 0, borderColor: 'divider' }} />
            </React.Fragment>
          ))
        ) : (
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 8,
              px: 2,
              bgcolor: 'background.paper',
              borderRadius: 2
            }}
          >
            <NotificationsNoneIcon 
              sx={{ 
                fontSize: 64, 
                color: 'action.disabled', 
                mb: 2,
                opacity: 0.8
              }} 
            />
            <Typography 
              variant="h6" 
              color="text.secondary" 
              gutterBottom
              sx={{ fontWeight: 500 }}
            >
              {tabValue === 1 ? 'No unread notifications' : 'No notifications yet'}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ maxWidth: 300, mx: 'auto' }}
            >
              {tabValue === 1 
                ? 'When you get new notifications, they\'ll show up here.' 
                : 'When you get notifications, they\'ll show up here.'}
            </Typography>
          </Box>
        )}
      </List>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => selectedNotification && markAsRead(selectedNotification)}>
          <ListItemIcon>
            <CheckIcon fontSize="small" />
          </ListItemIcon>
          Mark as read
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <MuteIcon fontSize="small" />
          </ListItemIcon>
          Mute notifications
        </MenuItem>
        <MenuItem onClick={() => selectedNotification && deleteNotification(selectedNotification)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <Typography color="error">Delete</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ReportIcon fontSize="small" />
          </ListItemIcon>
          Report issue
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Notifications;
