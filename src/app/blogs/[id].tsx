import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Avatar,
  Divider,
  Chip,
  TextField,
  Paper,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  Badge,
  Grid,
  Skeleton,
  Link,
  Breadcrumbs,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Share as ShareIcon,
  ThumbUp as ThumbUpIcon,
  ThumbUpOutlined as ThumbUpOutlinedIcon,
  Comment as CommentIcon,
  MoreVert as MoreVertIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Link as LinkIcon,
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  Category as CategoryIcon,
  Tag as TagIcon,
  GitHub as GitHubIcon,
  Public as GlobeIcon,
  ArrowUpward as ArrowUpwardIcon,
  NotificationsOff as NotificationsOffIcon,
  Report as ReportIcon,
} from '@mui/icons-material';
import { mockBlogPosts } from '../../mocks/blogMocks';
import BlogCard from "@/components/blogs/BlogCard";

// Markdown content component
const MarkdownContent = ({ content }: { content: string }) => {
  // In a real app, you would use a markdown renderer like react-markdown
  return (
    <Box 
      component="div" 
      sx={{ 
        '& h1': { 
          fontSize: '2.5rem', 
          fontWeight: 700, 
          mb: 3, 
          mt: 4,
          lineHeight: 1.2,
        },
        '& h2': { 
          fontSize: '2rem', 
          fontWeight: 600, 
          mb: 2, 
          mt: 4,
          lineHeight: 1.3,
        },
        '& h3': { 
          fontSize: '1.5rem', 
          fontWeight: 600, 
          mb: 2, 
          mt: 3,
          lineHeight: 1.4,
        },
        '& p': { 
          fontSize: '1.1rem', 
          lineHeight: 1.8, 
          mb: 2,
          color: 'text.primary',
        },
        '& a': {
          color: 'primary.main',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
        '& ul, & ol': {
          pl: 4,
          mb: 3,
          '& li': {
            mb: 1,
            lineHeight: 1.7,
          },
        },
        '& code': {
          backgroundColor: 'action.hover',
          borderRadius: 1,
          px: 0.75,
          py: 0.25,
          fontSize: '0.9em',
          fontFamily: 'monospace',
        },
        '& pre': {
          backgroundColor: 'background.paper',
          borderRadius: 2,
          p: 2,
          overflowX: 'auto',
          mb: 3,
          border: '1px solid',
          borderColor: 'divider',
          '& code': {
            backgroundColor: 'transparent',
            p: 0,
          },
        },
        '& blockquote': {
          borderLeft: '4px solid',
          borderColor: 'primary.main',
          pl: 3,
          py: 1,
          my: 2,
          backgroundColor: 'action.hover',
          fontStyle: 'italic',
          color: 'text.secondary',
          '& p': {
            mb: 0,
          },
        },
        '& img': {
          maxWidth: '100%',
          height: 'auto',
          borderRadius: 2,
          my: 3,
          display: 'block',
          mx: 'auto',
        },
        '& table': {
          width: '100%',
          borderCollapse: 'collapse',
          my: 3,
          '& th, & td': {
            border: '1px solid',
            borderColor: 'divider',
            p: 1.5,
            textAlign: 'left',
          },
          '& th': {
            backgroundColor: 'action.hover',
            fontWeight: 600,
          },
          '& tr:nth-of-type(even)': {
            backgroundColor: 'background.paper',
          },
        },
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

const BlogDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State for comments and interactions
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState('article');
  const [showShareMenu, setShowShareMenu] = useState<null | HTMLElement>(null);
  const [showMoreMenu, setShowMoreMenu] = useState<null | HTMLElement>(null);
  
  // Find the blog post with the matching ID
  const blogPost = mockBlogPosts.find(post => post._id === id);
  
  // Related posts (in a real app, this would be fetched based on tags/category)
  const relatedPosts = mockBlogPosts
    .filter(post => post._id !== id && post.category === blogPost?.category)
    .slice(0, 3);
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  
  // Handle like action
  const handleLike = () => {
    // Implement like functionality
    console.log('Liked blog post:', id);
  };
  
  // Handle bookmark action
  const handleBookmark = () => {
    // Implement bookmark functionality
    console.log('Bookmarked blog post:', id);
  };
  
  // Handle share action
  const handleShare = (platform?: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = blogPost?.title || '';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        // Show a toast notification in a real app
        console.log('Link copied to clipboard');
        break;
      default:
        // Default share dialog
        if (navigator.share) {
          navigator.share({
            title: title,
            text: blogPost?.excerpt || '',
            url: url,
          }).catch(console.error);
        }
    }
    
    setShowShareMenu(null);
  };
  
  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    // In a real app, this would submit the comment to your backend
    console.log('Comment submitted:', comment);
    setComment('');
    
    // Show a success message or update the UI
  };
  
  // Show loading state
  if (router.isFallback || !blogPost) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" width="100%" height={400} sx={{ mb: 4, borderRadius: 2 }} />
        <Skeleton variant="text" width="80%" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="60%" height={40} sx={{ mb: 4 }} />
        <Skeleton variant="rectangular" width="100%" height={300} sx={{ mb: 4, borderRadius: 2 }} />
      </Container>
    );
  }
  
  // Format date
  const formattedDate = blogPost?.createdAt 
    ? new Date(blogPost.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown date';
  
  return (
    <>
      <Head>
        <title>{blogPost.title} | Social Network</title>
        <meta name="description" content={blogPost.excerpt} />
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt} />
        {blogPost.image && <meta property="og:image" content={blogPost.image} />}
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
      <Box sx={{ bgcolor: 'background.paper', py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ textTransform: 'none' }}
          >
            Back to Blogs
          </Button>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {/* Breadcrumbs */}
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
            <Link color="inherit" href="/" underline="hover">
              Home
            </Link>
            <Link color="inherit" href="/blogs" underline="hover">
              Blogs
            </Link>
            <Typography color="text.primary">{blogPost.title}</Typography>
          </Breadcrumbs>
          
          {/* Article Header */}
          <Box sx={{ mb: 4 }}>
            <Chip
              label={blogPost.category}
              color="primary"
              size="small"
              icon={<CategoryIcon fontSize="small" />}
              sx={{ mb: 2 }}
            />
            <Typography variant="h2" component="h1" sx={{ mb: 2, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, lineHeight: 1.2 }}>
              {blogPost.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <Avatar 
                  src={blogPost.author.avatar} 
                  alt={blogPost.author.name}
                  sx={{ width: 40, height: 40, mr: 1.5 }}
                >
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {blogPost.author.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {formattedDate}
                    </Typography>
                    <Box component="span" sx={{ color: 'text.secondary' }}>•</Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                      {blogPost.readTime}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                <IconButton 
                  aria-label="Like"
                  onClick={handleLike}
                  color={blogPost.isLiked ? 'primary' : 'default'}
                >
                  {blogPost.isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                </IconButton>
                <IconButton 
                  aria-label="Bookmark"
                  onClick={handleBookmark}
                  color={blogPost.isBookmarked ? 'primary' : 'default'}
                >
                  {blogPost.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
                <IconButton 
                  aria-label="Share"
                  onClick={(e) => setShowShareMenu(e.currentTarget)}
                >
                  <ShareIcon />
                </IconButton>
                <IconButton 
                  aria-label="More options"
                  onClick={(e) => setShowMoreMenu(e.currentTarget)}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>
            
            {/* Featured Image */}
            {blogPost.image && (
              <Box 
                component="img"
                src={blogPost.image}
                alt={blogPost.title}
                sx={{
                  width: '100%',
                  maxHeight: '500px',
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 4,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                }}
              />
            )}
            
            {/* Tags */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {blogPost.tags.map((tag) => (
                <Chip 
                  key={tag} 
                  label={`#${tag}`} 
                  variant="outlined" 
                  size="small"
                  icon={<TagIcon fontSize="small" />}
                  onClick={() => router.push(`/blogs?tag=${tag}`)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>
          
          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              aria-label="blog post tabs"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab label="Article" value="article" />
              <Tab 
                label={
                  <Badge badgeContent={blogPost.comments} color="primary" sx={{ '& .MuiBadge-badge': { top: 0, right: -12 } }}>
                    Comments
                  </Badge>
                } 
                value="comments" 
              />
              <Tab label="About Author" value="author" />
              <Tab label="Related" value="related" />
            </Tabs>
          </Box>
          
          {/* Tab Content */}
          <Box sx={{ mb: 6 }}>
            {activeTab === 'article' && (
              <Box>
                <MarkdownContent content={blogPost.content} />
                
                <Divider sx={{ my: 6 }} />
                
                {/* Author Bio */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 6 }}>
                  <Avatar 
                    src={blogPost.author.avatar} 
                    alt={blogPost.author.name}
                    sx={{ width: 80, height: 80, mt: 1 }}
                  >
                    <PersonIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Written by {blogPost.author.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {blogPost.author.name} is a passionate writer and developer with expertise in web technologies. 
                      They love sharing knowledge and helping others learn through their writing.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => setActiveTab('author')}
                    >
                      View Profile
                    </Button>
                  </Box>
                </Box>
                
                {/* Tags */}
                <Box sx={{ mb: 6 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Tags
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {blogPost.tags.map((tag) => (
                      <Chip 
                        key={tag} 
                        label={`#${tag}`} 
                        variant="outlined" 
                        size="small"
                        onClick={() => router.push(`/blogs?tag=${tag}`)}
                        sx={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Box>
                </Box>
                
                {/* Share Buttons */}
                <Box sx={{ mb: 6 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Share this article
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<FacebookIcon color="primary" />}
                      onClick={() => handleShare('facebook')}
                      sx={{ textTransform: 'none' }}
                    >
                      Share on Facebook
                    </Button>
                    <Button 
                      variant="outlined" 
                      startIcon={<TwitterIcon color="primary" />}
                      onClick={() => handleShare('twitter')}
                      sx={{ textTransform: 'none' }}
                    >
                      Share on Twitter
                    </Button>
                    <Button 
                      variant="outlined" 
                      startIcon={<LinkedInIcon color="primary" />}
                      onClick={() => handleShare('linkedin')}
                      sx={{ textTransform: 'none' }}
                    >
                      Share on LinkedIn
                    </Button>
                    <Button 
                      variant="outlined" 
                      startIcon={<LinkIcon color="primary" />}
                      onClick={() => handleShare('copy')}
                      sx={{ textTransform: 'none' }}
                    >
                      Copy Link
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
            
            {activeTab === 'comments' && (
              <Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {blogPost.comments} Comments
                </Typography>
                
                {/* Comment Form */}
                <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Leave a comment
                  </Typography>
                  <form onSubmit={handleCommentSubmit}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      placeholder="Share your thoughts..."
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
                      >
                        Post Comment
                      </Button>
                    </Box>
                  </form>
                </Paper>
                
                {/* Comments List */}
                <List sx={{ '& > *:not(:last-child)': { mb: 3 } }}>
                  {[1, 2, 3].map((i) => (
                    <Paper 
                      key={i} 
                      elevation={0} 
                      sx={{ 
                        p: 3, 
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                      }}
                    >
                      <ListItem disableGutters disablePadding>
                        <ListItemAvatar>
                          <Avatar 
                            src={`/images/avatars/avatar${i + 1}.jpg`} 
                            alt={`User ${i}`}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="subtitle2" fontWeight={600}>
                                User {i}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                • {i} day{i !== 1 ? 's' : ''} ago
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
                              This is a sample comment on the blog post. In a real application, this would be user-generated content.
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" size="small">
                            <ThumbUpOutlinedIcon fontSize="small" />
                          </IconButton>
                          <Typography variant="caption" color="text.secondary" sx={{ mx: 1 }}>
                            5
                          </Typography>
                          <IconButton edge="end" size="small">
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Paper>
                  ))}
                </List>
                
                <Button 
                  fullWidth 
                  variant="outlined" 
                  sx={{ mt: 2 }}
                >
                  Load more comments
                </Button>
              </Box>
            )}
            
            {activeTab === 'author' && (
              <Box>
                <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 4, mb: 6 }}>
                  <Box sx={{ flexShrink: 0, textAlign: 'center' }}>
                    <Avatar 
                      src={blogPost.author.avatar} 
                      alt={blogPost.author.name}
                      sx={{ 
                        width: 150, 
                        height: 150, 
                        mb: 2,
                        mx: 'auto',
                        fontSize: '3rem',
                      }}
                    >
                      <PersonIcon fontSize="inherit" />
                    </Avatar>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{ mb: 2 }}
                    >
                      Follow
                    </Button>
                    <Button 
                      variant="outlined" 
                      fullWidth
                    >
                      Message
                    </Button>
                  </Box>
                  
                  <Box>
                    <Typography variant="h4" component="h2" gutterBottom>
                      {blogPost.author.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      Senior Developer & Technical Writer
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {blogPost.author.name} is a passionate developer and technical writer with over 8 years of 
                      experience in web development. They specialize in JavaScript, React, Node.js, and modern 
                      web technologies. When not coding, they enjoy writing tutorials, contributing to open 
                      source, and mentoring junior developers.
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                        <Typography variant="body1">San Francisco, CA</Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Joined</Typography>
                        <Typography variant="body1">January 2020</Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Articles</Typography>
                        <Typography variant="body1">24</Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Followers</Typography>
                        <Typography variant="body1">1.2k</Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                      {['JavaScript', 'React', 'Node.js', 'TypeScript', 'Web Development'].map((skill) => (
                        <Chip key={skill} label={skill} size="small" />
                      ))}
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <IconButton color="primary" size="small">
                        <TwitterIcon />
                      </IconButton>
                      <IconButton color="primary" size="small">
                        <GitHubIcon />
                      </IconButton>
                      <IconButton color="primary" size="small">
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton color="primary" size="small">
                        <GlobeIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 4 }} />
                
                <Typography variant="h5" component="h3" gutterBottom>
                  More from {blogPost.author.name.split(' ')[0]}
                </Typography>
                
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  {mockBlogPosts
                    .filter(post => post.author.name === blogPost.author.name && post.id !== blogPost.id)
                    .slice(0, 3)
                    .map((post) => (
                      <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <BlogCard 
                          blog={post} 
                          variant="grid"
                          onReadMore={() => router.push(`/blogs/${post.id}`)}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Box>
            )}
            
            {activeTab === 'related' && (
              <Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  Related Articles
                </Typography>
                
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  {relatedPosts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                      <BlogCard 
                        blog={post} 
                        variant="grid"
                        onReadMore={() => router.push(`/blogs/${post.id}`)}
                      />
                    </Grid>
                  ))}
                </Grid>
                
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => router.push('/blogs')}
                    size="large"
                    sx={{ px: 4 }}
                  >
                    View All Articles
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
          
          {/* Newsletter Signup */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              bgcolor: 'primary.light', 
              borderRadius: 2,
              textAlign: 'center',
              mb: 6,
            }}
          >
            <Typography variant="h5" component="h3" gutterBottom>
              Subscribe to our newsletter
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
              Get the latest articles, news and resources delivered straight to your inbox. No spam, ever.
            </Typography>
            <Box 
              component="form" 
              sx={{ 
                display: 'flex', 
                gap: 2, 
                maxWidth: 500, 
                mx: 'auto',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <TextField
                fullWidth
                placeholder="Your email address"
                variant="outlined"
                size="small"
                sx={{ 
                  bgcolor: 'background.paper',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: 'divider',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large"
                sx={{ 
                  whiteSpace: 'nowrap',
                  px: 4,
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(63, 81, 181, 0.3)',
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Paper>
          
          {/* Back to top button */}
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button 
              variant="outlined" 
              startIcon={<ArrowUpwardIcon />}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{ textTransform: 'none' }}
            >
              Back to top
            </Button>
          </Box>
        </Box>
      </Container>
      
      {/* Share Menu */}
      <Menu
        anchorEl={showShareMenu}
        open={Boolean(showShareMenu)}
        onClose={() => setShowShareMenu(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleShare('facebook')}>
          <ListItemIcon>
            <FacebookIcon />
          </ListItemIcon>
          <ListItemText>Share on Facebook</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleShare('twitter')}>
          <ListItemIcon>
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText>Share on Twitter</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleShare('linkedin')}>
          <ListItemIcon>
            <LinkedInIcon />
          </ListItemIcon>
          <ListItemText>Share on LinkedIn</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleShare('copy')}>
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText>Copy link</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* More Options Menu */}
      <Menu
        anchorEl={showMoreMenu}
        open={Boolean(showMoreMenu)}
        onClose={() => setShowMoreMenu(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => { setShowMoreMenu(null); handleBookmark(); }}>
          <ListItemIcon>
            {blogPost.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </ListItemIcon>
          <ListItemText>{blogPost.isBookmarked ? 'Remove bookmark' : 'Save for later'}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { setShowMoreMenu(null); }}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText>Report article</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { setShowMoreMenu(null); }}>
          <ListItemIcon>
            <NotificationsOffIcon />
          </ListItemIcon>
          <ListItemText>Mute author</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default BlogDetailPage;
