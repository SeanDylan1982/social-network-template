import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  TextField,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Chip,
} from '@mui/material';
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  ThumbUpOutlined as ThumbUpOutlinedIcon,
  ThumbDownOutlined as ThumbDownOutlinedIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Comment as CommentIcon,
  Send as SendIcon,
  HelpOutline as HelpOutlineIcon,
  Article as ArticleIcon,
  LiveHelp as LiveHelpIcon,
  ContactSupport as ContactSupportIcon,
  Info as InfoIcon,
  Forum as ForumIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import Head from 'next/link';

// Sample data for the article
const articleData = {
  id: 'reset-password',
  title: 'How to reset your password',
  category: 'Account & Settings',
  categoryId: 'account-settings',
  lastUpdated: '2023-06-15',
  content: `
    <h3>Resetting Your Password</h3>
    <p>If you've forgotten your password or need to reset it for security reasons, follow these steps:</p>
    
    <ol>
      <li>Go to the login page and click on the "Forgot password?" link below the login form.</li>
      <li>Enter the email address associated with your account.</li>
      <li>Check your email for a message from our support team with a password reset link.</li>
      <li>Click the link in the email to be taken to a secure page where you can create a new password.</li>
      <li>Enter your new password twice to confirm, then click "Reset Password".</li>
      <li>You'll be redirected to the login page where you can sign in with your new password.</li>
    </ol>
    
    <h3>Password Requirements</h3>
    <p>For security reasons, your password must meet the following requirements:</p>
    <ul>
      <li>At least 8 characters long</li>
      <li>Contains at least one uppercase letter</li>
      <li>Contains at least one lowercase letter</li>
      <li>Contains at least one number</li>
      <li>Contains at least one special character (e.g., !@#$%^&*)</li>
    </ul>
    
    <h3>Having Trouble?</h3>
    <p>If you don't receive the password reset email, please check your spam or junk mail folder. If you still can't find it, you can <a href="/help/contact">contact our support team</a> for assistance.</p>
    
    <p>For security reasons, password reset links expire after 24 hours. If your link has expired, you'll need to request a new one.</p>
  `,
  relatedArticles: [
    { id: 'change-password', title: 'How to change your password', category: 'Account & Settings' },
    { id: 'two-factor', title: 'Setting up two-factor authentication', category: 'Account & Settings' },
    { id: 'account-security', title: 'Account security best practices', category: 'Privacy & Safety' },
  ],
  isHelpful: null,
  isBookmarked: false,
  comments: [
    {
      id: 'comment-1',
      author: 'John D.',
      avatar: '/avatars/user1.jpg',
      content: 'Thanks for this guide! It was very helpful. I was able to reset my password easily.',
      date: '2023-06-18T14:30:00Z',
      likes: 12,
      isLiked: false,
    },
    {
      id: 'comment-2',
      author: 'Sarah M.',
      avatar: '/avatars/user2.jpg',
      content: 'I followed the steps but never received the reset email. What should I do?',
      date: '2023-06-17T09:15:00Z',
      likes: 5,
      isLiked: true,
      reply: {
        author: 'Support Team',
        avatar: '/avatars/support.jpg',
        content: 'Hi Sarah, please check your spam/junk folder. If you still can\'t find it, try adding our email to your contacts and request another reset. If the issue persists, please contact us directly.',
        date: '2023-06-17T10:05:00Z',
      }
    },
  ],
};

