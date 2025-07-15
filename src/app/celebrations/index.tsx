import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Skeleton,
  Paper,
  Fab,
  IconButton,
  Badge,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  Cake as CakeIcon,
  Favorite as HeartIcon,
  Work as WorkIcon,
  EmojiEvents as TrophyIcon,
  School as SchoolIcon,
  Event as EventIcon,
  MoreVert as MoreVertIcon,
  Star as StarIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  ChevronRight as ChevronRightIcon,
  FilterAlt as FilterAltIcon,
  SortByAlpha as SortByAlphaIcon,
  Today as TodayIcon,
  EventAvailable as EventAvailableIcon,
  Celebration as CelebrationIcon,
} from '@mui/icons-material';
import { Celebration, CelebrationType, CelebrationFilterOptions } from '@/types/celebration';

// Mock data - replace with real API calls
const mockCelebrations: Celebration[] = [
  {
    id: '1',
    type: 'birthday',
    title: 'Birthday',
    description: "It's Sarah's birthday today! Let's all wish her a wonderful day filled with joy and happiness.",
    date: new Date().toISOString(),
    user: {
      id: 'user1',
      name: 'Sarah Johnson',
      username: 'sarahj',
      avatar: '/images/avatars/1.jpg',
    },
    isToday: true,
    years: 28,
    likes: 24,
    comments: 5,
    shares: 2,
    isWished: false,
    isSaved: false,
  },
  {
    id: '2',
    type: 'anniversary',
    title: 'Work Anniversary',
    description: 'Celebrating 5 years at Company Inc. Thank you for your dedication and hard work!',
    date: new Date().toISOString(),
    user: {
      id: 'user2',
      name: 'Michael Chen',
      username: 'michaelc',
      avatar: '/images/avatars/2.jpg',
    },
    isToday: true,
    years: 5,
    likes: 18,
    comments: 3,
    shares: 1,
    isWished: false,
    isSaved: true,
  },
  {
    id: '3',
    type: 'birthday',
    title: 'Birthday',
    description: 'Wish Alex a happy birthday tomorrow!',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    user: {
      id: 'user3',
      name: 'Alex Morgan',
      username: 'alexm',
      avatar: '/images/avatars/3.jpg',
    },
    isUpcoming: true,
    years: 32,
    likes: 12,
    comments: 2,
    shares: 0,
    isWished: false,
    isSaved: false,
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Achievement Unlocked',
    description: 'Completed 100 days of coding! This is a major milestone in my coding journey.',
    date: new Date().toISOString(),
    user: {
      id: 'user4',
      name: 'Jamie Wilson',
      username: 'jamiew',
      avatar: '/images/avatars/4.jpg',
    },
    isToday: true,
    likes: 42,
    comments: 8,
    shares: 5,
    isWished: true,
    isSaved: true,
  },
  {
    id: '5',
    type: 'education',
    title: 'Graduation',
    description: 'Congratulations on your graduation! Wishing you success in your future endeavors.',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      id: 'user5',
      name: 'Taylor Swift',
      username: 'taylors',
      avatar: '/images/avatars/5.jpg',
    },
    isUpcoming: true,
    years: 2023,
    likes: 36,
    comments: 4,
    shares: 2,
    isWished: false,
    isSaved: false,
  },
  {
    id: '6',
    type: 'work',
    title: 'Work Anniversary',
    description: 'Celebrating 1 year at Tech Corp. Thank you for your contributions!',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      id: 'user6',
      name: 'Jordan Lee',
      username: 'jordanl',
      avatar: '/images/avatars/6.jpg',
    },
    years: 1,
    likes: 15,
    comments: 2,
    shares: 0,
    isWished: true,
    isSaved: false,
  },
];

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: 'lg',
  '& .celebrations-header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4),
    '& .MuiTypography-h3': {
      fontWeight: 700,
      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  '& .celebrations-tabs': {
    '& .MuiTabs-root': {
      '& .MuiTabs-indicator': {
        height: 2,
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTab-root': {
        textTransform: 'none',
        minWidth: 'auto',
        padding: theme.spacing(1.5, 2),
        fontSize: '1rem',
        fontWeight: 500,
        '&.Mui-selected': {
          color: theme.palette.primary.main,
        },
      },
    },
  },
  '& .celebration-card': {
    '& .MuiCard-root': {
      borderRadius: theme.shape.borderRadius * 2,
      boxShadow: theme.shadows[2],
      transition: theme.transitions.create(['box-shadow', 'transform']),
      '&:hover': {
        boxShadow: theme.shadows[4],
        transform: 'translateY(-2px)',
      },
    },
    '& .celebration-header': {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
      marginBottom: theme.spacing(2),
      '& .MuiAvatar-root': {
        width: 48,
        height: 48,
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
    '& .celebration-content': {
      '& .MuiTypography-h6': {
        fontWeight: 600,
        marginBottom: theme.spacing(1),
      },
      '& .MuiTypography-body1': {
        color: theme.palette.text.secondary,
        lineHeight: 1.6,
      },
    },
    '& .celebration-actions': {
      display: 'flex',
      gap: theme.spacing(1.5),
      marginTop: theme.spacing(2),
      '& .MuiButton-root': {
        textTransform: 'none',
        borderRadius: 20,
        padding: theme.spacing(0.5, 2),
        minWidth: 'auto',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    },
  },
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  '& .MuiGrid-item': {
    marginBottom: theme.spacing(3),
  },
}));

const CelebrationsPage: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<CelebrationFilterOptions>({
    type: 'all',
    date: 'all',
    sortBy: 'date',
  });

  // Menu states
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCelebration, setSelectedCelebration] = useState<Celebration | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  // Fetch celebrations (simulated)
  useEffect(() => {
    const fetchCelebrations = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setCelebrations(mockCelebrations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching celebrations:', error);
        setLoading(false);
      }
    };

    fetchCelebrations();
  }, []);

  // Handler functions
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterChange = (type: CelebrationType | 'all') => {
    setFilters(prev => ({
      ...prev,
      type,
    }));
    setFilterAnchorEl(null);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortChange = (sortBy: 'date' | 'popularity' | 'recent') => {
    setFilters(prev => ({
      ...prev,
      sortBy,
    }));
    setSortAnchorEl(null);
  };

  const handleWish = (celebrationId: string) => {
    setCelebrations(prev =>
      prev.map(celebration =>
        celebration.id === celebrationId
          ? {
              ...celebration,
              isWished: !celebration.isWished,
              likes: celebration.isWished ? (celebration.likes || 0) - 1 : (celebration.likes || 0) + 1,
            }
          : celebration
      )
    );
  };

  const handleShare = (celebrationId: string) => {
    // In a real app, this would open a share dialog
    console.log('Sharing celebration:', celebrationId);
  };

  const handleViewProfile = (username: string) => {
    router.push(`/profile/${username}`);
  };

  const handleViewCelebration = (id: string) => {
    router.push(`/celebrations/${id}`);
  };

  // Filter celebrations based on active tab and search query
  const filteredCelebrations = mockCelebrations.filter(celebration => {
    // Filter by tab
    if (activeTab === 'today' && !celebration.isToday) return false;
    if (activeTab === 'upcoming' && !celebration.isUpcoming) return false;
    if (activeTab === 'birthday' && celebration.type !== 'birthday') return false;
    if (activeTab === 'anniversary' && celebration.type !== 'anniversary') return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        celebration.user?.name.toLowerCase().includes(query) ||
        celebration.title.toLowerCase().includes(query) ||
        celebration.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Sort celebrations
  const sortedCelebrations = [...filteredCelebrations].sort((a, b) => {
    if (filters.sortBy === 'date') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (filters.sortBy === 'popularity') {
      return (b.likes || 0) - (a.likes || 0);
    } else {
      // recent
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  // Get celebration icon
  const getCelebrationIcon = (type: CelebrationType) => {
    switch (type) {
      case 'birthday':
        return <CakeIcon />;
      case 'anniversary':
        return <HeartIcon />;
      case 'work':
        return <WorkIcon />;
      case 'achievement':
        return <TrophyIcon />;
      case 'education':
        return <SchoolIcon />;
      default:
        return <EventIcon />;
    }
  };

  // Get celebration color
  const getCelebrationColor = (type: CelebrationType) => {
    switch (type) {
      case 'birthday':
        return theme.palette.primary.main;
      case 'anniversary':
        return theme.palette.error.main;
      case 'work':
        return theme.palette.info.main;
      case 'achievement':
        return theme.palette.warning.main;
      case 'education':
        return theme.palette.success.main;
      default:
        return theme.palette.text.primary;
    }
  };

  // Handle save celebration
  const handleSave = (id: string) => {
    setCelebrations(prev =>
      prev.map(celebration =>
        celebration.id === id
          ? { ...celebration, isSaved: !celebration.isSaved }
          : celebration
      )
    );
  };

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, celebration: Celebration) => {
    setSelectedCelebration(celebration);
    setMenuAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedCelebration(null);
  };

  // Handle view profile
  const handleViewProfile = (username: string) => {
    router.push(`/profile/${username}`);
  };

  // Handle view celebration details
  const handleViewCelebration = (id: string) => {
    router.push(`/celebrations/${id}`);
  };

  // Handle share celebration
  const handleShare = (id: string) => {
    // Implement share functionality
    console.log('Sharing celebration:', id);
  };

  // Handle wish on celebration
  const handleWish = (id: string) => {
    setCelebrations(prev =>
      prev.map(celebration => {
        if (celebration.id === id) {
          const currentLikes = celebration.likes || 0;
          return {
            ...celebration,
            isWished: !celebration.isWished,
            likes: celebration.isWished ? currentLikes - 1 : currentLikes + 1
          };
        }
        return celebration;
      })
    );
  };

  return (
    <>
      <Head>
        <title>Celebrations | Social Network</title>
        <meta name="description" content="Celebrate special moments with your friends and community" />
      </Head>

      <StyledContainer>
        <Box className="celebrations-header">
          <Typography variant="h3" component="h1" gutterBottom>
            Celebrations
          </Typography>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} className="celebrations-tabs">
            <Tab value="all" label="All" />
            <Tab value="birthday" label="Birthdays" />
            <Tab value="anniversary" label="Anniversaries" />
            <Tab value="achievement" label="Achievements" />
            <Tab value="education" label="Education" />
          </Tabs>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
              Celebrations
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Celebrate birthdays, anniversaries, and special occasions with your friends
              Celebrate special moments with your friends and family
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => router.push('/celebrations/create')}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              py: 1,
            }}
          >
            Create Celebration
          </Button>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab label="All" value="all" />
            <Tab 
              label="Today" 
              value="today" 
              icon={<TodayIcon fontSize="small" sx={{ mr: 0.5 }} />}
              iconPosition="start"
            />
            <Tab 
              label="Upcoming" 
              value="upcoming" 
              icon={<EventAvailableIcon fontSize="small" sx={{ mr: 0.5 }} />}
              iconPosition="start"
            />
            <Tab 
              label="Birthdays" 
              value="birthday" 
              icon={<CakeIcon fontSize="small" sx={{ mr: 0.5 }} />}
              iconPosition="start"
            />
            <Tab 
              label="Anniversaries" 
              value="anniversary" 
              icon={<HeartIcon fontSize="small" sx={{ mr: 0.5 }} />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Search and Filter Bar */}
        <Box 
          display="flex" 
          flexDirection={isMobile ? 'column' : 'row'} 
          gap={2} 
          mb={4}
          alignItems={isMobile ? 'stretch' : 'center'}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search celebrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                bgcolor: 'background.paper',
              },
            }}
          />
          
          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              startIcon={<FilterAltIcon />}
              onClick={(e) => setFilterAnchorEl(e.currentTarget)}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 2,
                minWidth: 'auto',
              }}
            >
              {isMobile ? 'Filter' : 'Filter by'}
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<SortByAlphaIcon />}
              onClick={(e) => setSortAnchorEl(e.currentTarget)}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 2,
                minWidth: 'auto',
              }}
            >
              {filters.sortBy === 'date' ? 'Date' : filters.sortBy === 'popularity' ? 'Popular' : 'Recent'}
            </Button>
            
            <IconButton
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              color="primary"
              sx={{
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: 'background.paper',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              {viewMode === 'grid' ? <ViewListIcon /> : <GridViewIcon />}
            </IconButton>
          </Box>
        </Box>

        {/* Content */}
        <Box>
          {loading ? (
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Skeleton variant="circular" width={56} height={56} />
                      <Box ml={2}>
                        <Skeleton variant="text" width={120} height={24} />
                        <Skeleton variant="text" width={80} height={20} />
                      </Box>
                    </Box>
                    <Skeleton variant="rectangular" height={100} sx={{ mb: 2, borderRadius: 1 }} />
                    <Skeleton variant="rectangular" height={36} sx={{ borderRadius: 2 }} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : celebrations.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <CelebrationIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No celebrations found
              </Typography>
              <Typography color="text.secondary" paragraph>
                {searchQuery
                  ? 'No celebrations match your search. Try different keywords.'
                  : 'There are no celebrations to display right now.'}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => router.push('/celebrations/create')}
                sx={{ mt: 2 }}
              >
                Create Celebration
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {celebrations.map((celebration) => (
                <Grid item xs={12} sm={6} md={4} key={celebration.id}>
                  <Paper
                    sx={{
                      p: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[8],
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" mb={2}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                      <Box
                        sx={{
                          bgcolor: getCelebrationColor(celebration.type),
                          color: theme.palette.getContrastText(getCelebrationColor(celebration.type)),
                          borderRadius: '50%',
                          width: 28,
                          height: 28,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `2px solid ${theme.palette.background.paper}`,
                          '& svg': {
                            fontSize: '0.9rem',
                          },
                        }}
                      >
                        {getCelebrationIcon(celebration.type)}
                      </Box>
                    }
                  >
                    <Avatar
                      src={celebration.user?.avatar}
                      alt={celebration.user?.name}
                      sx={{
                        width: 56,
                        height: 56,
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          transition: 'transform 0.2s',
                        },
                      }}
                      onClick={() => celebration.user?.username && handleViewProfile(celebration.user.username)}
                    >
                      {celebration.user?.name?.charAt(0) || 'U'}
                    </Avatar>
                  </Badge>
                  
                  <Box ml={2}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          color: theme.palette.primary.main,
                          textDecoration: 'underline',
                        },
                      }}
                      onClick={() => celebration.user?.username && handleViewProfile(celebration.user.username)}
                    >
                      {celebration.user?.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      {celebration.title}
                      {celebration.years && (
                        <Chip 
                          label={`${celebration.years} ${celebration.years === 1 ? 'year' : 'years'}`}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            bgcolor: theme.palette.grey[200],
                            color: theme.palette.text.primary,
                          }}
                        />
                      )}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  paragraph
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minHeight: '3em',
                  }}
                >
                  {celebration.description}
                </Typography>
                
                <Box mt="auto" pt={2}>
                  <Button
                    variant={celebration.isWished ? 'outlined' : 'contained'}
                    color="primary"
                    fullWidth
                    startIcon={<StarIcon />}
                    onClick={() => handleWish(celebration.id)}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        bgcolor: celebration.isWished ? 'transparent' : undefined,
                      },
                    }}
                  >
                    {celebration.isWished ? 'Wished' : 'Send Wishes'}
                    {celebration.likes ? ` • ${celebration.likes}` : ''}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleFilterChange('all')}>
          <ListItemText primary="All Types" />
        </MenuItem>
        <MenuItem onClick={() => handleFilterChange('birthday')}>
          <CakeIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
          <ListItemText primary="Birthdays" />
        </MenuItem>
        <MenuItem onClick={() => handleFilterChange('anniversary')}>
          <HeartIcon fontSize="small" sx={{ mr: 1, color: theme.palette.error.main }} />
          <ListItemText primary="Anniversaries" />
        </MenuItem>
        <MenuItem onClick={() => handleFilterChange('work')}>
          <WorkIcon fontSize="small" sx={{ mr: 1, color: theme.palette.info.main }} />
          <ListItemText primary="Work" />
        </MenuItem>
        <MenuItem onClick={() => handleFilterChange('achievement')}>
          <TrophyIcon fontSize="small" sx={{ mr: 1, color: theme.palette.warning.main }} />
          <ListItemText primary="Achievements" />
        </MenuItem>
        <MenuItem onClick={() => handleFilterChange('education')}>
          <SchoolIcon fontSize="small" sx={{ mr: 1, color: theme.palette.success.main }} />
          <ListItemText primary="Education" />
        </MenuItem>
      </Menu>

      {/* Sort Menu */}
      <Menu
        anchorEl={sortAnchorEl}
        open={Boolean(sortAnchorEl)}
        onClose={handleSortClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleSortChange('date')}>
          <ListItemText primary="Date" />
        </MenuItem>
        <MenuItem onClick={() => handleSortChange('popularity')}>
          <ListItemText primary="Most Popular" />
        </MenuItem>
        <MenuItem onClick={() => handleSortChange('recent')}>
          <ListItemText primary="Most Recent" />
        </MenuItem>
      </Menu>

      {/* Celebration Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
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
        <MenuItem onClick={() => selectedCelebration && handleViewCelebration(selectedCelebration.id)}>
          <ListItemIcon>
            <EventIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => selectedCelebration && handleSave(selectedCelebration.id)}>
          <ListItemIcon>
            {selectedCelebration?.isSaved ? (
              <BookmarkIcon fontSize="small" />
            ) : (
              <BookmarkBorderIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>
            {selectedCelebration?.isSaved ? 'Remove from Saved' : 'Save for later'}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => selectedCelebration && handleShare(selectedCelebration.id)}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
      </Menu>

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="Create celebration"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          onClick={() => router.push('/celebrations/create')}
        >
          <AddIcon />
        </Fab>
      )}
    </>
  );
};

export default CelebrationsPage;
