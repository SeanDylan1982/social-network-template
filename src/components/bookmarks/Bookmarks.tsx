import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Bookmark as BookmarkIcon } from '@mui/icons-material';

const Bookmarks: React.FC = () => {
  const bookmarks = [
    { id: 1, title: 'React Best Practices', author: 'Tech Blog', time: '2d ago' },
    { id: 2, title: 'JavaScript Tips & Tricks', author: 'Dev Community', time: '1w ago' },
    { id: 3, title: 'UI/UX Design Trends', author: 'Design Weekly', time: '2w ago' },
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <BookmarkIcon />
        Bookmarks
      </Typography>
      <List>
        {bookmarks.map((bookmark) => (
          <ListItem key={bookmark.id} sx={{ px: 0 }}>
            <ListItemText
              primary={bookmark.title}
              secondary={`${bookmark.author} • ${bookmark.time}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Bookmarks;