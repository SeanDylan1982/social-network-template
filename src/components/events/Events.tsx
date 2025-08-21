import React from 'react';
import { Box, Typography } from '@mui/material';

const Events: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Events
      </Typography>
      <Typography variant="body2" color="text.secondary">
        No events available
      </Typography>
    </Box>
  );
};

export default Events;