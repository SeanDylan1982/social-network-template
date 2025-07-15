import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Drawer,
  Fab,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterAlt as FilterAltIcon,
  Close as CloseIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  MoreVert as MoreVertIcon,
  Share as ShareIcon,
  Report as ReportIcon,
  Comment as CommentIcon,
  FilterList as FilterListIcon,
  ClearAll as ClearAllIcon,
  Sort as SortIcon,
  ViewList as ViewListIcon,
  GridView as GridViewIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

// Types
type SortOption = 'latest' | 'popular' | 'trending';
type ViewMode = 'grid' | 'list';

interface FilterState {
  category: string;
  tags: string[];
  readTime: [number, number];
}

interface BlogPostType {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  readTime: number;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  stats: {
    views: number;
    likes: number;
    comments: number;
    bookmarks: number;
  };
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};

// BlogPostCard component
const BlogPostCard: React.FC<{ post: BlogPostType }> = ({ post }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: theme.transitions.create(['box-shadow', 'transform']),
        '&:hover': {
          boxShadow: theme.shadows[6],
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={post.featuredImage || '/images/placeholder-blog.jpg'}
          alt={post.title}
          sx={{
            objectFit: 'cover',
            borderRadius: '8px 8px 0 0',
          }}
        />
        <CardContent
          sx={{
            p: theme.spacing(3),
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: theme.spacing(2),
              gap: theme.spacing(2),
            }}
          >
            <Chip
              label={post.category}
              size="medium"
              color="primary"
              variant="outlined"
              sx={{
                fontWeight: 500,
                borderRadius: theme.shape.borderRadius * 2,
                px: theme.spacing(2),
                py: theme.spacing(0.5),
              }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                fontSize: '0.9375rem',
              }}
            >
              {post.readTime} min read
            </Typography>
          </Box>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{
              fontWeight: 600,
              lineHeight: 1.4,
              mb: theme.spacing(2),
            }}
          >
            {post.title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{
              fontSize: '1rem',
              lineHeight: 1.6,
              mb: theme.spacing(2),
            }}
          >
            {post.excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box
        sx={{
          mt: 'auto',
          px: theme.spacing(3),
          pb: theme.spacing(3),
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: theme.spacing(2),
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing(2),
            }}
          >
            <Avatar
              src={post.author.avatar}
              alt={post.author.name}
              sx={{
                width: 40,
                height: 40,
                border: `2px solid ${theme.palette.background.paper}`,
              }}
            />
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                }}
              >
                {post.author.name}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: '0.875rem',
                }}
              >
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: theme.spacing(1.5),
            }}
          >
            <IconButton
              size="small"
              onClick={handleBookmarkToggle}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              {isBookmarked ? (
                <BookmarkIcon
                  fontSize="small"
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                />
              ) : (
                <BookmarkBorderIcon fontSize="small" />
              )}
            </IconButton>
            <IconButton
              size="small"
              onClick={handleLikeToggle}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              {isLiked ? (
                <FavoriteIcon
                  fontSize="small"
                  sx={{
                    color: theme.palette.error.main,
                  }}
                />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
            <IconButton
              size="small"
              onClick={handleMenuOpen}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: theme.spacing(2),
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing(0.5),
            }}
          >
            <FavoriteIcon
              fontSize="small"
              color="action"
              sx={{
                fontSize: 16,
              }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontWeight: 500,
              }}
            >
              {post.stats.likes}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing(0.5),
            }}
          >
            <CommentIcon
              fontSize="small"
              color="action"
              sx={{
                fontSize: 16,
              }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontWeight: 500,
              }}
            >
              {post.stats.comments}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
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
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ReportIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Report</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <BookmarkBorderIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Save for later</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
};

// Helper functions
const handleTagToggle = (tag: string, selectedTags: string[], setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>) => {
  setSelectedTags(prev => 
    prev.includes(tag) 
      ? prev.filter(t => t !== tag) 
      : [...prev, tag]
  );
};

const clearAllFilters = (setFilters: React.Dispatch<React.SetStateAction<FilterState>>) => {
  setFilters({
    category: '',
    tags: [],
    readTime: [0, 30]
  });
};

