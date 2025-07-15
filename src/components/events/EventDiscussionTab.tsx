import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Avatar, 
  Divider, 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Send as SendIcon, 
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Flag as FlagIcon
} from '@mui/icons-material';
import { Event } from '@/types/event';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  isAuthor: boolean;
  likes: number;
  liked: boolean;
}

interface EventDiscussionTabProps {
  event: Event;
}

const EventDiscussionTab: React.FC<EventDiscussionTabProps> = ({ event }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Jane Smith',
      avatar: '/images/avatars/2.jpg',
      content: 'Looking forward to this event! Anyone want to meet up before?',
      timestamp: '2 hours ago',
      isAuthor: false,
      likes: 5,
      liked: false,
    },
    {
      id: '2',
      author: 'Alex Johnson',
      avatar: '/images/avatars/3.jpg',
      content: 'I\'ll be there! What time is everyone arriving?',
      timestamp: '1 hour ago',
      isAuthor: false,
      likes: 3,
      liked: true,
    },
  ]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedComment, setSelectedComment] = useState<string | null>(null);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'Current User',
      avatar: '/images/avatars/default.jpg',
      content: comment,
      timestamp: 'Just now',
      isAuthor: true,
      likes: 0,
      liked: false,
    };
    
    setComments([newComment, ...comments]);
    setComment('');
  };

  const handleLike = (id: string) => {
    setComments(comments.map(c => {
      if (c.id === id) {
        return {
          ...c,
          liked: !c.liked,
          likes: c.liked ? c.likes - 1 : c.likes + 1
        };
      }
      return c;
    }));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, commentId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedComment(commentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedComment(null);
  };

  const handleDeleteComment = () => {
    if (!selectedComment) return;
    setComments(comments.filter(c => c.id !== selectedComment));
    handleMenuClose();
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleCommentSubmit} mb={4}>
        <Box display="flex" alignItems="flex-start" gap={2}>
          <Avatar 
            src="/images/avatars/default.jpg" 
            alt="Your profile"
            sx={{ width: 40, height: 40, mt: 1 }}
          />
          <Box flex={1}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              maxRows={6}
              placeholder="Write a comment..."
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                  bgcolor: 'background.paper',
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.light',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                    borderWidth: 1,
                  },
                },
              }}
            />
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                endIcon={<SendIcon />}
                disabled={!comment.trim()}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Post Comment
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" gutterBottom>
        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
      </Typography>

      {comments.map((item) => (
        <Box key={item.id} mb={3}>
          <Box display="flex" gap={2}>
            <Avatar 
              src={item.avatar} 
              alt={item.author}
              sx={{ width: 40, height: 40 }}
            />
            <Box flex={1}>
              <Box 
                sx={{ 
                  bgcolor: 'background.paper', 
                  borderRadius: 3,
                  p: 2,
                  position: 'relative',
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {item.author}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="caption" color="text.secondary">
                      {item.timestamp}
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={(e) => handleMenuOpen(e, item.id)}
                      sx={{ opacity: 0.7 }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.primary" sx={{ wordBreak: 'break-word' }}>
                  {item.content}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <Button
                    size="small"
                    color={item.liked ? 'primary' : 'inherit'}
                    onClick={() => handleLike(item.id)}
                    sx={{
                      minWidth: 'auto',
                      px: 1,
                      '&:hover': {
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    {item.liked ? 'Liked' : 'Like'}
                    {item.likes > 0 && ` • ${item.likes}`}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {selectedComment && comments.find(c => c.id === selectedComment)?.isAuthor ? (
          [
            <MenuItem key="edit" onClick={handleMenuClose}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>,
            <MenuItem key="delete" onClick={handleDeleteComment}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText sx={{ color: 'error.main' }}>Delete</ListItemText>
            </MenuItem>
          ]
        ) : (
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <FlagIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Report</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default EventDiscussionTab;
