import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import PhotoCard from './PhotoCard';

// Mock data for photos
const mockPhotos = [
  {
    id: '1',
    url: 'https://picsum.photos/300/300?random=1',
    title: 'Beautiful Sunset',
    author: 'John Doe',
    likes: 42,
  },
  {
    id: '2',
    url: 'https://picsum.photos/300/300?random=2',
    title: 'Mountain View',
    author: 'Jane Smith',
    likes: 28,
  },
  {
    id: '3',
    url: 'https://picsum.photos/300/300?random=3',
    title: 'City Lights',
    author: 'Mike Johnson',
    likes: 35,
  },
];

const Photos: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Photos
      </Typography>
      <Grid container spacing={2}>
        {mockPhotos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo.id}>
            <PhotoCard photo={photo} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Photos;