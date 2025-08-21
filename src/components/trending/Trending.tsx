import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';
import { TrendingUp as TrendingIcon } from '@mui/icons-material';

const Trending: React.FC = () => {
  const trends = [
    { tag: '#WebDevelopment', posts: '12.5K posts' },
    { tag: '#React', posts: '8.2K posts' },
    { tag: '#JavaScript', posts: '15.1K posts' },
    { tag: '#NextJS', posts: '5.3K posts' },
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <TrendingIcon />
        Trending
      </Typography>
      <List>
        {trends.map((trend, index) => (
          <ListItem key={index} sx={{ px: 0 }}>
            <ListItemText
              primary={<Chip label={trend.tag} variant="outlined" size="small" />}
              secondary={trend.posts}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Trending;