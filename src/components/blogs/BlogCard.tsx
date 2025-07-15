import React from 'react';
import { 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Avatar, 
  Chip,
  IconButton,
  CardActions,
  Button
} from '@mui/material';
import { BlogPost } from '@/types/blog';
import { formatDistanceToNow } from 'date-fns';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'horizontal' | 'vertical';
  onLike?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  post,
  variant = 'vertical',
  onLike,
  onBookmark,
  onShare,
}) => {
  const router = useRouter();
  const isHorizontal = variant === 'horizontal';

  const handleViewPost = () => {
    router.push(`/blogs/${post.slug || post.id}`);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(post.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark?.(post.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(post.id);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
      elevation={2}
    >
      <CardActionArea 
        onClick={handleViewPost}
        sx={{
          display: 'flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          alignItems: 'stretch',
          height: '100%',
        }}
      >
        {/* Featured Image */}
        <Box 
          sx={{
            width: isHorizontal ? '40%' : '100%',
            height: isHorizontal ? '100%' : 200,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            image={post.featuredImage || '/images/blog-placeholder.jpg'}
            alt={post.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          {/* Category Badge */}
          {post.categories?.length > 0 && (
            <Chip
              label={post.categories[0].name}
              size="small"
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 600,
                '& .MuiChip-label': {
                  px: 1.5,
                },
              }}
            />
          )}
        </Box>

        {/* Content */}
        <Box 
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          {/* Author and Date */}
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar 
              src={post.author.avatar} 
              alt={post.author.name}
              sx={{ width: 32, height: 32, mr: 1.5 }}
            />
            <Box>
              <Typography variant="subtitle2" component="div">
                {post.author.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
                {' • '}
                {post.readTime} min read
              </Typography>
            </Box>
          </Box>

          {/* Title and Excerpt */}
          <Box flexGrow={1}>
            <Typography 
              variant="h6" 
              component="h3" 
              gutterBottom
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              {post.title}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: isHorizontal ? 3 : 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                mb: 2,
                lineHeight: 1.6,
              }}
            >
              {post.excerpt}
            </Typography>
          </Box>

          {/* Tags and Stats */}
          <Box>
            {/* Tags */}
            <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
              {post.tags?.slice(0, 3).map((tag) => (
                <Chip 
                  key={tag.id}
                  label={`#${tag.name}`}
                  size="small"
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/blogs/tags/${tag.slug}`);
                  }}
                />
              ))}
            </Box>

            {/* Stats */}
            <Box 
              display="flex" 
              justifyContent="space-between"
              alignItems="center"
              sx={{ 
                borderTop: '1px solid',
                borderColor: 'divider',
                pt: 1.5,
              }}
            >
              <Box display="flex" gap={2}>
                <Box display="flex" alignItems="center">
                  <IconButton 
                    size="small" 
                    color={post.isLiked ? 'error' : 'default'}
                    onClick={handleLike}
                  >
                    {post.isLiked ? (
                      <FavoriteIcon fontSize="small" />
                    ) : (
                      <FavoriteBorderIcon fontSize="small" />
                    )}
                  </IconButton>
                  <Typography variant="caption" color="text.secondary">
                    {post.likeCount}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <ChatBubbleOutlineIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {post.commentCount}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <VisibilityIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {post.viewCount.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              
              <IconButton 
                size="small" 
                onClick={handleBookmark}
                color={post.isBookmarked ? 'primary' : 'default'}
              >
                {post.isBookmarked ? (
                  <BookmarkIcon fontSize="small" />
                ) : (
                  <BookmarkBorderIcon fontSize="small" />
                )}
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
