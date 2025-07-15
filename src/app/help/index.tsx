import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import {
  Search as SearchIcon,
  HelpOutline as HelpOutlineIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Article as ArticleIcon,
  LiveHelp as LiveHelpIcon,
  ContactSupport as ContactSupportIcon,
  Info as InfoIcon,
  Forum as ForumIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Sample data for help categories and articles
const helpCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: <HelpOutlineIcon color="primary" />,
    description: 'Learn the basics and get started with our platform',
    articles: [
      { id: 'create-account', title: 'How to create an account' },
      { id: 'profile-setup', title: 'Setting up your profile' },
      { id: 'navigation', title: 'Navigating the platform' },
      { id: 'privacy-settings', title: 'Privacy settings overview' },
    ],
  },
  {
    id: 'account-settings',
    title: 'Account & Settings',
    icon: <ArticleIcon color="primary" />,
    description: 'Manage your account preferences and settings',
    articles: [
      { id: 'change-password', title: 'Changing your password' },
      { id: 'update-email', title: 'Updating your email address' },
      { id: 'notification-settings', title: 'Notification settings' },
      { id: 'deactivate-account', title: 'Deactivating your account' },
    ],
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    icon: <LiveHelpIcon color="primary" />,
    description: 'Find solutions to common issues',
    articles: [
      { id: 'login-issues', title: 'Trouble signing in' },
      { id: 'upload-issues', title: 'Upload problems' },
      { id: 'video-playback', title: 'Video playback issues' },
      { id: 'report-bug', title: 'How to report a bug' },
    ],
  },
  {
    id: 'privacy-safety',
    title: 'Privacy & Safety',
    icon: <InfoIcon color="primary" />,
    description: 'Learn about our privacy policies and safety features',
    articles: [
      { id: 'privacy-policy', title: 'Privacy policy overview' },
      { id: 'report-content', title: 'Reporting inappropriate content' },
      { id: 'block-users', title: 'Blocking and reporting users' },
      { id: 'data-usage', title: 'How we use your data' },
    ],
  },
  {
    id: 'community',
    title: 'Community Guidelines',
    icon: <ForumIcon color="primary" />,
    description: 'Understand our community standards and rules',
    articles: [
      { id: 'content-policy', title: 'Content policy' },
      { id: 'copyright', title: 'Copyright information' },
      { id: 'community-standards', title: 'Community standards' },
      { id: 'monetization', title: 'Monetization policies' },
    ],
  },
  {
    id: 'contact',
    title: 'Contact Support',
    icon: <ContactSupportIcon color="primary" />,
    description: 'Need more help? Reach out to our support team',
    articles: [
      { id: 'contact-form', title: 'Submit a support request' },
      { id: 'live-chat', title: 'Live chat with support' },
      { id: 'faq', title: 'Frequently asked questions' },
      { id: 'status', title: 'System status' },
    ],
  },
];

