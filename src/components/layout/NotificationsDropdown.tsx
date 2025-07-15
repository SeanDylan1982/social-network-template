import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  useTheme,
  ListItemButton,
  ListItemIcon,
  alpha,
  Paper,
  Skeleton,
  Fade,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  NotificationsActive as NotificationsActiveIcon,
  NotificationsOff as NotificationsOffIcon,
  NotificationsNone as NotificationsNoneIcon,
  Check as CheckIcon,
  Clear as ClearIcon,
  MoreVert as MoreVertIcon,
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  PersonAdd as PersonAddIcon,
  GroupAdd as GroupAddIcon,
  Event as EventIcon,
  Cake as CakeIcon,
  EmojiEvents as EmojiEventsIcon,
  Forum as ForumIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

// Types
type NotificationType = 'like' | 'comment' | 'follow' | 'mention' | 'event' | 'announcement' | 'birthday' | 'group' | 'message' | 'achievement' | 'other';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  link?: string;
  read: boolean;
  timestamp: Date;
  image?: string;
  icon?: React.ReactNode;
}

interface NotificationsDropdownProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onNotificationClick: (notification: Notification) => void;
  onViewAll: () => void;
  notifications: Notification[];
  unreadCount: number;
  isLoading?: boolean;
}

// Mock data - replace with real data from your API
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    title: 'New like',
    message: 'John Doe liked your post',
    user: {
      id: 'user1',
      name: 'John Doe',
      avatar: '/avatars/1.jpg',
    },
    link: '/post/123',
    read: false,
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  },
  {
    id: '2',
    type: 'comment',
    title: 'New comment',
    message: 'Jane Smith commented: "Great post!"',
    user: {
      id: 'user2',
      name: 'Jane Smith',
      avatar: '/avatars/2.jpg',
    },
    link: '/post/123#comment-456',
    read: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '3',
    type: 'follow',
    title: 'New follower',
    message: 'Alex Johnson started following you',
    user: {
      id: 'user3',
      name: 'Alex Johnson',
      avatar: '/avatars/3.jpg',
    },
    link: '/profile/user3',
    read: true,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '4',
    type: 'birthday',
    title: 'Birthday reminder',
    message: 'It\'s Sarah Wilson\'s birthday today!',
    user: {
      id: 'user4',
      name: 'Sarah Wilson',
      avatar: '/avatars/4.jpg',
    },
    link: '/profile/user4',
    read: false,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    icon: <CakeIcon color="primary" />,
  },
  {
    id: '5',
    type: 'event',
    title: 'Event reminder',
    message: 'Team meeting starts in 15 minutes',
    link: '/events/123',
    read: true,
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    icon: <EventIcon color="info" />,
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'like':
      return <FavoriteIcon color="error" />;
    case 'comment':
      return <CommentIcon color="primary" />;
    case 'follow':
      return <PersonAddIcon color="success" />;
    case 'mention':
      return <ForumIcon color="info" />;
    case 'event':
      return <EventIcon color="warning" />;
    case 'birthday':
      return <CakeIcon color="secondary" />;
    case 'group':
      return <GroupAddIcon color="primary" />;
    case 'achievement':
      return <EmojiEventsIcon color="warning" />;
    default:
      return <NotificationsIcon color="action" />;
  }
};

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: '400px',
    maxHeight: '80vh',
    overflowY: 'auto',
    borderRadius: '12px',
    boxShadow: theme.shadows[8],
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  fontSize: '1.1rem',
}));

const StyledUnreadBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '0.75rem',
    minWidth: '24px',
    height: '24px',
    borderRadius: '12px',
  },
}));

const StyledNotificationItem = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  transition: theme.transitions.create(['background-color']),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.unread': {
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
  },
}));

const StyledNotificationIcon = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

const StyledNotificationContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

const StyledNotificationTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

const StyledNotificationMessage = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const StyledNotificationTime = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  alignSelf: 'flex-end',
}));

const StyledActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  justifyContent: 'flex-end',
}));

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  anchorEl,
  open,
  onClose,
  onMarkAllAsRead,
  onNotificationClick,
  onViewAll,
  notifications = mockNotifications,
  unreadCount = 3,
  isLoading = false,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchorEl);
  const menuRef = useRef<HTMLDivElement>(null);

  // Sort notifications by timestamp (newest first)
  const sortedNotifications = [...notifications].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    setMenuAnchorEl(null);
  };

  const handleNotificationClick = (notification: Notification) => {
    onNotificationClick(notification);
    if (notification.link) {
      router.push(notification.link);
    }
    onClose();
  };

  const handleMarkAsRead = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    // Implement mark as read logic
    console.log(`Marking notification ${id} as read`);
  };

  const handleMarkAllAsRead = (event: React.MouseEvent) => {
    event.stopPropagation();
    onMarkAllAsRead();
    setMenuAnchorEl(null);
  };

  const handleClearAll = (event: React.MouseEvent) => {
    event.stopPropagation();
    // Implement clear all logic
    console.log('Clearing all notifications');
    setMenuAnchorEl(null);
  };

  const handleViewAllClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onViewAll();
    onClose();
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAnchorEl(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <Box ref={menuRef}>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          elevation: 4,
          sx: {
            width: 380,
            maxWidth: '100%',
            maxHeight: '80vh',
            overflow: 'hidden',
            borderRadius: 2,
            mt: 1.5,
            '& .MuiMenu-list': {
              p: 0,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {/* Header */}
        <StyledHeader>
          <StyledTitle>Notifications</StyledTitle>
          <Box>
            <IconButton
              size="small"
              onClick={handleMenuClick}
              sx={{
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              open={menuOpen}
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
              <MenuItem onClick={handleMarkAllAsRead}>
                <ListItemIcon>
                  <CheckCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Mark all as read</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClearAll}>
                <ListItemIcon>
                  <ClearIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Clear all</ListItemIcon>
              </MenuItem>
            </Menu>
          </Box>
        </StyledHeader>

        {/* Notifications List */}
        <Box
          sx={{
            maxHeight: '60vh',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: theme.palette.action.hover,
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.palette.divider,
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: theme.palette.text.secondary,
            },
          }}
        >
          {isLoading ? (
            // Loading skeleton
            <Box p={2}>
              {[...Array(5)].map((_, index) => (
                <Box key={index} mb={2}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box ml={2} flexGrow={1}>
                      <Skeleton variant="text" width="80%" height={20} />
                      <Skeleton variant="text" width="60%" height={16} />
                    </Box>
                  </Box>
                  <Skeleton variant="rectangular" width="100%" height={60} />
                </Box>
              ))}
            </Box>
          ) : notifications.length === 0 ? (
            // Empty state
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p={4}
              textAlign="center"
            >
              <NotificationsOffIcon
                sx={{
                  fontSize: 60,
                  color: 'text.disabled',
                  mb: 2,
                  opacity: 0.5,
                }}
              />
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No notifications yet
              </Typography>
              <Typography variant="body2" color="textSecondary">
                When you get notifications, they'll appear here
              </Typography>
            </Box>
          ) : (
            // Notifications list
            <List disablePadding>
              {sortedNotifications.map((notification) => (
                <React.Fragment key={notification.id}>
                  <StyledNotificationItem
                    className={notification.read ? '' : 'unread'}
                    onClick={() => onNotificationClick(notification)}
                  >
                    <StyledNotificationIcon>
                      {notification.icon || getNotificationIcon(notification.type)}
                    </StyledNotificationIcon>
                    <StyledNotificationContent>
                      <StyledNotificationTitle>
                        {notification.title}
                      </StyledNotificationTitle>
                      <StyledNotificationMessage>
                        {notification.message}
                      </StyledNotificationMessage>
                    </StyledNotificationContent>
                    <StyledNotificationTime>
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </StyledNotificationTime>
                  </StyledNotificationItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>

        {/* Footer */}
        <StyledActionButtons>
          <Button
            variant="outlined"
            onClick={onMarkAllAsRead}
            startIcon={<CheckCircleIcon />}
          >
            Mark all as read
          </Button>
          <Button
            variant="contained"
            onClick={onViewAll}
            startIcon={<ArrowForwardIcon />}
          >
            View all
          </Button>
        </StyledActionButtons>
      </StyledMenu>
    </Box>
  );
};

export default NotificationsDropdown;
