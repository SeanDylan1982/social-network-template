import { useState } from 'react';
import { GroupPost } from '@/types/group';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  PhotoLibrary as PhotoLibraryIcon,
  VideoLibrary as VideoLibraryIcon,
  MoreHoriz as MoreHorizIcon,
  ThumbUp as ThumbUpIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  Share as ShareIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Bookmark as BookmarkIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface DiscussionTabProps {
  posts: GroupPost[];
  isMember: boolean;
  onCreatePost: (content: string) => void;
  onLikePost: (postId: string) => void;
}

const DiscussionTab: React.FC<DiscussionTabProps> = ({
  posts,
  isMember,
  onCreatePost,
  onLikePost,
}) => {
  const [postContent, setPostContent] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    onCreatePost(postContent);
    setPostContent('');
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    // If older than a week, return the actual date
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Box>
      {/* Create Post */}
      {isMember ? (
        <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Box component="form" onSubmit={handleCreatePost}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="What's on your mind?"
              variant="outlined"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <IconButton color="primary">
                  <PhotoLibraryIcon />
                </IconButton>
                <IconButton color="primary">
                  <VideoLibraryIcon />
                </IconButton>
                <IconButton color="primary">
                  <MoreHorizIcon />
                </IconButton>
              </Box>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={!postContent.trim()}
              >
                Post
              </Button>
            </Box>
          </Box>
        </Paper>
      ) : (
        <Paper sx={{ p: 3, mb: 3, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Join the conversation
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Join this group to post and comment.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {}}
          >
            Join Group
          </Button>
        </Paper>
      )}
      
      {/* Posts */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <Paper key={post.id} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            {/* Post Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar 
                src={post.author.avatar} 
                alt={post.author.name}
                sx={{ width: 48, height: 48, mr: 2 }}
              />
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>
                  {post.author.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatTimeAgo(post.timestamp)}
                </Typography>
              </Box>
              <IconButton sx={{ ml: 'auto' }}>
                <MoreHorizIcon />
              </IconButton>
            </Box>
            
            {/* Post Content */}
            <Typography variant="body1" paragraph sx={{ mb: 2 }}>
              {post.content}
            </Typography>
            
            {/* Post Image */}
            {post.image && (
              <Box 
                sx={{ 
                  mb: 2, 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  maxHeight: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'action.hover',
                }}
              >
                <img 
                  src={post.image} 
                  alt="Post" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%',
                    objectFit: 'contain' 
                  }} 
                />
              </Box>
            )}
            
            {/* Post Stats */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <ThumbUpIcon color="primary" fontSize="small" />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                  {post.likes}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {post.comments} comments • {post.shares} shares
              </Typography>
            </Box>
            
            {/* Post Actions */}
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mt: 1, gap: 1 }}>
              <Button 
                startIcon={<ThumbUpIcon />} 
                color={post.isLiked ? 'primary' : 'inherit'}
                onClick={() => onLikePost(post.id)}
                sx={{ flex: isMobile ? '1 1 100%' : '0 1 auto' }}
              >
                Like
              </Button>
              <Button 
                startIcon={<ChatBubbleOutlineIcon />} 
                sx={{ flex: isMobile ? '1 1 100%' : '0 1 auto' }}
              >
                Comment
              </Button>
              <Button 
                startIcon={<ShareIcon />} 
                sx={{ flex: isMobile ? '1 1 100%' : '0 1 auto' }}
              >
                Share
              </Button>
              <Button 
                startIcon={post.isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />} 
                onClick={() => {}}
                sx={{ 
                  flex: isMobile ? '1 1 100%' : '0 1 auto',
                  ml: isMobile ? '0 !important' : 'auto !important'
                }}
              >
                {post.isSaved ? 'Saved' : 'Save'}
              </Button>
            </Box>
          </Paper>
        ))
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Box sx={{ color: 'text.secondary', mb: 2 }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 14H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 6H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </Box>
          <Typography variant="h6" gutterBottom>
            No posts yet
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Be the first to share what's on your mind!
          </Typography>
          {isMember && (
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => {}}
            >
              Create Post
            </Button>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default DiscussionTab;
