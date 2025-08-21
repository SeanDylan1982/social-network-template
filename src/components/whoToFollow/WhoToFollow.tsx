import React from 'react';
import { Box, Typography } from '@mui/material';

interface WhoToFollowProps {
  users?: any[];
  onFollow?: (userId: string) => void;
  onDismiss?: (userId: string) => void;
  onShowMore?: () => void;
}

const WhoToFollow: React.FC<WhoToFollowProps> = () => {
  return (
    <Box>
      <Typography variant="h6">Who to Follow</Typography>
    </Box>
  );
};

export default WhoToFollow;