const popularArticles = [
  { id: 'reset-password', title: 'How to reset your password', category: 'Account & Settings' },
  { id: 'two-factor', title: 'Setting up two-factor authentication', category: 'Account & Settings' },
  { id: 'privacy-controls', title: 'Understanding privacy controls', category: 'Privacy & Safety' },
  { id: 'upload-troubleshooting', title: 'Troubleshooting upload issues', category: 'Troubleshooting' },
  { id: 'monetization-eligibility', title: 'Monetization eligibility requirements', category: 'Community' },
];

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: 'lg',
  '& .hero-section': {
    textAlign: 'center',
    mb: theme.spacing(6),
    '& .MuiTypography-h3': {
      fontWeight: 700,
      mb: theme.spacing(2),
    },
    '& .MuiTypography-h6': {
      color: theme.palette.text.secondary,
      maxWidth: 700,
      mx: 'auto',
      mb: theme.spacing(4),
    },
  },
  '& .search-section': {
    mb: theme.spacing(6),
    '& .MuiTextField-root': {
      '& .MuiOutlinedInput-root': {
        borderRadius: theme.shape.borderRadius * 2,
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.primary.main,
        },
      },
      '& .MuiInputAdornment-root': {
        color: theme.palette.text.secondary,
      },
    },
  },
  '& .categories-section': {
    display: 'grid',
    gap: theme.spacing(3),
    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
    mb: theme.spacing(6),
    '& .category-card': {
      transition: theme.transitions.create(['box-shadow', 'transform']),
      '&:hover': {
        boxShadow: theme.shadows[6],
        transform: 'translateY(-2px)',
      },
      '& .MuiCardActionArea-root': {
        padding: theme.spacing(3),
        '& .MuiCardActionArea-content': {
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing(3),
        },
      },
      '& .MuiAvatar-root': {
        width: 64,
        height: 64,
        backgroundColor: theme.palette.primary.light,
        '& .MuiSvgIcon-root': {
          fontSize: '2.5rem',
        },
      },
      '& .MuiTypography-h5': {
        fontWeight: 600,
        mb: theme.spacing(1),
      },
      '& .MuiTypography-body1': {
        color: theme.palette.text.secondary,
        opacity: 0.8,
      },
    },
  },
  '& .articles-section': {
    '& .article-card': {
      transition: theme.transitions.create(['box-shadow', 'transform']),
      '&:hover': {
        boxShadow: theme.shadows[4],
        transform: 'translateY(-2px)',
      },
      '& .MuiCardActionArea-root': {
        padding: theme.spacing(3),
        '& .MuiCardActionArea-content': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      },
      '& .MuiTypography-h6': {
        fontWeight: 600,
      },
      '& .MuiTypography-body2': {
        color: theme.palette.text.secondary,
        opacity: 0.8,
      },
    },
  },
  '& .contact-section': {
    display: 'grid',
    gap: theme.spacing(3),
    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
    '& .contact-card': {
      '& .MuiCardContent-root': {
        padding: theme.spacing(3),
        '& .MuiTypography-h6': {
          fontWeight: 600,
          mb: theme.spacing(2),
        },
        '& .MuiList-root': {
          padding: 0,
          '& .MuiListItem-root': {
            padding: theme.spacing(1, 0),
            '&:last-child': {
              pb: 0,
            },
          },
          '& .MuiListItemIcon-root': {
            minWidth: 40,
            color: theme.palette.primary.main,
          },
          '& .MuiListItemText-root': {
            '& .MuiTypography-root': {
              color: theme.palette.text.secondary,
            },
          },
        },
      },
    },
  },
}));