const handleFilterClose = (setFilterAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => {
  setFilterAnchorEl(null);
};

// Mock data for blog posts
const mockBlogPosts: BlogPostType[] = [
  {
    _id: '1',
    title: 'Getting Started with React',
    excerpt: 'Learn the basics of React and build your first application',
    content: 'In this comprehensive guide, we\'ll walk through the fundamentals of React...',
    category: 'Development',
    tags: ['React', 'JavaScript', 'Frontend'],
    isPublished: true,
    featuredImage: '/images/placeholder-blog.jpg',
    slug: 'getting-started-with-react',
    createdAt: '2023-05-15T10:00:00.000Z',
    updatedAt: '2023-05-15T10:00:00.000Z',
    publishedAt: '2023-05-15T10:00:00.000Z',
    readTime: 5,
    author: {
      id: '1',
      name: 'Jane Doe',
      avatar: '/avatars/1.jpg'
    },
    stats: {
      views: 1250,
      likes: 42,
      comments: 8,
      bookmarks: 15
    }
  },
  {
    _id: '2',
    title: 'Advanced TypeScript Patterns',
    excerpt: 'Master advanced TypeScript patterns for better code quality',
    content: 'TypeScript offers powerful features that can help you write more maintainable and type-safe code...',
    category: 'Development',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    isPublished: true,
    featuredImage: '/images/placeholder-blog.jpg',
    slug: 'advanced-typescript-patterns',
    createdAt: '2023-05-10T14:30:00.000Z',
    updatedAt: '2023-05-10T14:30:00.000Z',
    publishedAt: '2023-05-10T14:30:00.000Z',
    readTime: 8,
    author: {
      id: '2',
      name: 'John Smith',
      avatar: '/avatars/2.jpg'
    },
    stats: {
      views: 980,
      likes: 36,
      comments: 12,
      bookmarks: 8
    }
  },
  {
    _id: '3',
    title: 'The Future of Web Development',
    excerpt: 'Exploring upcoming trends and technologies in web development',
    content: 'The web development landscape is constantly evolving. Here are the key trends to watch...',
    category: 'Technology',
    tags: ['Web', 'Future', 'Trends'],
    isPublished: true,
    featuredImage: '/images/placeholder-blog.jpg',
    slug: 'future-of-web-development',
    createdAt: '2023-05-05T09:15:00.000Z',
    updatedAt: '2023-05-05T09:15:00.000Z',
    publishedAt: '2023-05-05T09:15:00.000Z',
    readTime: 6,
    author: {
      id: '3',
      name: 'Alex Johnson',
      avatar: '/avatars/3.jpg'
    },
    stats: {
      views: 750,
      likes: 28,
      comments: 5,
      bookmarks: 10
    }
  }
] as BlogPostType[];

// Blog post card component
const BlogPostCard: React.FC<{ post: BlogPostType }> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();

  const handleLike = () => {
    setIsLiked(!isLiked);
    // In a real app, this would make an API call to update the like status
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, this would make an API call to update the bookmark status
  };

  const handleShare = () => {
    // In a real app, this would open the native share dialog
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `${window.location.origin}/blogs/${post.slug || post._id}`
      }).catch(console.error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={post.featuredImage || '/images/placeholder-blog.jpg'}
        alt={post.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Chip 
            label={post.category} 
            size="small" 
            sx={{ mr: 1 }} 
          />
          <Typography variant="caption" color="text.secondary">
            {formatDate(post.publishedAt || post.createdAt)}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="small" onClick={handleBookmark}>
            {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Box>
        <Typography variant="h6" component="h2" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {post.excerpt}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <IconButton size="small" onClick={handleLike}>
              {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="caption">
              {(post.stats?.likes || 0) + (isLiked ? 1 : 0)}
            </Typography>
          </Box>
          <Button 
            size="small" 
            onClick={() => router.push(`/blogs/${post.slug || post._id}`)}
            sx={{ ml: 'auto' }}
          >
            Read More
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function BlogsPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('latest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState(mockBlogPosts);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    category: 'All',
    tags: [],
    readTime: [0, 30],
  });

  // State for sort options
  const sortOptions = ['latest', 'popular', 'trending'];

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(['All']);
    mockBlogPosts.forEach(post => {
      if (post.category) {
        cats.add(post.category);
      }
    });
    return Array.from(cats);
  }, []);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    mockBlogPosts.forEach(post => {
      post.tags?.forEach(tag => tag && tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filter and sort blog posts
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...mockBlogPosts];

    // Apply category filter
    if (filters.category) {
      result = result.filter(post => post.category === filters.category);
    }

    // Apply tag filter
    if (filters.tags.length > 0) {
      result = result.filter(post => 
        filters.tags.every(tag => post.tags.includes(tag))
      );
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply read time filter
    const [minTime, maxTime] = filters.readTime;
    result = result.filter(post => {
      const readTime = post.readTime;
      return readTime >= minTime && readTime <= maxTime;
    });

    // Apply sorting
    return result.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime();
        case 'popular':
          return b.stats.views - a.stats.views;
        case 'trending':
          return (b.stats.likes + b.stats.comments) - (a.stats.likes + a.stats.comments);
        default:
          return 0;
      }
    });
  }, [filters, searchQuery, sortBy]);

  // Check if there are active filters
  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery.trim() !== '' ||
      filters.category !== 'All' ||
      filters.tags.length > 0 ||
      filters.readTime[0] > 0 ||
      filters.readTime[1] < 30
    );
  }, [searchQuery, filters]);

  // Handle new post click
  const handleNewPost = useCallback(() => {
    router.push('/blogs/new');
  }, [router]);

  // Handle blog post click
  const handlePostClick = useCallback((id: string) => {
    router.push(`/blogs/${id}`);
  }, [router]);

  // Handle filter menu open/close
  const handleFilterClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  }, []);

  const handleFilterClose = useCallback(() => {
    setFilterAnchorEl(null);
  }, []);

  // Handle view mode change
  const handleViewModeChange = useCallback((event: React.MouseEvent<HTMLElement>, newViewMode: string | null) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  }, []);

  // Handle mobile filter toggle
  const handleMobileFilterToggle = useCallback(() => {
    setMobileFilterOpen(prev => !prev);
  }, []);

  // Handle category filter change
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setFilters(prev => ({
      ...prev,
      category
    }));
  }, []);

  // Handle tag selection
  const handleTagClick = useCallback((tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newTags);
    setFilters(prev => ({
      ...prev,
      tags: newTags
    }));
  }, [selectedTags]);

  // Handle read time filter change
  const handleReadTimeChange = useCallback((event: Event, newValue: number | number[], activeThumb: number) => {
    const [min, max] = newValue as [number, number];
    setFilters(prev => ({
      ...prev,
      readTime: [min, max]
    }));
  }, []);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setActiveCategory('All');
    setSelectedTags([]);
    setFilters({
      category: 'All',
      tags: [],
      readTime: [0, 30],
    });
    setSearchQuery('');
    setSortBy('latest');
    handleFilterClose();
    setMobileFilterOpen(false);
  }, []);

  // Handle post interactions
  const handleLike = useCallback((id: string) => {
    console.log(`Toggled like for post ${id}`);
  }, []);

  const handleBookmark = useCallback((id: string) => {
    console.log(`Toggled bookmark for post ${id}`);
  }, []);

  const handleShare = useCallback((id: string) => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'Check out this blog post',
        text: 'I found this interesting blog post you might like!',
        url: `${window.location.origin}/blogs/${id}`
      }).catch(console.error);
    } else {
      console.log(`Sharing post ${id}`);
    }
  }, []);

  // Handle menu open/close
  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // Handle sort change
  const handleSortChange = useCallback((option: string) => {
    setSortBy(option);
    handleMenuClose();
  }, []);

  // Handle read more/click on post
  const handleReadMore = useCallback((id: string) => {
    router.push(`/blogs/${id}`);
  }, [router]);

  // Format date to a readable format
  const formatDate = useCallback((dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }, []);

  const filteredAndSortedPosts = useMemo(() => {
    let result = [...mockBlogPosts];
    
    // Apply filters
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(post => post.category === filters.category);
    }

    // Apply tags filter
    if (filters.tags.length > 0) {
      result = result.filter(post => 
        filters.tags.every(tag => post.tags.includes(tag))
      );
    }

    // Apply read time filter
    result = result.filter(post => 
      post.readTime >= filters.readTime[0] && 
      post.readTime <= filters.readTime[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'latest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        result.sort((a, b) => (b.stats?.likes || 0) - (a.stats?.likes || 0));
        break;
      case 'trending':
        const now = new Date().getTime();
        result.sort((a, b) => {
          const aDate = new Date(a.createdAt).getTime();
          const bDate = new Date(b.createdAt).getTime();
          const aDays = Math.max(1, (now - aDate) / (1000 * 60 * 60 * 24));
          const bDays = Math.max(1, (now - bDate) / (1000 * 60 * 60 * 24));
          return ((b.stats?.likes || 0) / bDays) - ((a.stats?.likes || 0) / aDays);
        });
        break;
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  // Check if there are active filters
  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery !== '' ||
      filters.category !== 'All' ||
      filters.tags.length > 0 ||
      filters.readTime[0] > 0 ||
      filters.readTime[1] < 30
    );
  }, [searchQuery, filters]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head>
        <title>Blog | Social Network</title>
        <meta name="description" content="Browse our latest blog posts" />
      </Head>

      <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #3f51b5 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text' as const,
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            Blog & Articles
          </Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleNewPost}>
            New Post
          </Button>
        </Box>

        {/* Search and Filter */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setSearchQuery('')} size="small">
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={isMobile ? handleMobileFilterOpen : handleFilterOpen}
                  sx={{ textTransform: 'none' }}
                >
                  Filters
                </Button>
                <Button
                  variant="outlined"
                  endIcon={anchorEl ? <CloseIcon /> : <SortByAlphaIcon />}
                  onClick={handleMenuOpen}
                  sx={{ textTransform: 'none' }}
                >
                  Sort: {sortBy.label}
                </Button>
              </Box>

              {/* Sort Menu */}
              <Menu
                anchorEl={anchorEl}
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
                {sortOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    onClick={() => handleSortChange(option)}
                    selected={sortBy.value === option.value}
                  >
                    <ListItemIcon>
                      {option.value === 'latest' && <AccessTimeIcon />}
                      {option.value === 'popular' && <StarIcon />}
                      {option.value === 'trending' && <TrendingIcon />}
                    </ListItemIcon>
                    <ListItemText>{option.label}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>

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
                PaperProps={{
                  sx: {
                    width: 300,
                    p: 2,
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Categories
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {blogCategories.map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        onClick={() => setActiveCategory(category)}
                        color={activeCategory === category ? 'primary' : 'default'}
                        variant={activeCategory === category ? 'filled' : 'outlined'}
                        size="small"
                      />
                    ))}
                  </Box>

                  <Typography variant="subtitle1" gutterBottom>
                    Popular Tags
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {['React', 'TypeScript', 'JavaScript', 'Web', 'CSS', 'Node.js', 'Next.js'].map(
                      (tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          onClick={() => handleTagToggle(tag)}
                          color={filters.tags.includes(tag) ? 'primary' : 'default'}
                          variant={filters.tags.includes(tag) ? 'filled' : 'outlined'}
                          size="small"
                        />
                      )
                    )}
                  </Box>

                  <Typography variant="subtitle1" gutterBottom>
                    Read Time (min)
                  </Typography>
                  <Box sx={{ px: 2, mb: 2 }}>
                    <Slider
                      value={filters.readTime}
                      onChange={handleReadTimeChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={30}
                      step={5}
                      valueLabelFormat={(value) => (value === 30 ? '30+' : value)}
                      marks={[
                        { value: 0, label: '0' },
                        { value: 5, label: '5' },
                        { value: 10, label: '10' },
                        { value: 15, label: '15' },
                        { value: 20, label: '20' },
                        { value: 25, label: '25' },
                        { value: 30, label: '30+' },
                      ]}
                    />
                  </Box>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={clearAllFilters}
                    startIcon={<ClearIcon />}
                  >
                    Clear All Filters
                  </Button>
                </Box>
              </Menu>

              {/* Mobile Filter Drawer */}
              <Drawer
                anchor="right"
                open={mobileFilterOpen}
                onClose={handleMobileFilterClose}
                ModalProps={{
                  keepMounted: true,
                }}
              >
                <Box sx={{ width: 300, p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 3,
                    }}
                  >
                    <Typography variant="h6">Filters</Typography>
                    <IconButton onClick={handleMobileFilterClose}>
                      <CloseIcon />
                    </IconButton>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Categories
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {blogCategories.map((category) => (
                        <Chip
                          key={category}
                          label={category}
                          onClick={() => setActiveCategory(category)}
                          color={activeCategory === category ? 'primary' : 'default'}
                          variant={activeCategory === category ? 'filled' : 'outlined'}
                          size="small"
                        />
                      ))}
                    </Box>

                    <Typography variant="subtitle1" gutterBottom>
                      Popular Tags
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {['React', 'TypeScript', 'JavaScript', 'Web', 'CSS', 'Node.js', 'Next.js'].map(
                        (tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            onClick={() => handleTagToggle(tag)}
                            color={filters.tags.includes(tag) ? 'primary' : 'default'}
                            variant={filters.tags.includes(tag) ? 'filled' : 'outlined'}
                            size="small"
                          />
                        )
                      )}
                    </Box>

                    <Typography variant="subtitle1" gutterBottom>
                      Read Time (min)
                    </Typography>
                    <Box sx={{ px: 2, mb: 3 }}>
                      <Slider
                        value={filters.readTime}
                        onChange={handleReadTimeChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={30}
                        step={5}
                        valueLabelFormat={(value) => (value === 30 ? '30+' : value)}
                        marks={[
                          { value: 0, label: '0' },
                          { value: 5, label: '5' },
                          { value: 10, label: '10' },
                          { value: 15, label: '15' },
                          { value: 20, label: '20' },
                          { value: 25, label: '25' },
                          { value: 30, label: '30+' },
                        ]}
                      />
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={clearAllFilters}
                      startIcon={<ClearIcon />}
                      sx={{ mb: 2 }}
                    >
                      Clear All Filters
                    </Button>

                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleMobileFilterClose}
                    >
                      Apply Filters
                    </Button>
                  </Box>
                </Box>
              </Drawer>
            </Grid>
          </Grid>

          {/* Active Filters */}
          {(filters.tags.length > 0 || filters.readTime[0] > 0 || filters.readTime[1] < 30) && (
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Active filters:
              </Typography>

              {filters.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={`Tag: ${tag}`}
                  onDelete={() => handleTagToggle(tag)}
                  size="small"
                  variant="outlined"
                />
              ))}

              {(filters.readTime[0] > 0 || filters.readTime[1] < 30) && (
                <Chip
                  label={`Read time: ${filters.readTime[0]}-${filters.readTime[1] === 30 ? '30+' : filters.readTime[1]} min`}
                  onDelete={() => setFilters((prev) => ({ ...prev, readTime: [0, 30] }))}
                  size="small"
                  variant="outlined"
                />
              )}

              <Button size="small" onClick={clearAllFilters} startIcon={<ClearIcon />} sx={{ ml: 1 }}>
                Clear all
              </Button>
            </Box>
          )}
        </Box>

        {/* Blog Posts Grid */}
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
        </Typography>

        {filteredPosts.length > 0 ? (
          <Grid container spacing={3}>
            {filteredPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={post.image}
                    alt={post.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Chip
                      label={post.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                    <Typography gutterBottom variant="h6" component="h2" noWrap>
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical' as const,
                        overflow: 'hidden',
                      }}
                    >
                      {post.excerpt}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                      <Avatar
                        src={post.author.avatar}
                        alt={post.author.name}
                        sx={{ width: 32, height: 32, mr: 1 }}
                      />
                      <Box>
                        <Typography variant="caption" component="div">
                          {post.author.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(post.date).toLocaleDateString()} · {post.readTime} min read
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2, justifyContent: 'space-between' }}>
                    <Box>
                      <IconButton
                        size="small"
                        color={post.isLiked ? 'error' : 'default'}
                        onClick={() => handleLike(post.id)}
                      >
                        {post.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                      <Typography variant="caption" color="text.secondary">
                        {post.likes}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton
                        size="small"
                        color={post.isBookmarked ? 'primary' : 'default'}
                        onClick={() => handleBookmark(post.id)}
                        sx={{ mr: 1 }}
                      >
                        {post.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                      </IconButton>
                      <IconButton size="small" onClick={() => handleShare(post.id)}>
                        <ShareIcon />
                      </IconButton>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: 'center',
              backgroundColor: theme.palette.grey[50],
            }}
          >
            <Typography variant="h6" gutterBottom>
              No blog posts found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Try adjusting your search or filter criteria
            </Typography>
            <Button variant="outlined" color="primary" onClick={clearAllFilters} startIcon={<ClearIcon />}>
              Clear all filters
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

// Filter button and search
<Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
  <Button
    variant="outlined"
    color="primary"
    onClick={(e) => setFilterAnchorEl(e.currentTarget)}
    startIcon={<FilterAltIcon />}
  >
    Filters
  </Button>
  <TextField
    fullWidth
    variant="outlined"
    placeholder="Search articles, topics, or authors..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon color="action" />
        </InputAdornment>
      ),
      sx: {
        borderRadius: 50,
        backgroundColor: 'background.paper',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        '& fieldset': {
          border: 'none',
        },
        '&:hover fieldset': {
          border: 'none',
        },
        '&.Mui-focused fieldset': {
          border: 'none',
        },
      },
    }}
  />
