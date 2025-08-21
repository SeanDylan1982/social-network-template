import React from 'react';
import { Box, Typography } from '@mui/material';

interface NewsProps {
  items?: any[];
  onNewsClick?: (id: string) => void;
  onShowMore?: () => void;
}

const News: React.FC<NewsProps> = () => {
  return (
    <Box>
      <Typography variant="h6">News</Typography>
    </Box>
  );
};

export default News;