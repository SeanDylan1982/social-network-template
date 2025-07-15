import React from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Chip, Divider } from '@mui/material';
import { Event } from '@/types/event';

interface EventAttendeesTabProps {
  event: Event;
}

const EventAttendeesTab: React.FC<EventAttendeesTabProps> = ({ event }) => {
  // Mock attendees data - in a real app, this would come from props or API
  const attendees = [
    { id: '1', name: 'John Doe', avatar: '/images/avatars/1.jpg', status: 'Going', isOrganizer: true },
    { id: '2', name: 'Jane Smith', avatar: '/images/avatars/2.jpg', status: 'Going' },
    { id: '3', name: 'Alex Johnson', avatar: '/images/avatars/3.jpg', status: 'Interested' },
    { id: '4', name: 'Sam Wilson', avatar: '/images/avatars/4.jpg', status: 'Going' },
    { id: '5', name: 'Taylor Swift', avatar: '/images/avatars/5.jpg', status: 'Going' },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'going':
        return 'success';
      case 'interested':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          {attendees.length} People {attendees.length > 0 ? 'are' : 'is'} going
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Connect with other attendees before the event starts.
        </Typography>
      </Box>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {attendees.map((attendee, index) => (
          <React.Fragment key={attendee.id}>
            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar 
                  alt={attendee.name} 
                  src={attendee.avatar} 
                  sx={{ width: 48, height: 48 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="text.primary"
                      fontWeight={500}
                    >
                      {attendee.name}
                    </Typography>
                    {attendee.isOrganizer && (
                      <Chip
                        label="Organizer"
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Chip
                    label={attendee.status}
                    size="small"
                    color={getStatusColor(attendee.status) as any}
                    variant="outlined"
                    sx={{ mt: 0.5 }}
                  />
                }
              />
              <Chip
                label="Message"
                variant="outlined"
                size="small"
                onClick={() => {}}
                sx={{ ml: 'auto' }}
              />
            </ListItem>
            {index < attendees.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default EventAttendeesTab;
