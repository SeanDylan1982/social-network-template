import React, { useState } from 'react';
import { 
  Avatar, 
  Box, 
  Typography, 
  IconButton, 
  Card, 
  CardHeader, 
  CardContent, 
  CardActions,
  Menu,
  MenuItem,
  Divider,
  TextField,
  Button,
  styled
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  ThumbUpOutlined as ThumbUpIcon,
  ChatBubbleOutline as CommentIcon,
  ShareOutlined as ShareIcon,
  BookmarkBorder as BookmarkIcon,
  SendOutlined as SendIcon,
  MoodOutlined as MoodIcon,
  ImageOutlined as ImageIcon,
  GifBoxOutlined as GifIcon,
  PollOutlined as PollIcon,
  ScheduleOutlined as ScheduleIcon
} from '@mui/icons-material';

const PostContainer = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}));

const PostHeader = styled(CardHeader)(({ theme }) => ({
  padding: '12px 16px',
  '& .MuiCardHeader-avatar': {
    marginRight: 12,
  },
  '& .MuiCardHeader-title': {
    fontSize: '0.9375rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  '& .MuiCardHeader-subheader': {
    fontSize: '0.8125rem',
    color: theme.palette.text.secondary,
  },
}));

const PostContent = styled(CardContent)({
  padding: '0 16px 12px',
  '&:last-child': {
    paddingBottom: '12px',
  },
});

const PostText = styled(Typography)({
  fontSize: '0.9375rem',
  lineHeight: 1.5,
  marginBottom: '12px',
  whiteSpace: 'pre-line',
  wordBreak: 'break-word',
});

const PostMedia = styled('div')({
  width: '100%',
  borderRadius: 8,
  overflow: 'hidden',
  marginBottom: '12px',
  '& img': {
    width: '100%',
    maxHeight: '500px',
    objectFit: 'cover',
    display: 'block',
  },
});

const PostActions = styled(CardActions)({
  padding: '4px 8px',
  justifyContent: 'space-between',
  borderTop: '1px solid rgba(0, 0, 0, 0.05)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
});

const ActionButton = styled(Button)(({ theme }) => ({
  flex: 1,
  textTransform: 'none',
  color: theme.palette.text.secondary,
  fontWeight: 500,
  padding: '8px 0',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  '& .MuiSvgIcon-root': {
    marginRight: 6,
    fontSize: '1.25rem',
  },
}));

const CommentSection = styled('div')({
  padding: '8px 16px 0',
});

const CommentInput = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 0',
  '& .MuiAvatar-root': {
    marginRight: 8,
    width: 32,
    height: 32,
  },
  '& .MuiInputBase-root': {
    flex: 1,
    backgroundColor: '#f0f2f5',
    borderRadius: '20px',
    padding: '8px 12px',
  },
  '& .MuiInputBase-input': {
    padding: 0,
    fontSize: '0.9375rem',
  },
});

interface PostProps {
  id: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  media?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

const Post: React.FC<PostProps> = ({
  id,
  author,
  content,
  media,
  timestamp,
  likes,
  comments,
  shares,
  isLiked = false,
  isBookmarked = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [commentText, setCommentText] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleCommentClick = () => {
    setShowCommentInput(true);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      // Handle comment submission
      console.log('Comment submitted:', commentText);
      setCommentText('');
      setShowCommentInput(false);
    }
  };

  return (
    <PostContainer>
      <PostHeader
        avatar={
          <Avatar 
            src={author.avatar} 
            alt={author.name}
            sx={{ width: 40, height: 40 }}
          />
        }
        action={
          <>
            <IconButton 
              aria-label="more" 
              aria-controls={`post-menu-${id}`}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id={`post-menu-${id}`}
              anchorEl={anchorEl}
              keepMounted
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
              <MenuItem onClick={handleMenuClose}>Save post</MenuItem>
              <MenuItem onClick={handleMenuClose}>Turn on notifications</MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose}>Copy link</MenuItem>
              <MenuItem onClick={handleMenuClose}>Share to...</MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
                Report post
              </MenuItem>
            </Menu>
          </>
        }
        title={author.name}
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              {timestamp}
            </Typography>
            <Box sx={{ mx: 0.5 }}>•</Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  bgcolor: 'text.secondary',
                  mr: 0.5,
                }}
              />
              <Typography variant="caption" color="text.secondary">
                Public
              </Typography>
            </Box>
          </Box>
        }
      />

      <PostContent>
        <PostText variant="body1">{content}</PostText>
        {media && (
          <PostMedia>
            <img src={media} alt="Post media" />
          </PostMedia>
        )}
      </PostContent>

      <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <Box
            sx={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 0.5,
            }}
          >
            <ThumbUpIcon sx={{ fontSize: '0.75rem' }} />
          </Box>
          <Typography variant="caption" color="text.secondary">
            {likeCount.toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {comments.toLocaleString()} comments • {shares.toLocaleString()} shares
        </Typography>
      </Box>

      <Divider />

      <PostActions>
        <ActionButton
          startIcon={
            <ThumbUpIcon color={liked ? 'primary' : 'inherit'} />
          }
          onClick={handleLike}
          sx={{ color: liked ? 'primary.main' : 'inherit' }}
        >
          Like
        </ActionButton>
        <ActionButton 
          startIcon={<CommentIcon />}
          onClick={handleCommentClick}
        >
          Comment
        </ActionButton>
        <ActionButton startIcon={<ShareIcon />}>Share</ActionButton>
        <ActionButton 
          startIcon={
            <BookmarkIcon color={bookmarked ? 'primary' : 'inherit'} />
          }
          onClick={handleBookmark}
          sx={{ color: bookmarked ? 'primary.main' : 'inherit' }}
        >
          Save
        </ActionButton>
      </PostActions>

      {showCommentInput && (
        <CommentSection>
          <form onSubmit={handleCommentSubmit}>
            <CommentInput>
              <Avatar 
                src="https://randomuser.me/api/portraits/men/1.jpg" 
                alt="User"
              />
              <TextField
                fullWidth
                variant="standard"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                autoFocus
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small">
                        <MoodIcon />
                      </IconButton>
                      <IconButton size="small">
                        <ImageIcon />
                      </IconButton>
                      <IconButton size="small">
                        <GifIcon />
                      </IconButton>
                      <IconButton size="small">
                        <PollIcon />
                      </IconButton>
                      <IconButton size="small">
                        <ScheduleIcon />
                      </IconButton>
                    </Box>
                  ),
                }}
              />
              <IconButton 
                type="submit" 
                color="primary"
                disabled={!commentText.trim()}
              >
                <SendIcon />
              </IconButton>
            </CommentInput>
          </form>
        </CommentSection>
      )}
    </PostContainer>
  );
};

export default Post;