const HelpArticle = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { category, articleId } = router.query;
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(articleData.isBookmarked);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(articleData.comments);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleHelpfulClick = (helpful: boolean) => {
    setIsHelpful(helpful);
    // In a real app, you would send this feedback to your backend
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, you would update this in your backend
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: `comment-${Date.now()}`,
        author: 'You',
        avatar: '/avatars/current-user.jpg',
        content: comment,
        date: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      };
      setComments([newComment, ...comments]);
      setComment('');
      setShowCommentForm(false);
      // In a real app, you would save the comment to your backend
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(c => 
      c.id === commentId 
        ? { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 }
        : c
    ));
    // In a real app, you would update this in your backend
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDate(dateString);
  };

  return (
    <>
      <Head>
        <title>{articleData.title} - Help Center</title>
        <meta name="description" content={articleData.content.replace(/<[^>]*>?/gm, '').substring(0, 160)} />
      </Head>

      <Box sx={{ bgcolor: theme.palette.background.default, py: 4 }}>
        <Container maxWidth="lg">
          {/* Breadcrumbs */}
          <Box sx={{ mb: 4 }}>
            <Breadcrumbs 
              aria-label="breadcrumb" 
              separator={<NavigateNextIcon fontSize="small" />}
              sx={{ '& .MuiBreadcrumbs-separator': { mx: 1 } }}
            >
              <MuiLink 
                color="inherit" 
                href="/" 
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
                Home
              </MuiLink>
              <MuiLink 
                color="inherit" 
                href="/help" 
                underline="hover"
              >
                Help Center
              </MuiLink>
              <MuiLink 
                color="inherit" 
                href={`/help/${articleData.categoryId}`} 
                underline="hover"
              >
                {articleData.category}
              </MuiLink>
              <Typography color="text.primary">
                {articleData.title}
              </Typography>
            </Breadcrumbs>
          </Box>

          <Grid container spacing={4}>
            {/* Main content */}
            <Grid item xs={12} lg={8}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: { xs: 3, md: 4 },
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  mb: 4,
                }}
              >
                <Typography 
                  variant="h4" 
                  component="h1" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700,
                    mb: 3,
                    color: 'text.primary',
                  }}
                >
                  {articleData.title}
                </Typography>

                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mb: 4,
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  <Chip 
                    label={articleData.category}
                    size="small"
                    variant="outlined"
                    onClick={() => router.push(`/help/${articleData.categoryId}`)}
                    sx={{ 
                      borderRadius: 1,
                      fontWeight: 500,
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  />
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ ml: 'auto' }}
                  >
                    Last updated: {formatDate(articleData.lastUpdated)}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 4 }} />

                <Box 
                  className="article-content"
                  sx={{
                    '& h2, & h3, & h4': {
                      mt: 4,
                      mb: 2,
                      fontWeight: 600,
                      color: 'text.primary',
                    },
                    '& p': {
                      mb: 2,
                      lineHeight: 1.7,
                      color: 'text.secondary',
                    },
                    '& ul, & ol': {
                      pl: 3,
                      mb: 2,
                      '& li': {
                        mb: 1,
                        color: 'text.secondary',
                      },
                    },
                    '& a': {
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: articleData.content }}
                />

                <Divider sx={{ my: 4 }} />

                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Was this article helpful?
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Button
                      variant={isHelpful === true ? 'contained' : 'outlined'}
                      color="primary"
                      startIcon={isHelpful === true ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                      onClick={() => handleHelpfulClick(true)}
                      sx={{ borderRadius: 2 }}
                    >
                      Yes
                    </Button>
                    <Button
                      variant={isHelpful === false ? 'contained' : 'outlined'}
                      color="primary"
                      startIcon={isHelpful === false ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
                      onClick={() => handleHelpfulClick(false)}
                      sx={{ borderRadius: 2 }}
                    >
                      No
                    </Button>
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                      <IconButton 
                        onClick={handleBookmarkClick}
                        color={isBookmarked ? 'primary' : 'default'}
                        aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                      >
                        {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                      </IconButton>
                      <IconButton aria-label="Share">
                        <ShareIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  {isHelpful === false && (
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="What information were you looking for? (Optional)"
                      variant="outlined"
                      sx={{ mt: 2 }}
                    />
                  )}
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                      Comments ({comments.length})
                    </Typography>
                    <Button 
                      variant="outlined" 
                      startIcon={<CommentIcon />}
                      onClick={() => setShowCommentForm(!showCommentForm)}
                      sx={{ borderRadius: 2 }}
                    >
                      {showCommentForm ? 'Cancel' : 'Add a comment'}
                    </Button>
                  </Box>

                  {showCommentForm && (
                    <Card variant="outlined" sx={{ mb: 4, borderRadius: 2 }}>
                      <CardContent>
                        <Box component="form" onSubmit={handleCommentSubmit}>
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Type your comment here..."
                            variant="outlined"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{ mb: 2 }}
                          />
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button 
                              type="submit" 
                              variant="contained" 
                              color="primary"
                              disabled={!comment.trim()}
                              sx={{ borderRadius: 2 }}
                            >
                              Post Comment
                            </Button>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  )}

                  <List sx={{ '& > * + *': { mt: 2 } }}>
                    {comments.map((comment) => (
                      <React.Fragment key={comment.id}>
                        <Card variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                          <CardHeader
                            avatar={
                              <Avatar 
                                src={comment.avatar} 
                                alt={comment.author}
                                sx={{ width: 40, height: 40 }}
                              >
                                {comment.author.charAt(0)}
                              </Avatar>
                            }
                            title={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                  {comment.author}
                                </Typography>
                                {comment.author === 'Support Team' && (
                                  <Chip 
                                    label="Support" 
                                    size="small" 
                                    color="primary" 
                                    variant="outlined"
                                    sx={{ height: 20, fontSize: '0.65rem' }}
                                  />
                                )}
                              </Box>
                            }
                            subheader={
                              <Typography variant="caption" color="text.secondary">
                                {formatRelativeTime(comment.date)}
                              </Typography>
                            }
                            action={
                              <IconButton 
                                size="small" 
                                color={comment.isLiked ? 'primary' : 'default'}
                                onClick={() => handleLikeComment(comment.id)}
                                sx={{ mr: 1 }}
                              >
                                <ThumbUpIcon fontSize="small" />
                                <Typography variant="body2" sx={{ ml: 0.5 }}>
                                  {comment.likes > 0 ? comment.likes : ''}
                                </Typography>
                              </IconButton>
                            }
                            sx={{ 
                              p: 2, 
                              pb: 1,
                              '& .MuiCardHeader-action': { 
                                m: 0,
                                alignSelf: 'center',
                              },
                            }}
                          />
                          <CardContent sx={{ pt: 0, pb: '16px !important', px: 2 }}>
                            <Typography variant="body2">
                              {comment.content}
                            </Typography>
                          </CardContent>
                          
                          {comment.reply && (
                            <Box sx={{ ml: 6, mr: 2, mb: 2, position: 'relative' }}>
                              <Box 
                                sx={{ 
                                  position: 'absolute', 
                                  left: -24, 
                                  top: 16,
                                  width: 24, 
                                  height: 'calc(100% - 16px)',
                                  borderLeft: '2px solid',
                                  borderColor: 'divider',
                                  borderBottom: '2px solid',
                                  borderBottomLeftRadius: 8,
                                }} 
                              />
                              <Card variant="outlined" sx={{ borderRadius: 2, bgcolor: 'action.hover' }}>
                                <CardHeader
                                  avatar={
                                    <Avatar 
                                      src={comment.reply.avatar} 
                                      alt={comment.reply.author}
                                      sx={{ width: 32, height: 32 }}
                                    >
                                      {comment.reply.author.charAt(0)}
                                    </Avatar>
                                  }
                                  title={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                                        {comment.reply.author}
                                      </Typography>
                                      <Chip 
                                        label="Support" 
                                        size="small" 
                                        color="primary" 
                                        sx={{ 
                                          height: 18, 
                                          fontSize: '0.6rem',
                                          '& .MuiChip-label': { px: 1 },
                                        }}
                                      />
                                    </Box>
                                  }
                                  subheader={
                                    <Typography variant="caption" color="text.secondary">
                                      {formatRelativeTime(comment.reply.date)}
                                    </Typography>
                                  }
                                  sx={{ 
                                    p: 1.5, 
                                    pb: 0.5,
                                    '& .MuiCardHeader-content': {
                                      overflow: 'hidden',
                                    },
                                    '& .MuiCardHeader-title': {
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                    },
                                  }}
                                />
                                <CardContent sx={{ p: '0 16px 16px 16px !important' }}>
                                  <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                    {comment.reply.content}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Box>
                          )}
                        </Card>
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              </Paper>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Button 
                  startIcon={<ArrowBackIcon />}
                  onClick={() => router.back()}
                  sx={{ borderRadius: 2 }}
                >
                  Back to Help Center
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  endIcon={<ContactSupportIcon />}
                  onClick={() => router.push('/help/contact')}
                  sx={{ borderRadius: 2 }}
                >
                  Contact Support
                </Button>
              </Box>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} lg={4}>
              <Paper 
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  position: 'sticky',
                  top: 24,
                }}
              >
                <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
                  Related Articles
                </Typography>
                <List disablePadding>
                  {articleData.relatedArticles.map((article, index) => (
                    <React.Fragment key={article.id}>
                      <ListItem 
                        button 
                        component="a"
                        href={`/help/article/${article.id}`}
                        sx={{
                          px: 0,
                          py: 1.5,
                          '&:hover': {
                            backgroundColor: 'transparent',
                            '& .MuiListItemText-primary': {
                              color: 'primary.main',
                            },
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <ArticleIcon color="action" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={article.title}
                          primaryTypographyProps={{
                            variant: 'body2',
                            sx: { fontWeight: 500 },
                          }}
                          secondary={article.category}
                          secondaryTypographyProps={{
                            variant: 'caption',
                            color: 'text.secondary',
                          }}
                        />
                      </ListItem>
                      {index < articleData.relatedArticles.length - 1 && (
                        <Divider component="li" sx={{ my: 1 }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>

                <Divider sx={{ my: 3 }} />

                <Box>
                  <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
                    Need more help?
                  </Typography>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ContactSupportIcon />}
                    onClick={() => router.push('/help/contact')}
                    sx={{ mb: 2, justifyContent: 'flex-start', borderRadius: 2 }}
                  >
                    Contact Support
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ForumIcon />}
                    onClick={() => router.push('/community')}
                    sx={{ justifyContent: 'flex-start', borderRadius: 2 }}
                  >
                    Ask the Community
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HelpArticle;
