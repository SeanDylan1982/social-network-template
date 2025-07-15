import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Divider,
  useTheme,
  useMediaQuery,
  Skeleton,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Group as GroupIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  People as PeopleIcon,
  Event as EventIcon,
  Article as ArticleIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
} from '@mui/icons-material';
import { Group, GroupCategory } from '@/types/group';

// Mock data - replace with real API calls
const mockCategories: GroupCategory[] = [
  { id: 'all', name: 'All Groups', icon: 'groups', count: 0 },
  { id: 'technology', name: 'Technology', icon: 'computer', count: 12 },
  { id: 'sports', name: 'Sports', icon: 'sports_soccer', count: 8 },
  { id: 'music', name: 'Music', icon: 'music_note', count: 5 },
  { id: 'gaming', name: 'Gaming', icon: 'sports_esports', count: 7 },
  { id: 'education', name: 'Education', icon: 'school', count: 9 },
  { id: 'business', name: 'Business', count: 6 },
  { id: 'art', name: 'Art & Design', count: 4 },
];

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'React Developers',
    description: 'A community for React developers to share knowledge and collaborate on projects.',
    coverImage: '/images/groups/react-cover.jpg',
    avatar: '/images/groups/react-logo.png',
    membersCount: 1245,
    postsCount: 342,
    eventsCount: 12,
    isPrivate: false,
    isMember: true,
    isAdmin: false,
    category: 'technology',
    createdAt: '2022-01-15T10:30:00Z',
    updatedAt: '2023-06-20T14:45:00Z',
    location: 'Worldwide',
    website: 'https://reactjs.org',
  },
  {
    id: '2',
    name: 'JavaScript Masters',
    description: 'Advanced JavaScript concepts, patterns, and best practices.',
    coverImage: '/images/groups/js-cover.jpg',
    avatar: '/images/groups/js-logo.png',
    membersCount: 3421,
    postsCount: 1243,
    eventsCount: 24,
    isPrivate: false,
    isMember: true,
    isAdmin: false,
    category: 'technology',
    createdAt: '2021-11-05T08:15:00Z',
    updatedAt: '2023-06-18T09:20:00Z',
  },
  {
    id: '3',
    name: 'Startup Founders',
    description: 'Exclusive network for startup founders to connect and share experiences.',
    coverImage: '/images/groups/startup-cover.jpg',
    avatar: '/images/groups/startup-logo.png',
    membersCount: 856,
    postsCount: 231,
    eventsCount: 8,
    isPrivate: true,
    isMember: false,
    isAdmin: false,
    joinRequestPending: true,
    category: 'business',
    createdAt: '2022-03-10T16:20:00Z',
    updatedAt: '2023-06-15T11:10:00Z',
    location: 'Global',
  },
  {
    id: '4',
    name: 'UI/UX Designers',
    description: 'Design resources, feedback, and discussions for UI/UX professionals.',
    coverImage: '/images/groups/design-cover.jpg',
    avatar: '/images/groups/design-logo.png',
    membersCount: 2103,
    postsCount: 876,
    eventsCount: 15,
    isPrivate: false,
    isMember: false,
    isAdmin: false,
    category: 'art',
    createdAt: '2021-09-22T14:05:00Z',
    updatedAt: '2023-06-19T13:25:00Z',
  },
  {
    id: '5',
    name: 'Node.js Enthusiasts',
    description: 'Everything about Node.js, Express, and backend development.',
    coverImage: '/images/groups/node-cover.jpg',
    avatar: '/images/groups/node-logo.png',
    membersCount: 1876,
    postsCount: 543,
    eventsCount: 18,
    isPrivate: false,
    isMember: true,
    isModerator: true,
    category: 'technology',
    createdAt: '2022-02-14T09:45:00Z',
    updatedAt: '2023-06-17T16:30:00Z',
  },
  {
    id: '6',
    name: 'Mobile App Developers',
    description: 'For developers building mobile applications with React Native, Flutter, and more.',
    coverImage: '/images/groups/mobile-cover.jpg',
    avatar: '/images/groups/mobile-logo.png',
    membersCount: 1542,
    postsCount: 432,
    eventsCount: 9,
    isPrivate: false,
    isMember: false,
    isAdmin: false,
    category: 'technology',
    createdAt: '2022-04-05T11:20:00Z',
    updatedAt: '2023-06-16T10:15:00Z',
  },
];

const GroupStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  '& .stat-item': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    '& .MuiSvgIcon-root': {
      fontSize: '1.25rem',
      color: theme.palette.text.secondary,
    },
    '& .stat-value': {
      fontWeight: 600,
      fontSize: '1.125rem',
    },
    '& .stat-label': {
      color: theme.palette.text.secondary,
      fontSize: '0.875rem',
    },
  },
}));

const GroupCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: theme.transitions.create(['box-shadow', 'transform']),
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-4px)',
  },
  '& .MuiCardMedia-root': {
    height: 200,
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0',
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(3),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  '& .MuiCardActions-root': {
    padding: theme.spacing(2, 3),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

const GroupHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  '& .MuiTypography-h5': {
    fontWeight: 600,
    lineHeight: 1.4,
  },
  '& .MuiAvatar-root': {
    width: 64,
    height: 64,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

const GroupsPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [categories, setCategories] = useState<GroupCategory[]>([]);

  // Fetch groups and categories
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setGroups(mockGroups);
        setCategories(mockCategories);
        setFilteredGroups(mockGroups);
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter groups based on search and active tab
  useEffect(() => {
    let result = [...groups];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        group =>
          group.name.toLowerCase().includes(query) ||
          group.description.toLowerCase().includes(query) ||
          group.category?.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (activeTab !== 'all') {
      result = result.filter(group => group.category === activeTab);
    }
    
    // Sort groups
    result.sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else {
        return b.membersCount - a.membersCount;
      }
    });
    
    setFilteredGroups(result);
  }, [searchQuery, activeTab, sortBy, groups]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const handleSortSelect = (value: 'recent' | 'popular') => {
    setSortBy(value);
    handleSortClose();
  };

  const handleJoinGroup = (groupId: string) => {
    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId
          ? { ...group, isMember: true, joinRequestPending: false }
          : group
      )
    );
  };

  const handleLeaveGroup = (groupId: string) => {
    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId
          ? { ...group, isMember: false, isAdmin: false, isModerator: false }
          : group
      )
    );
  };

  const handleCancelRequest = (groupId: string) => {
    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId
          ? { ...group, joinRequestPending: false }
          : group
      )
    );
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return <GroupIcon />;
    
    switch (category.icon) {
      case 'computer':
        return <GroupIcon />;
      case 'sports_soccer':
        return <GroupIcon />;
      case 'music_note':
        return <GroupIcon />;
      case 'sports_esports':
        return <GroupIcon />;
      case 'school':
        return <GroupIcon />;
      default:
        return <GroupIcon />;
    }
  };

  return (
    <>
      <Head>
        <title>Groups | Social Network</title>
        <meta name="description" content="Browse and join groups based on your interests" />
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Groups
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => router.push('/groups/create')}
            >
              Create Group
            </Button>
          </Box>

          {/* Search and Filter */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search groups..."
              variant="outlined"
              size="small"
              fullWidth={isMobile}
              sx={{
                maxWidth: isMobile ? '100%' : 400,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => {}}
                sx={{ borderRadius: 2 }}
              >
                Filters
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<SortIcon />}
                onClick={handleSortClick}
                sx={{ borderRadius: 2 }}
              >
                {sortBy === 'recent' ? 'Recent' : 'Popular'}
              </Button>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
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
                <MenuItem 
                  onClick={() => handleSortSelect('recent')}
                  selected={sortBy === 'recent'}
                >
                  Most Recent
                </MenuItem>
                <MenuItem 
                  onClick={() => handleSortSelect('popular')}
                  selected={sortBy === 'popular'}
                >
                  Most Popular
                </MenuItem>
              </Menu>
              
              <IconButton
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                color={viewMode === 'grid' ? 'primary' : 'default'}
                sx={{ borderRadius: 1 }}
              >
                {viewMode === 'grid' ? <ViewListIcon /> : <GridViewIcon />}
              </IconButton>
            </Box>
          </Box>
          
          {/* Categories */}
          <Box sx={{ mb: 3, overflowX: 'auto', pb: 1 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                '& .MuiTabs-indicator': {
                  height: 3,
                },
              }}
            >
              {categories.map((category) => (
                <Tab
                  key={category.id}
                  value={category.id}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getCategoryIcon(category.id)}
                      <span>{category.name}</span>
                      {category.count !== undefined && category.count > 0 && (
                        <Chip 
                          label={category.count} 
                          size="small" 
                          sx={{ height: 20, fontSize: '0.7rem' }} 
                        />
                      )}
                    </Box>
                  }
                  sx={{
                    minHeight: 48,
                    textTransform: 'none',
                    fontSize: '0.9375rem',
                    '&.Mui-selected': {
                      color: 'primary.main',
                      fontWeight: 600,
                    },
                  }}
                />
              ))}
            </Tabs>
          </Box>
        </Box>

        {/* Groups Grid/List */}
        {isLoading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton width="80%" height={24} />
                  <Skeleton width="60%" height={20} />
                  <Skeleton width="40%" height={20} />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : filteredGroups.length > 0 ? (
          viewMode === 'grid' ? (
            <Grid container spacing={3}>
              {filteredGroups.map((group) => (
                <Grid item xs={12} sm={6} md={4} key={group.id}>
                  <GroupCard>
                    <CardActionArea 
                      onClick={() => router.push(`/groups/${group.id}`)}
                      sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                    >
                      {/* Cover Image */}
                      <Box 
                        sx={{ 
                          height: 120,
                          position: 'relative',
                          backgroundColor: 'action.hover',
                        }}
                      >
                        {group.coverImage ? (
                          <CardMedia
                            component="img"
                            height="120"
                            image={group.coverImage}
                            alt={group.name}
                            sx={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <Box 
                            sx={{ 
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: 'action.hover',
                            }}
                          >
                            <GroupIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
                          </Box>
                        )}
                        
                        {/* Group Privacy Badge */}
                        <Box 
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'background.paper',
                            borderRadius: 1,
                            px: 1,
                            py: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          {group.isPrivate ? (
                            <LockIcon fontSize="small" color="action" />
                          ) : (
                            <PublicIcon fontSize="small" color="action" />
                          )}
                          <Typography variant="caption" color="text.secondary">
                            {group.isPrivate ? 'Private' : 'Public'}
                          </Typography>
                        </Box>
                        
                        {/* Group Avatar */}
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: -24,
                            left: 16,
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            border: '3px solid',
                            borderColor: 'background.paper',
                            backgroundColor: 'background.paper',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                          }}
                        >
                          {group.avatar ? (
                            <img 
                              src={group.avatar} 
                              alt={group.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <GroupIcon sx={{ fontSize: 32, color: 'text.secondary' }} />
                          )}
                        </Box>
                      </Box>
                      
                      {/* Group Info */}
                      <CardContent sx={{ pt: 4, pb: 2, flexGrow: 1 }}>
                        <Typography 
                          variant="h6" 
                          component="h2" 
                          noWrap 
                          sx={{ 
                            fontWeight: 600,
                            mb: 0.5,
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {group.name}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}
                          >
                            <PeopleIcon fontSize="small" />
                            {formatNumber(group.membersCount)} members
                          </Typography>
                          
                          <Box sx={{ mx: 1 }}>•</Box>
                          
                          <Typography variant="body2" color="text.secondary">
                            {group.category ? getCategoryName(group.category) : 'General'}
                          </Typography>
                        </Box>
                        
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            mb: 1,
                          }}
                        >
                          {group.description}
                        </Typography>
                        
                        {group.location && (
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              mt: 1,
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                            </svg>
                            {group.location}
                          </Typography>
                        )}
                      </CardContent>
                    </CardActionArea>
                    
                    {/* Group Actions */}
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      {group.isMember ? (
                        <Button
                          fullWidth
                          variant="outlined"
                          color="inherit"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLeaveGroup(group.id);
                          }}
                        >
                          {group.isAdmin ? 'Admin' : group.isModerator ? 'Moderator' : 'Joined'}
                        </Button>
                      ) : group.joinRequestPending ? (
                        <Button
                          fullWidth
                          variant="outlined"
                          color="inherit"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelRequest(group.id);
                          }}
                        >
                          Requested
                        </Button>
                      ) : (
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleJoinGroup(group.id);
                          }}
                        >
                          {group.isPrivate ? 'Request to Join' : 'Join Group'}
                        </Button>
                      )}
                    </CardActions>
                  </GroupCard>
                </Grid>
              ))}
            </Grid>
          ) : (
            // List View
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filteredGroups.map((group) => (
                <Paper 
                  key={group.id} 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    gap: 2,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateX(4px)',
                      boxShadow: 3,
                    },
                  }}
                  onClick={() => router.push(`/groups/${group.id}`)}
                >
                  <Box 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      borderRadius: 1, 
                      overflow: 'hidden',
                      flexShrink: 0,
                      backgroundColor: 'action.hover',
                      position: 'relative',
                    }}
                  >
                    {group.coverImage ? (
                      <img 
                        src={group.coverImage} 
                        alt={group.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <Box 
                        sx={{ 
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <GroupIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                      </Box>
                    )}
                    
                    {/* Group Privacy Badge */}
                    <Box 
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        backgroundColor: 'background.paper',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {group.isPrivate ? (
                        <LockIcon fontSize="small" color="action" />
                      ) : (
                        <PublicIcon fontSize="small" color="action" />
                      )}
                    </Box>
                  </Box>
                  
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600} noWrap>
                          {group.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {group.category ? getCategoryName(group.category) : 'General'} • {formatNumber(group.membersCount)} members
                        </Typography>
                      </Box>
                      
                      {group.isMember ? (
                        <Chip 
                          label={group.isAdmin ? 'Admin' : group.isModerator ? 'Moderator' : 'Member'}
                          size="small"
                          color={group.isAdmin || group.isModerator ? 'primary' : 'default'}
                          variant="outlined"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLeaveGroup(group.id);
                          }}
                        />
                      ) : group.joinRequestPending ? (
                        <Chip 
                          label="Requested"
                          size="small"
                          variant="outlined"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelRequest(group.id);
                          }}
                        />
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleJoinGroup(group.id);
                          }}
                        >
                          {group.isPrivate ? 'Request to Join' : 'Join'}
                        </Button>
                      )}
                    </Box>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        mb: 1,
                      }}
                    >
                      {group.description}
                    </Typography>
                    
                    <GroupStats>
                      <Box className="stat-item">
                        <ArticleIcon fontSize="small" />
                        <Typography className="stat-value">{group.postsCount}</Typography>
                        <Typography className="stat-label">posts</Typography>
                      </Box>
                      <Box className="stat-item">
                        <EventIcon fontSize="small" />
                        <Typography className="stat-value">{group.eventsCount}</Typography>
                        <Typography className="stat-label">events</Typography>
                      </Box>
                      {group.location && (
                        <Box className="stat-item">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                          </svg>
                          {group.location}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          )
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <GroupIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No groups found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {searchQuery 
                ? 'Try adjusting your search or filter to find what you\'re looking for.'
                : 'There are no groups in this category yet.'}
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => router.push('/groups/create')}
            >
              Create a Group
            </Button>
          </Box>
        )}
        
        {!isLoading && filteredGroups.length > 0 && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="outlined" 
              onClick={() => {}}
              disabled={filteredGroups.length >= 50} // Example limit
            >
              Load More Groups
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default GroupsPage;
