import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  Share,
  BookmarkBorder,
  Bookmark,
  MoreHoriz,
  Send,
  ArrowBack,
  PlayArrow,
  Image,
  Article,
} from '@mui/icons-material';

// Styled Components
const PostContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: 'calc(100vh - 64px)',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: 'auto',
  },
}));

const MediaContainer = styled(Box)(({ theme }) => ({
  flex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#000',
  position: 'relative',
  '& img, & video': {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  [theme.breakpoints.down('md')]: {
    height: '60vh',
  },
}));

const ContentContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 400,
  borderLeft: '1px solid',
  borderColor: 'divider',
  overflow: 'hidden',
});

const PostHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: '1px solid',
  borderColor: 'divider',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const PostContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  flex: 1,
  overflowY: 'auto',
}));

const PostActions = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  borderTop: '1px solid',
  borderBottom: '1px solid',
  borderColor: 'divider',
  display: 'flex',
  gap: theme.spacing(1),
  '& .MuiIconButton-root': {
    padding: theme.spacing(1),
  },
}));

const CommentInput = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid',
  borderColor: 'divider',
  '& .MuiOutlinedInput-root': {
    borderRadius: 20,
    backgroundColor: theme.palette.background.paper,
  },
}));

// Types
type PostType = 'image' | 'video' | 'text' | 'article';

interface User {
  id: string;
  name: string;
  avatar: string;
  username: string;
}

interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

interface Post {
  id: string;
  type: PostType;
  user: User;
  mediaUrl?: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  isSaved: boolean;
}

interface PostDetailProps {
  post: Post;
  onClose?: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(true);
  const [currentPost, setCurrentPost] = useState<Post>(post);

  const handleLike = () => {
    setCurrentPost(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
    }));
  };

  const handleSave = () => {
    setCurrentPost(prev => ({
      ...prev,
      isSaved: !prev.isSaved,
    }));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      user: {
        id: 'current-user',
        name: 'You',
        username: 'currentuser',
        avatar: '/current-user-avatar.jpg',
      },
      text: comment,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
    };

    setCurrentPost(prev => ({
      ...prev,
      comments: [newComment, ...prev.comments],
    }));

    setComment('');
  };

  const renderMedia = () => {
    switch (currentPost.type) {
      case 'image':
        return <img src={currentPost.mediaUrl} alt="Post" />;
      case 'video':
        return (
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <video
              src={currentPost.mediaUrl}
              controls
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '50%',
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <PlayArrow style={{ fontSize: 40 }} />
            </Box>
          </Box>
        );
      case 'article':
        return (
          <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
            <Article style={{ fontSize: 80, color: 'rgba(255, 255, 255, 0.5)' }} />
            <Typography variant="h6" color="white" mt={2} textAlign="center">
              Article: {currentPost.content.substring(0, 50)}...
            </Typography>
          </Box>
        );
      case 'text':
      default:
        return (
          <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h5" color="white" textAlign="center">
              {currentPost.content}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <PostContainer>
      <MediaContainer>
        {isMobile && (
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <ArrowBack />
          </IconButton>
        )}
        {renderMedia()}
      </MediaContainer>

      <ContentContainer>
        <PostHeader>
          <Avatar src={currentPost.user.avatar} alt={currentPost.user.name} />
          <Box sx={{ ml: 1, flexGrow: 1 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {currentPost.user.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {currentPost.timestamp}
            </Typography>
          </Box>
          <IconButton size="small">
            <MoreHoriz />
          </IconButton>
        </PostHeader>

        <PostContent>
          {currentPost.type !== 'text' && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {currentPost.content}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <Favorite color="error" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">{currentPost.likes}</Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ cursor: 'pointer' }}
              onClick={() => setShowComments(!showComments)}
            >
              {currentPost.comments.length} comments
            </Typography>
          </Box>

          {showComments && (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {currentPost.comments.map((comment) => (
                <React.Fragment key={comment.id}>
                  <ListItem alignItems="flex-start" sx={{ px: 0, py: 1 }}>
                    <ListItemAvatar sx={{ minWidth: 40 }}>
                      <Avatar
                        src={comment.user.avatar}
                        alt={comment.user.name}
                        sx={{ width: 32, height: 32 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          <Typography
                            component="span"
                            variant="subtitle2"
                            fontWeight={600}
                            sx={{ mr: 1 }}
                          >
                            {comment.user.username}
                          </Typography>
                          {comment.text}
                        </>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}
                        >
                          {comment.timestamp}
                          <Box component="span" mx={1}>•</Box>
                          {comment.likes > 0 && (
                            <>
                              <Favorite fontSize="inherit" sx={{ fontSize: 14, mr: 0.5 }} />
                              {comment.likes}
                            </>
                          )}
                        </Typography>
                      }
                      secondaryTypographyProps={{ component: 'div' }}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" sx={{ my: 0.5 }} />
                </React.Fragment>
              ))}
            </List>
          )}
        </PostContent>

        <PostActions>
          <IconButton onClick={handleLike} color={currentPost.isLiked ? 'error' : 'default'}>
            {currentPost.isLiked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <IconButton onClick={() => setShowComments(!showComments)}>
            <ChatBubbleOutline />
          </IconButton>
          <IconButton>
            <Share />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleSave}>
            {currentPost.isSaved ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
        </PostActions>

        <CommentInput>
          <Box component="form" onSubmit={handleCommentSubmit} sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              disabled={!comment.trim()}
              sx={{ minWidth: 'auto', px: 2 }}
            >
              <Send />
            </Button>
          </Box>
        </CommentInput>
      </ContentContainer>
    </PostContainer>
  );
};

export default PostDetail;
