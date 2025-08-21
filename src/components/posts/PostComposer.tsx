import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Avatar,
  Stack,
  IconButton,
  Typography,
  Divider
} from '@mui/material';
import {
  PhotoCamera as PhotoIcon,
  Videocam as VideoIcon,
  EmojiEmotions as EmojiIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

const PostComposer: React.FC = () => {
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (content.trim()) {
      console.log('Posting:', content);
      setContent('');
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <Avatar sx={{ width: 40, height: 40 }}>U</Avatar>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="What's on your mind?"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        </Box>
        
        <Divider />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1}>
            <IconButton color="primary" size="small">
              <PhotoIcon />
            </IconButton>
            <IconButton color="primary" size="small">
              <VideoIcon />
            </IconButton>
            <IconButton color="primary" size="small">
              <EmojiIcon />
            </IconButton>
            <IconButton color="primary" size="small">
              <LocationIcon />
            </IconButton>
          </Stack>
          
          <Button
            variant="contained"
            onClick={handlePost}
            disabled={!content.trim()}
            sx={{ borderRadius: 3, px: 3 }}
          >
            Post
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default PostComposer;