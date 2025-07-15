import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Button, 
  IconButton, 
  Divider, 
  Chip,
  TextField,
  Paper,
  useMediaQuery,
  useTheme,
  Container,
  Skeleton,
  Tabs,
  Tab,
  Grid
} from '@mui/material';
import { BlogPost, BlogComment } from '@/types/blog';
import { format } from 'date-fns';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/router';
import BlogCard from './BlogCard';

interface BlogDetailsProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
  comments?: BlogComment[];
  onLike?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onCommentSubmit?: (content: string) => void;
  onRelatedPostClick?: (postId: string) => void;
  loading?: boolean;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({
  post,
  relatedPosts = [],
  comments = [],
  onLike,
  onBookmark,
  onShare,
  onCommentSubmit,
  onRelatedPostClick,
  loading = false,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const commentInputRef = useRef<HTMLInputElement>(null);
  
  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  // Handle like
  const handleLike = () => {
    onLike?.(post.id);
  };
  
  // Handle bookmark
  const handleBookmark = () => {
    onBookmark?.(post.id);
  };
  
  // Handle share
  const handleShare = () => {
    onShare?.(post.id);
    // Fallback to Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(console.error);
    }
  };
  
  // Handle comment submit
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onCommentSubmit?.(comment.trim());
      setComment('');
    }
  };
  
  // Handle related post click
  const handleRelatedPostClick = (postId: string) => {
    if (onRelatedPostClick) {
      onRelatedPostClick(postId);
    } else {
      router.push(`/blogs/${postId}`);
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  // Loading skeleton
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box mb={6}>
          <Skeleton variant="rectangular" width="100%" height={400} sx={{ mb: 3, borderRadius: 2 }} />
          <Skeleton variant="text" width="80%" height={60} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="60%" height={30} sx={{ mb: 4 }} />
          
          <Box display="flex" alignItems="center" mb={4}>
            <Skeleton variant="circular" width={48} height={48} sx={{ mr: 2 }} />
            <Box>
              <Skeleton variant="text" width={120} height={24} />
              <Skeleton variant="text" width={100} height={20} />
            </Box>
          </Box>
          
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} variant="text" width="100%" height={24} sx={{ mb: 1 }} />
          ))}
        </Box>
      </Container>
    );
  }
  
  // If no post data
  if (!post) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Post not found
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => router.push('/blogs')}
          sx={{ mt: 2 }}
        >
          Back to Blog
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          <Box mb={4}>
            {/* Featured Image */}
            <Box 
              sx={{
                width: '100%',
                height: { xs: 250, md: 450 },
                borderRadius: 2,
                overflow: 'hidden',
                mb: 4,
                position: 'relative',
                backgroundColor: 'background.paper',
                boxShadow: 2,
              }}
            >
              <img
                src={post.featuredImage || '/images/blog-placeholder.jpg'}
                alt={post.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              
              {/* Category Badge */}
              {post.categories?.length > 0 && (
                <Chip
                  label={post.categories[0].name}
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    fontWeight: 600,
                    px: 1.5,
                    py: 1,
                    '& .MuiChip-label': {
                      px: 0.5,
                    },
                  }}
                />
              )}
            </Box>
            
            {/* Title and Metadata */}
            <Box mb={4}>
              <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.75rem' },
                }}
              >
                {post.title}
              </Typography>
              
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  sx={{ 
                    width: 56, 
                    height: 56, 
                    mr: 2,
                    border: '2px solid',
                    borderColor: 'primary.main',
                  }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {post.author.name}
                  </Typography>
                  <Box display="flex" flexWrap="wrap" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(post.publishedAt)}
                    </Typography>
                    <Box mx={1}>•</Box>
                    <Typography variant="body2" color="text.secondary">
                      {post.readTime} min read
                    </Typography>
                    <Box mx={1}>•</Box>
                    <Typography variant="body2" color="text.secondary">
                      {post.viewCount.toLocaleString()} views
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              {/* Tags */}
              <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                {post.tags?.map((tag) => (
                  <Chip 
                    key={tag.id}
                    label={`#${tag.name}`}
                    variant="outlined"
                    size="small"
                    onClick={() => router.push(`/blogs/tags/${tag.slug}`)}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
              
              {/* Action Buttons */}
              <Box display="flex" flexWrap="wrap" gap={1} mb={4}>
                <Button
                  variant={post.isLiked ? 'contained' : 'outlined'}
                  color={post.isLiked ? 'error' : 'inherit'}
                  startIcon={post.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  onClick={handleLike}
                  size={isMobile ? 'small' : 'medium'}
                >
                  {post.likeCount} {post.likeCount === 1 ? 'Like' : 'Likes'}
                </Button>
                
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<ChatBubbleOutlineIcon />}
                  onClick={() => commentInputRef.current?.focus()}
                  size={isMobile ? 'small' : 'medium'}
                >
                  {post.commentCount} {post.commentCount === 1 ? 'Comment' : 'Comments'}
                </Button>
                
                <Box flexGrow={1} />
                
                <IconButton 
                  color={post.isBookmarked ? 'primary' : 'default'}
                  onClick={handleBookmark}
                  size={isMobile ? 'small' : 'medium'}
                >
                  {post.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
                
                <IconButton 
                  color="default"
                  onClick={handleShare}
                  size={isMobile ? 'small' : 'medium'}
                >
                  <ShareIcon />
                </IconButton>
              </Box>
            </Box>
            
            {/* Content */}
            <Box 
              sx={{
                '& h2': {
                  mt: 4,
                  mb: 2,
                  fontWeight: 600,
                  lineHeight: 1.3,
                },
                '& h3': {
                  mt: 3,
                  mb: 1.5,
                  fontWeight: 600,
                  lineHeight: 1.3,
                },
                '& p': {
                  mb: 2,
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  color: 'text.primary',
                },
                '& a': {
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                },
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 1,
                  my: 3,
                  display: 'block',
                },
                '& ul, & ol': {
                  pl: 4,
                  mb: 2,
                  '& li': {
                    mb: 1,
                    lineHeight: 1.8,
                  },
                },
                '& blockquote': {
                  borderLeft: '4px solid',
                  borderColor: 'primary.main',
                  pl: 3,
                  py: 1,
                  my: 3,
                  fontStyle: 'italic',
                  color: 'text.secondary',
                  '& p': {
                    margin: 0,
                  },
                },
                '& pre': {
                  backgroundColor: 'background.paper',
                  p: 2,
                  borderRadius: 1,
                  overflowX: 'auto',
                  my: 3,
                },
                '& code': {
                  fontFamily: 'monospace',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)', 
                  p: 0.5,
                  borderRadius: 0.5,
                  fontSize: '0.9em',
                },
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Tags */}
            <Box mt={6} mb={4}>
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                Tags:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {post.tags?.map((tag) => (
                  <Chip 
                    key={tag.id}
                    label={`#${tag.name}`}
                    variant="outlined"
                    onClick={() => router.push(`/blogs/tags/${tag.slug}`)}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Box>
            
            {/* Author Bio */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                mb: 6, 
                borderRadius: 2,
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={3}>
                <Box flexShrink={0}>
                  <Avatar 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    sx={{ 
                      width: 80, 
                      height: 80,
                      border: '2px solid',
                      borderColor: 'primary.main',
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Written by {post.author.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {post.author.bio || 'No bio available.'}
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => router.push(`/profile/${post.author.id}`)}
                  >
                    View Profile
                  </Button>
                </Box>
              </Box>
            </Paper>
            
            {/* Comments Section */}
            <Box mb={6}>
              <Typography variant="h5" component="h2" gutterBottom>
                {post.commentCount} {post.commentCount === 1 ? 'Comment' : 'Comments'}
              </Typography>
              
              {/* Comment Form */}
              <Paper 
                component="form" 
                onSubmit={handleCommentSubmit}
                sx={{ 
                  p: 2, 
                  mb: 4,
                  borderRadius: 2,
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="Share your thoughts..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  inputRef={commentInputRef}
                  InputProps={{
                    sx: { 
                      '&:before': { display: 'none' },
                      '&:after': { display: 'none' },
                      '&:hover fieldset': { borderColor: 'divider' },
                      '& fieldset': { borderColor: 'divider' },
                      '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                    },
                  }}
                  sx={{ mb: 2 }}
                />
                <Box display="flex" justifyContent="flex-end">
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    endIcon={<SendIcon />}
                    disabled={!comment.trim()}
                  >
                    Post Comment
                  </Button>
                </Box>
              </Paper>
              
              {/* Comments List */}
              {comments.length > 0 ? (
                <Box>
                  {comments.map((comment) => (
                    <Box 
                      key={comment.id} 
                      sx={{ 
                        mb: 3,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Box display="flex" mb={1}>
                        <Avatar 
                          src={comment.author.avatar} 
                          alt={comment.author.name}
                          sx={{ width: 40, height: 40, mr: 2 }}
                        />
                        <Box flexGrow={1}>
                          <Box display="flex" alignItems="center" mb={0.5}>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {comment.author.name}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.secondary" 
                              sx={{ ml: 1 }}
                            >
                              {formatDate(comment.createdAt)}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {comment.content}
                          </Typography>
                          
                          {/* Comment Actions */}
                          <Box display="flex" alignItems="center" mt={1}>
                            <IconButton size="small" color={comment.isLiked ? 'error' : 'default'}>
                              {comment.isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                            </IconButton>
                            <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                              {comment.likes}
                            </Typography>
                            
                            <Typography 
                              variant="caption" 
                              color="primary" 
                              sx={{ 
                                cursor: 'pointer',
                                '&:hover': { textDecoration: 'underline' },
                              }}
                            >
                              Reply
                            </Typography>
                            
                            <Box flexGrow={1} />
                            
                            <IconButton size="small">
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                      
                      {/* Nested Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <Box pl={6} mt={2}>
                          {comment.replies.map((reply) => (
                            <Box 
                              key={reply.id} 
                              sx={{ 
                                mb: 2,
                                p: 2,
                                borderRadius: 2,
                                backgroundColor: 'action.hover',
                              }}
                            >
                              <Box display="flex">
                                <Avatar 
                                  src={reply.author.avatar} 
                                  alt={reply.author.name}
                                  sx={{ width: 32, height: 32, mr: 1.5 }}
                                />
                                <Box flexGrow={1}>
                                  <Box display="flex" alignItems="center" mb={0.5}>
                                    <Typography variant="subtitle2" fontWeight={600} fontSize="0.8rem">
                                      {reply.author.name}
                                    </Typography>
                                    <Typography 
                                      variant="caption" 
                                      color="text.secondary" 
                                      sx={{ ml: 1 }}
                                    >
                                      {formatDate(reply.createdAt)}
                                    </Typography>
                                  </Box>
                                  <Typography variant="body2" color="text.secondary" fontSize="0.9rem">
                                    {reply.content}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box 
                  textAlign="center" 
                  py={4}
                  sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: 2,
                    border: '1px dashed',
                    borderColor: 'divider',
                  }}
                >
                  <ChatBubbleOutlineIcon 
                    sx={{ 
                      fontSize: 48, 
                      color: 'text.secondary',
                      opacity: 0.5,
                      mb: 1,
                    }} 
                  />
                  <Typography variant="body1" color="text.secondary">
                    No comments yet. Be the first to share what you think!
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
        
        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* About Author */}
          <Paper 
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 2,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              About the Author
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar 
                src={post.author.avatar} 
                alt={post.author.name}
                sx={{ 
                  width: 60, 
                  height: 60, 
                  mr: 2,
                  border: '2px solid',
                  borderColor: 'primary.main',
                }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {post.author.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.author.title || 'Author'}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={2}>
              {post.author.bio || 'No bio available.'}
            </Typography>
            <Button 
              variant="outlined" 
              size="small"
              fullWidth
              onClick={() => router.push(`/profile/${post.author.id}`)}
            >
              View Profile
            </Button>
          </Paper>
          
          {/* Table of Contents */}
          <Paper 
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 2,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Table of Contents
            </Typography>
            <Box component="nav">
              <Box component="ul" sx={{ pl: 2, m: 0, listStyle: 'none' }}>
                {post.content.match(/<h[23][^>]*>.*?<\/h[23]>/g)?.map((heading, i) => {
                  const text = heading.replace(/<[^>]*>?/gm, '');
                  const isH2 = heading.startsWith('<h2');
                  const id = `section-${i}`;
                  
                  return (
                    <Box 
                      key={i} 
                      component="li" 
                      sx={{
                        py: 0.5,
                        pl: isH2 ? 0 : 2,
                        borderLeft: '2px solid',
                        borderColor: 'divider',
                        '&:hover': {
                          borderColor: 'primary.main',
                          '& a': {
                            color: 'primary.main',
                          },
                        },
                      }}
                    >
                      <Typography 
                        component="a"
                        href={`#${id}`}
                        sx={{
                          display: 'block',
                          textDecoration: 'none',
                          color: 'text.primary',
                          fontSize: isH2 ? '0.95rem' : '0.85rem',
                          lineHeight: 1.4,
                          py: 0.5,
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {text}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Paper>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <Paper 
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                You May Also Like
              </Typography>
              <Grid container spacing={2}>
                {relatedPosts.slice(0, 3).map((post) => (
                  <Grid item xs={12} key={post.id}>
                    <BlogCard 
                      post={post} 
                      variant="horizontal"
                      onLike={onLike}
                      onBookmark={onBookmark}
                      onShare={onShare}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}
          
          {/* Categories */}
          <Paper 
            elevation={0}
            sx={{
              p: 3,
              mt: 4,
              borderRadius: 2,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Categories
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {post.categories?.map((category) => (
                <Box 
                  key={category.id}
                  display="flex" 
                  justifyContent="space-between" 
                  alignItems="center"
                  sx={{
                    p: 1.5,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      '& .MuiTypography-root': {
                        color: 'primary.main',
                      },
                    },
                  }}
                >
                  <Typography 
                    variant="body2" 
                    component="a"
                    href={`/blogs/categories/${category.slug}`}
                    sx={{
                      textDecoration: 'none',
                      color: 'text.primary',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {category.name}
                  </Typography>
                  <Chip 
                    label={category.postCount} 
                    size="small" 
                    sx={{ 
                      borderRadius: 1,
                      backgroundColor: 'action.selected',
                      color: 'text.secondary',
                    }} 
                  />
                </Box>
              ))}
            </Box>
          </Paper>
          
          {/* Popular Tags */}
          <Paper 
            elevation={0}
            sx={{
              p: 3,
              mt: 4,
              borderRadius: 2,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Popular Tags
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {post.tags?.map((tag) => (
                <Chip 
                  key={tag.id}
                  label={`#${tag.name}`}
                  variant="outlined"
                  size="small"
                  onClick={() => router.push(`/blogs/tags/${tag.slug}`)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogDetails;
