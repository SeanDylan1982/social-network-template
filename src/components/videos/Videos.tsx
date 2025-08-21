import React from 'react';
import { Box, Typography } from '@mui/material';
import VideoList from './VideoList';

const Videos: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Videos
      </Typography>
      <VideoList />
    </Box>
  );
};

export default Videos;