const HelpCenter = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('categories'); // 'categories' or 'search'

  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleArticleClick = (categoryId: string, articleId: string) => {
    router.push(`/help/${categoryId}/${articleId}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('search');
      // In a real app, you would perform the search here
    }
  };

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredArticles = searchQuery.trim() === ''
    ? []
    : helpCategories.flatMap(category =>
        category.articles
          .filter(article => 
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(article => ({
            ...article,
            categoryId: category.id,
            categoryTitle: category.title,
          }))
      );

  return (
    <>
      <Head>
        <title>Help Center - Social Network</title>
        <meta name="description" content="Get help and support for our platform" />
      </Head>

      <Box sx={{ bgcolor: theme.palette.background.paper, py: 6 }}>
        <Container maxWidth="lg">
          <Card className="hero-section" sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              How can we help you today?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
              Find answers in our help center or contact our support team for assistance.
            </Typography>
            
            <Box component="form" onSubmit={handleSearch} sx={{ maxWidth: 700, mx: 'auto' }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'background.paper',
                    borderRadius: 4,
                    boxShadow: theme.shadows[2],
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: `2px solid ${theme.palette.primary.main}`,
                    },
                  },
                }}
              />
            </Box>
          </Box>

          {(searchQuery.trim() === '' || activeTab === 'categories') && (
            <>
              <Box sx={{ mb: 6 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Browse by category
                </Typography>
                <Grid container spacing={3}>
                  {helpCategories.map((category) => (
                    <Grid item xs={12} sm={6} lg={4} key={category.id}>
                      <Card 
                        variant="outlined" 
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'all 0.2s',
                          '&:hover': {
                            borderColor: theme.palette.primary.main,
                            boxShadow: theme.shadows[4],
                            transform: 'translateY(-4px)',
                          },
                        }}
                      >
                        <CardActionArea 
                          onClick={() => handleCategoryClick(category.id)}
                          sx={{ 
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            p: 3,
                          }}
                        >
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            mb: 2,
                            width: '100%',
                            justifyContent: 'space-between',
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ bgcolor: theme.palette.primary.light, mr: 2 }}>
                                {category.icon}
                              </Avatar>
                              <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                                {category.title}
                              </Typography>
                            </Box>
                            {expandedCategory === category.id ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'left' }}>
                            {category.description}
                          </Typography>
                          
                          <Collapse in={expandedCategory === category.id} sx={{ width: '100%', mt: 2 }}>
                            <List dense disablePadding>
                              {category.articles.map((article) => (
                                <ListItem 
                                  key={article.id} 
                                  button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleArticleClick(category.id, article.id);
                                  }}
                                  sx={{
                                    px: 0,
                                    py: 1,
                                    '&:hover': {
                                      backgroundColor: 'transparent',
                                      color: theme.palette.primary.main,
                                    },
                                  }}
                                >
                                  <ListItemIcon sx={{ minWidth: 32 }}>
                                    <Box 
                                      sx={{ 
                                        width: 4, 
                                        height: 4, 
                                        borderRadius: '50%', 
                                        bgcolor: 'text.secondary',
                                      }} 
                                    />
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary={article.title} 
                                    primaryTypographyProps={{
                                      variant: 'body2',
                                      sx: {
                                        '&:hover': {
                                          color: theme.palette.primary.main,
                                        },
                                      },
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                            <Button 
                              size="small" 
                              color="primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/help/${category.id}`);
                              }}
                              sx={{ 
                                mt: 1,
                                textTransform: 'none',
                                fontWeight: 500,
                                '&:hover': {
                                  backgroundColor: 'transparent',
                                },
                              }}
                            >
                              View all {category.title.toLowerCase()} articles
                            </Button>
                          </Collapse>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Divider sx={{ my: 6 }} />

              <Box sx={{ mb: 6 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Popular help articles
                </Typography>
                <Grid container spacing={3}>
                  {popularArticles.map((article) => (
                    <Grid item xs={12} sm={6} key={article.id}>
                      <Card 
                        variant="outlined" 
                        sx={{
                          height: '100%',
                          transition: 'all 0.2s',
                          '&:hover': {
                            borderColor: theme.palette.primary.main,
                            boxShadow: theme.shadows[2],
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <CardActionArea 
                          onClick={() => router.push(`/help/article/${article.id}`)}
                          sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'flex-start' }}
                        >
                          <Box sx={{ mr: 2, mt: 0.5 }}>
                            <ArticleIcon color="action" />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 500, mb: 0.5 }}>
                              {article.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {article.category}
                            </Typography>
                          </Box>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          )}

          {searchQuery.trim() !== '' && activeTab === 'search' && (
            <Box>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Search results for "{searchQuery}"
              </Typography>
              
              {filteredArticles.length > 0 ? (
                <Paper variant="outlined" sx={{ p: 2, mb: 4 }}>
                  <List>
                    {filteredArticles.map((article, index) => (
                      <React.Fragment key={`${article.categoryId}-${article.id}`}>
                        <ListItem 
                          button 
                          onClick={() => handleArticleClick(article.categoryId, article.id)}
                          sx={{
                            '&:hover': {
                              backgroundColor: 'action.hover',
                              borderRadius: 1,
                            },
                          }}
                        >
                          <ListItemIcon>
                            <ArticleIcon color="action" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={article.title}
                            secondary={article.categoryTitle}
                            primaryTypographyProps={{
                              variant: 'subtitle1',
                              sx: { fontWeight: 500 },
                            }}
                            secondaryTypographyProps={{
                              variant: 'body2',
                            }}
                          />
                        </ListItem>
                        {index < filteredArticles.length - 1 && <Divider component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              ) : (
                <Box textAlign="center" py={6}>
                  <SearchIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    No results found for "{searchQuery}"
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
                    We couldn't find any articles matching your search. Try different keywords or browse our help categories.
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveTab('categories');
                    }}
                  >
                    Browse all help articles
                  </Button>
                </Box>
              )}
            </Box>
          )}

          <Divider sx={{ my: 6 }} />

          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Still need help?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              Our support team is here to help you with any questions or issues you might have.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                color="primary"
                size="large"
                startIcon={<EmailIcon />}
                onClick={() => router.push('/help/contact')}
                sx={{ minWidth: 200 }}
              >
                Contact Support
              </Button>
              <Button 
                variant="outlined" 
                color="primary"
                size="large"
                startIcon={<ForumIcon />}
                onClick={() => router.push('/community')}
                sx={{ minWidth: 200 }}
              >
                Community Forums
              </Button>
            </Box>
            
            <Box sx={{ mt: 6, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon color="action" />
                <Typography variant="body2" color="text.secondary">
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon color="action" />
                <Typography variant="body2" color="text.secondary">
                  support@socialnetwork.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon color="action" />
                <Typography variant="body2" color="text.secondary">
                  Mon-Fri, 9am-6pm EST
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HelpCenter;
