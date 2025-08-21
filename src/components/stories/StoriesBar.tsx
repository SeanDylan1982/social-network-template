import React from 'react';
import { Box, Avatar, Typography, Stack, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface Story {
  id: string;
  username: string;
  avatar: string;
  seen: boolean;
}

interface StoriesBarProps {
  stories?: Story[];
}

const StoriesBar: React.FC<StoriesBarProps> = ({ stories = [] }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
          <IconButton
            sx={{
              width: 60,
              height: 60,
              border: '2px dashed',
              borderColor: 'primary.main',
              mb: 1
            }}
          >
            <AddIcon />
          </IconButton>
          <Typography variant="caption" sx={{ textAlign: 'center' }}>
            Your Story
          </Typography>
        </Box>
        
        {stories.map((story) => (
          <Box key={story.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
            <Avatar
              src={story.avatar}
              sx={{
                width: 60,
                height: 60,
                border: story.seen ? '2px solid #ccc' : '2px solid',
                borderColor: story.seen ? 'grey.300' : 'primary.main',
                mb: 1,
                cursor: 'pointer'
              }}
            />
            <Typography variant="caption" sx={{ textAlign: 'center' }}>
              {story.username}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default StoriesBar;