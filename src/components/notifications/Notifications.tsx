import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';

const Notifications: React.FC = () => {
  const notifications = [
    { id: 1, user: 'John Doe', action: 'liked your post', time: '2h ago', avatar: '/api/placeholder/40/40' },
    { id: 2, user: 'Jane Smith', action: 'commented on your photo', time: '4h ago', avatar: '/api/placeholder/40/40' },
    { id: 3, user: 'Mike Johnson', action: 'started following you', time: '1d ago', avatar: '/api/placeholder/40/40' },
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <NotificationsIcon />
        Notifications
      </Typography>
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification.id} sx={{ px: 0 }}>
            <ListItemAvatar>
              <Avatar src={notification.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={`${notification.user} ${notification.action}`}
              secondary={notification.time}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Notifications;