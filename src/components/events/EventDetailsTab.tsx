import React from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';
import { Event } from '@/types/event';

interface EventDetailsTabProps {
  event: Event;
}

const EventDetailsTab: React.FC<EventDetailsTabProps> = ({ event }) => {
  return (
    <Box>
      <Box
        sx={{
          '& h2': {
            mt: 3,
            mb: 2,
            fontWeight: 600,
            fontSize: '1.5rem',
            color: 'text.primary',
          },
          '& h3': {
            mt: 3,
            mb: 1.5,
            fontWeight: 600,
            fontSize: '1.25rem',
            color: 'text.primary',
          },
          '& p': {
            mb: 2,
            lineHeight: 1.7,
            color: 'text.secondary',
          },
          '& ul, & ol': {
            pl: 3,
            mb: 2,
            '& li': {
              mb: 1,
              color: 'text.secondary',
            },
          },
          '& a': {
            color: 'primary.main',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        }}
        dangerouslySetInnerHTML={{ 
          __html: event.longDescription || event.description 
        }} 
      />
      
      <Divider sx={{ my: 4 }} />
      
      <Box>
        <Typography variant="h6" gutterBottom>
          Tags
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
          {event.tags?.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              onClick={() => {}}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default EventDetailsTab;
