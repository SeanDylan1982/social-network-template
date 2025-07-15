"use client";

import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Avatar, Divider, IconButton, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  AddPhotoAlternate, 
  Videocam, 
  EmojiEmotions, 
  LocationOn, 
  MoreHoriz as MoreHorizIcon,
  ThumbUp as ThumbUpIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  Share as ShareIcon
} from '@mui/icons-material';

// Styled components for the feed
const FeedContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%',
  padding: theme.spacing(3, 0),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const PostComposer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create(['box-shadow', 'transform']),
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius * 2,
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`,
    },
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 2),
    fontSize: '1rem',
    '&::placeholder': {
      opacity: 0.7,
    },
  },
}));

const PostCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create(['box-shadow', 'transform']),
  '& + &': {
    marginTop: theme.spacing(3),
  },
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
  },
}));

const StoryItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 100,
  flexShrink: 0,
  cursor: 'pointer',
  '&:hover': {
    '& .MuiAvatar-root': {
      transform: 'scale(1.05)',
    },
    '& .story-username': {
      color: theme.palette.primary.main,
    },
  },
}));

const StoryAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  marginBottom: theme.spacing(1),
  border: '3px solid',
  borderColor: theme.palette.primary.main,
  transition: 'transform 0.2s ease-in-out, border-color 0.2s ease',
  '&.add-story': {
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.secondary,
    fontSize: '1.75rem',
    '&:hover': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
  },
}));

const StoriesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  overflowX: 'auto',
  scrollbarWidth: 'none',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: theme.shadows[1],
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  '&::after': {
    content: '""',
    paddingRight: theme.spacing(1),
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.75, 1.75),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.125rem',
    marginRight: theme.spacing(0.75),
  },
}));

const PostActionButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },
  '&.active': {
    color: theme.palette.primary.main,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.25rem',
  },
}));

const LikeButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  padding: theme.spacing(0.5, 1.25),
  borderRadius: theme.shape.borderRadius * 1.5,
  cursor: 'pointer',
  transition: theme.transitions.create(['background-color', 'transform']),
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '80',
    transform: 'scale(1.05)',
  },
}));

import RightSidebarContent from '@/components/layout/RightSidebarContent';

export default function Home() {
  // State for post content and interactions
  const [postContent, setPostContent] = useState('');
  const [activePost, setActivePost] = useState<number | null>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  // Mock data
  const stories = [
    { id: 1, name: 'Your Story', isAdd: true },
    { id: 2, name: 'Alex', avatar: '/images/avatars/1.jpg' },
    { id: 3, name: 'Sarah', avatar: '/images/avatars/2.jpg' },
    { id: 4, name: 'Mike', avatar: '/images/avatars/3.jpg' },
    { id: 5, name: 'Emma', avatar: '/images/avatars/4.jpg' },
    { id: 6, name: 'David', avatar: '/images/avatars/5.jpg' },
  ];

  const posts = [
    {
      id: 1,
      user: {
        name: 'Alex Johnson',
        avatar: '/images/avatars/1.jpg',
        role: 'UI/UX Designer',
      },
      time: '2 hours ago',
      content: 'Just launched our new product! Check it out and let me know what you think. #design #uiux',
      image: '/images/posts/1.jpg',
      likes: 42,
      comments: 12,
      shares: 5,
      isLiked: false,
    },
    {
      id: 2,
      user: {
        name: 'Sarah Wilson',
        avatar: '/images/avatars/2.jpg',
        role: 'Frontend Developer',
      },
      time: '5 hours ago',
      content: 'Beautiful day for coding outside! ☀️ Working on some exciting new features for our platform.',
      image: '/images/posts/2.jpg',
      likes: 28,
      comments: 7,
      shares: 2,
      isLiked: true,
    },
  ];

  const handleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postContent.trim()) {
      // In a real app, you would send this to your backend
      console.log('Post submitted:', postContent);
      setPostContent('');
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <FeedContainer>
      {/* Stories */}
      <Paper sx={{ 
        borderRadius: 2, 
        mb: 3, 
        overflow: 'hidden',
        backgroundColor: 'background.paper',
      }}>
        <StoriesContainer>
          {stories.map((story) => (
            <StoryItem key={story.id}>
              <StoryAvatar 
                src={story.avatar} 
                className={story.isAdd ? 'add-story' : ''}
              >
                {story.isAdd ? '+' : null}
              </StoryAvatar>
              <Typography 
                variant="caption" 
                noWrap 
                className="story-username"
                sx={{ 
                  fontSize: '0.7rem',
                  color: 'text.secondary',
                  maxWidth: '100%',
                  display: 'block',
                  textOverflow: 'ellipsis',
                }}
              >
                {story.name}
              </Typography>
            </StoryItem>
          ))}
        </StoriesContainer>
      </Paper>
      
      {/* Create Post */}
      <PostComposer component="form" onSubmit={handlePostSubmit} elevation={0}>
        <Box display="flex" gap={2} mb={2}>
          <Avatar 
            src="/images/avatars/1.jpg" 
            sx={{ width: 40, height: 40 }}
          />
          <TextField
            fullWidth
            placeholder="What's on your mind?"
            variant="outlined"
            size="small"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            InputProps={{
              sx: { pl: 2 },
            }}
          />
        </Box>
        <Divider sx={{ my: 1.5 }} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={1}>
            <PostActionButton>
              <AddPhotoAlternate fontSize="small" />
            </PostActionButton>
            <PostActionButton>
              <Videocam fontSize="small" />
            </PostActionButton>
            <PostActionButton>
              <EmojiEmotions fontSize="small" />
            </PostActionButton>
            <PostActionButton>
              <LocationOn fontSize="small" />
            </PostActionButton>
          </Box>
          <Button 
            variant="contained" 
            size="small" 
            type="submit"
            disabled={!postContent.trim()}
            sx={{ 
              borderRadius: 4,
              textTransform: 'none',
              fontWeight: 600,
              px: 2,
              py: 0.5,
            }}
          >
            Post
          </Button>
        </Box>
      </PostComposer>
      
      {/* Posts */}
      {posts.map((post) => (
        <PostCard key={post.id}>
          <Box display="flex" alignItems="center" mb={2.5}>
            <Avatar 
              src={post.user.avatar} 
              sx={{ 
                width: 48, 
                height: 48, 
                mr: 2,
                border: '2px solid',
                borderColor: 'primary.main',
              }} 
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" fontWeight={600} noWrap>
                {post.user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {post.user.role} • {post.time}
              </Typography>
            </Box>
            <PostActionButton>
              <MoreHorizIcon />
            </PostActionButton>
          </Box>
          
          <Typography variant="body1" sx={{ mb: 2.5, lineHeight: 1.5 }}>
            {post.content}
          </Typography>
          
          {post.image && (
            <Box 
              component="img" 
              src={post.image} 
              alt="Post content"
              sx={{
                width: '100%',
                borderRadius: 2,
                mb: 2.5,
                maxHeight: 400,
                objectFit: 'cover',
              }}
            />
          )}
          
          <Box display="flex" alignItems="center" color="text.secondary" mb={2}>
            <LikeButton>
              <ThumbUpIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
              <Typography variant="caption" fontWeight={600}>
                {post.likes}
              </Typography>
            </LikeButton>
            <Box sx={{ ml: 'auto', display: 'flex', gap: 1.5 }}>
              <Typography variant="caption">
                {post.comments} comments
              </Typography>
              <Typography variant="caption">
                {post.shares} shares
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 1.5 }} />
          
          <Box display="flex" justifyContent="space-between" gap={1}>
            <ActionButton 
              fullWidth 
              startIcon={
                <ThumbUpIcon 
                  color={likedPosts.includes(post.id) ? 'primary' : 'inherit'} 
                  sx={{ 
                    fontSize: '1.25rem',
                    color: likedPosts.includes(post.id) ? 'primary.main' : 'inherit',
                  }} 
                />
              }
              onClick={() => handleLike(post.id)}
              sx={{ color: likedPosts.includes(post.id) ? 'primary.main' : 'text.secondary' }}
            >
              Like
            </ActionButton>
            <ActionButton 
              fullWidth 
              startIcon={
                <ChatBubbleOutlineIcon 
                  sx={{ 
                    fontSize: '1.25rem',
                    color: activePost === post.id ? 'primary.main' : 'inherit',
                  }} 
                />
              }
              onClick={() => setActivePost(activePost === post.id ? null : post.id)}
              sx={{ color: activePost === post.id ? 'primary.main' : 'text.secondary' }}
            >
              Comment
            </ActionButton>
            <ActionButton 
              fullWidth 
              startIcon={
                <ShareIcon 
                  sx={{ 
                    fontSize: '1.25rem',
                    transform: 'scaleX(-1)',
                  }} 
                />
              }
            >
              Share
            </ActionButton>
          </Box>
        </PostCard>
      ))}
      </FeedContainer>
      
      {/* Right Sidebar */}
      <Box sx={{ 
        width: 350, 
        flexShrink: 0,
        display: { xs: 'none', lg: 'block' },
        position: 'sticky',
        top: 80,
        height: 'calc(100vh - 100px)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: (theme) => theme.palette.divider,
          borderRadius: '4px',
        },
      }}>
        <RightSidebarContent />
      </Box>
    </Box>
  );
}

