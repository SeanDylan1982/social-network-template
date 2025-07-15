import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  useTheme,
  Link as MuiLink,
} from '@mui/material';
import {
  Check as CheckIcon,
  Notifications as NotificationsIcon,
  NotificationsNone as NotificationsNoneIcon,
  NotificationsActive as NotificationsActiveIcon,
  MoreHoriz as MoreHorizIcon,
  Person as PersonIcon,
  PeopleAlt as PeopleAltIcon,
  VideoLibrary as VideoLibraryIcon,
  PlaylistAdd as PlaylistAddIcon,
  Flag as FlagIcon,
  Block as BlockIcon,
} from '@mui/icons-material';

interface ChannelInfoProps {
  channelId: string;
  name: string;
  avatarUrl?: string;
  subscriberCount: number;
  videoCount: number;
  description?: string;
  isSubscribed: boolean;
  notificationPreference: 'all' | 'some' | 'none';
  onSubscribe: () => void;
  onUnsubscribe: () => void;
  onNotificationToggle: () => void;
  onVisitChannel: (channelId: string) => void;
  onReportChannel?: () => void;
  onBlockChannel?: () => void;
  onAddToPlaylist?: () => void;
}

const ChannelInfo: React.FC<ChannelInfoProps> = ({
  channelId,
  name,
  avatarUrl,
  subscriberCount,
  videoCount,
  description,
  isSubscribed,
  notificationPreference,
  onSubscribe,
  onUnsubscribe,
  onNotificationToggle,
  onVisitChannel,
  onReportChannel,
  onBlockChannel,
  onAddToPlaylist,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const theme = useTheme();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubscribe = () => {
    if (isSubscribed) {
      onUnsubscribe();
    } else {
      onSubscribe();
    }
  };

  const handleNotificationToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNotificationToggle();
  };

  const handleReport = () => {
    handleMenuClose();
    onReportChannel?.();
  };

  const handleBlock = () => {
    handleMenuClose();
    onBlockChannel?.();
  };

  const handleAddToPlaylist = () => {
    handleMenuClose();
    onAddToPlaylist?.();
  };

  const formatSubscriberCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M subscribers`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K subscribers`;
    }
    return `${count} subscribers`;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          width: '100%',
          mb: { xs: 2, sm: 0 },
        }}
      >
        <MuiLink
          href={`/channel/${channelId}`}
          onClick={(e) => {
            e.preventDefault();
            onVisitChannel(channelId);
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': {
              textDecoration: 'none',
            },
          }}
        >
          <Avatar
            src={avatarUrl}
            alt={name}
            sx={{
              width: 48,
              height: 48,
              mr: 2,
              bgcolor: 'primary.main',
            }}
          >
            {name.charAt(0).toUpperCase()}
          </Avatar>
        </MuiLink>

        <Box>
          <MuiLink
            href={`/channel/${channelId}`}
            onClick={(e) => {
              e.preventDefault();
              onVisitChannel(channelId);
            }}
            sx={{
              display: 'block',
              fontWeight: 500,
              color: 'text.primary',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {name}
          </MuiLink>
          <Typography variant="body2" color="text.secondary">
            {formatSubscriberCount(subscriberCount)} • {videoCount} videos
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
        {isSubscribed ? (
          <>
            <Button
              variant="outlined"
              size="small"
              startIcon={<CheckIcon />}
              onClick={handleSubscribe}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
                px: 2,
                flex: { xs: 1, sm: 'none' },
              }}
            >
              Subscribed
            </Button>
            <Tooltip
              title={
                notificationPreference === 'all'
                  ? 'Turn off notifications'
                  : 'Get notified about new videos'
              }
            >
              <IconButton
                size="small"
                onClick={handleNotificationToggle}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                {notificationPreference === 'all' ? (
                  <NotificationsActiveIcon />
                ) : notificationPreference === 'some' ? (
                  <NotificationsNoneIcon />
                ) : (
                  <NotificationsNoneIcon />
                )}
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubscribe}
            startIcon={<PeopleAltIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              flex: { xs: 1, sm: 'none' },
            }}
          >
            Subscribe
          </Button>
        )}

        <IconButton
          onClick={handleMenuOpen}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: 'background.paper',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <MoreHorizIcon />
        </IconButton>

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
          <MenuItem onClick={handleAddToPlaylist}>
            <ListItemIcon>
              <PlaylistAddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add to playlist</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleReport}>
            <ListItemIcon>
              <FlagIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Report channel</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleBlock}>
            <ListItemIcon>
              <BlockIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Block channel</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      {description && (
        <Box sx={{ mt: 2, width: '100%' }}>
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'pre-line',
              display: showFullDescription ? 'block' : '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </Typography>
          <Button
            size="small"
            onClick={() => setShowFullDescription(!showFullDescription)}
            sx={{ mt: 1 }}
          >
            {showFullDescription ? 'Show less' : 'Show more'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ChannelInfo;
