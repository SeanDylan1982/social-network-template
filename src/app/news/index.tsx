import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Paper,
  Divider,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  MoreVert as MoreVertIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Share as ShareIcon,
  FilterAlt as FilterAltIcon,
  SortByAlpha as SortByAlphaIcon,
} from '@mui/icons-material';
import News from "@/components/news/News";
import { mockNewsItems } from '../../mocks/newsMocks';

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: 'lg',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
  '& .header-section': {
    marginBottom: theme.spacing(4),
    '& .MuiTypography-h4': {
      fontWeight: 600,
      marginBottom: theme.spacing(1),
    },
    '& .MuiTypography-body1': {
      color: theme.palette.text.secondary,
      opacity: 0.8,
    },
  },
  '& .search-section': {
    display: 'flex',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
    marginBottom: theme.spacing(3),
    '& .MuiTextField-root': {
      flex: 1,
      minWidth: 300,
    },
  },
  '& .tabs-section': {
    marginBottom: theme.spacing(3),
    '& .MuiTabs-root': {
      minHeight: 48,
      '& .MuiTab-root': {
        minHeight: 48,
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '0.9375rem',
        '&.Mui-selected': {
          fontWeight: 600,
        },
      },
    },
  },
  '& .news-grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  '& .empty-state': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    py: theme.spacing(8),
    textAlign: 'center',
    '& .MuiTypography-h6': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiButton-root': {
      marginTop: theme.spacing(2),
    },
  },
}));

const NewsPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State for filter and sort
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  // Filter news items based on search query and active tab
  const filteredNews = mockNewsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || item.category?.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  // Handle filter menu
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  // Handle sort menu
  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  // Handle news item menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, newsItem: any) => {
    setSelectedNews(newsItem);
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedNews(null);
  };

  // Handle news item click
  const handleNewsClick = (id: string) => {
    router.push(`/news/${id}`);
  };

  // Handle save news
  const handleSave = (id: string) => {
    // Implement save functionality
    console.log('Saving news:', id);
  };

  // Handle share news
  const handleShare = (id: string) => {
    // Implement share functionality
    console.log('Sharing news:', id);
  };

  // Get unique categories for tabs
  const categories = ['all', ...new Set(mockNewsItems.map(item => item.category).filter(Boolean))];

  return (
    <>
      <Head>
        <title>News | Social Network</title>
        <meta name="description" content="Stay updated with the latest news and updates" />
      </Head>

      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Latest News
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Stay updated with the latest news and updates from our community
            </Typography>
          </Box>

          {/* Search and Filter Bar */}
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<FilterAltIcon />}
                onClick={handleFilterClick}
                sx={{ minWidth: '120px' }}
              >
                Filter
              </Button>
              <Button
                variant="outlined"
                startIcon={<SortByAlphaIcon />}
                onClick={handleSortClick}
                sx={{ minWidth: '120px' }}
              >
                Sort
              </Button>
              <IconButton
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                color={viewMode === 'grid' ? 'primary' : 'default'}
              >
                {viewMode === 'grid' ? <ViewListIcon /> : <GridViewIcon />}
              </IconButton>
            </Box>
          </Box>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              aria-label="news categories"
            >
              {categories.map((category) => (
                <Tab
                  key={category}
                  label={category.charAt(0).toUpperCase() + category.slice(1)}
                  value={category}
                />
              ))}
            </Tabs>
          </Box>

          {/* News List */}
          <News 
            items={filteredNews}
            onNewsClick={handleNewsClick}
          />

          {/* Load More Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button variant="outlined" color="primary">
              Load More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem onClick={handleFilterClose}>All News</MenuItem>
        <MenuItem onClick={handleFilterClose}>Trending</MenuItem>
        <MenuItem onClick={handleFilterClose}>Latest</MenuItem>
        <MenuItem onClick={handleFilterClose}>Most Viewed</MenuItem>
      </Menu>

      {/* Sort Menu */}
      <Menu
        anchorEl={sortAnchorEl}
        open={Boolean(sortAnchorEl)}
        onClose={handleSortClose}
      >
        <MenuItem onClick={handleSortClose}>Newest First</MenuItem>
        <MenuItem onClick={handleSortClose}>Oldest First</MenuItem>
        <MenuItem onClick={handleSortClose}>Most Popular</MenuItem>
        <MenuItem onClick={handleSortClose}>A to Z</MenuItem>
      </Menu>

      {/* News Item Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => selectedNews && handleSave(selectedNews.id)}>
          <ListItemIcon>
            {selectedNews?.isSaved ? (
              <BookmarkIcon fontSize="small" />
            ) : (
              <BookmarkBorderIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>
            {selectedNews?.isSaved ? 'Remove from Saved' : 'Save for later'}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => selectedNews && handleShare(selectedNews.id)}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default NewsPage;