</Box>

// Mobile filter drawer
<Drawer
  anchor="right"
  open={mobileFilterOpen}
  onClose={() => setMobileFilterOpen(false)}
  PaperProps={{
    sx: {
      width: { xs: '100%', sm: 360 },
      p: 2,
    },
  }}
>
  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant="h6">Filters</Typography>
    <IconButton onClick={() => setMobileFilterOpen(false)}>
      <CloseIcon />
    </IconButton>
  </Box>
  <Divider />
  <Box sx={{ p: 2, overflowY: 'auto' }}>
    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
      Categories
    </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
      {blogCategories.slice(0, 6).map((category) => (
        <Chip
          key={category}
          label={category}
          variant={activeCategory === category ? 'filled' : 'outlined'}
          color={activeCategory === category ? 'primary' : 'default'}
          onClick={() => handleCategoryChange(category)}
          sx={{ mb: 1 }}
        />
      ))}
    </Box>
    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, mt: 3 }}>
      Popular Tags
    </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
      {popularTags.slice(0, 8).map((tag) => (
        <Chip
          key={tag.name}
          label={tag.name}
          variant={selectedTags.includes(tag.name) ? 'filled' : 'outlined'}
          color={selectedTags.includes(tag.name) ? 'primary' : 'default'}
          onClick={() => handleTagClick(tag.name)}
          size="small"
        />
      ))}
    </Box>
    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
      Read Time
    </Typography>
    <Box sx={{ px: 1, mb: 3 }}>
      <Slider
        value={readTimeFilter}
        onChange={handleReadTimeChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value} min`}
        min={0}
        max={30}
        step={5}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography variant="caption" color="text.secondary">
          {readTimeFilter[0]} min
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {readTimeFilter[1] === 30 ? '30+ min' : `${readTimeFilter[1]} min`}
        </Typography>
      </Box>
    </Box>
  </Box>
  <Box sx={{ p: 2, display: 'flex', gap: 2, borderTop: '1px solid', borderColor: 'divider' }}>
    <Button
      fullWidth
      variant="outlined"
      onClick={clearAllFilters}
      disabled={!hasActiveFilters}
    >
      Clear all
    </Button>
    <Button
      fullWidth
      variant="contained"
      onClick={() => setMobileFilterOpen(false)}
    >
      Show results
    </Button>
  </Box>
</Drawer>

// Mobile filter button
<Fab
  color="primary"
  aria-label="filter"
  onClick={() => setMobileFilterOpen(true)}
  sx={{
    position: 'fixed',
    bottom: 16,
    right: 16,
    display: { xs: 'flex', sm: 'none' },
  }}
>
  <FilterListIcon />
</Fab>
      )}
    </>
  );
}
