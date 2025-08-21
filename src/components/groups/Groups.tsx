import React from 'react';
import { Box, Typography } from '@mui/material';
import GroupsList from './GroupsList';

const Groups: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Groups
      </Typography>
      <GroupsList />
    </Box>
  );
};

export default Groups;