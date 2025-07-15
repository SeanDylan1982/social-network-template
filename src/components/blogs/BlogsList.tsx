import React, { useState, useCallback } from 'react';
import { 
  Box, 
  Grid, 
  TextField, 
  InputAdornment, 
  ToggleButton, 
  ToggleButtonGroup,
  Typography,
  Button,
  Paper,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Divider,
  Chip
} from '@mui/material';
import { BlogPost, BlogCategory } from '@/types/blog';
import BlogCard from './BlogCard';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';

export type ViewMode = 'grid' | 'list';
export type SortOption = 'latest' | 'popular' | 'trending';

interface BlogsListProps {
  posts: BlogPost[];
  categories: BlogCategory[];
  selectedCategory?: string;
  selectedTag?: string;
  searchQuery?: string;
  sortBy?: SortOption;
  viewMode?: ViewMode;
  isLoading?: boolean;
  onSearch?: (query: string) => void;
  onCategoryChange?: (categorySlug: string) => void;
  onSortChange?: (sortBy: SortOption) => void;
  onViewModeChange?: (mode: ViewMode) => void;
  onLoadMore?: () => void;
  onCreatePost?: () => void;
  hasMore?: boolean;
}

const BlogsList: React.FC<BlogsListProps> = ({
  posts = [],
  categories = [],
  selectedCategory = 'all',
  selectedTag,
  searchQuery = '',
  sortBy = 'latest',
  viewMode = 'grid',
  isLoading = false,
  hasMore = false,
  onSearch,
  onCategoryChange,
  onSortChange,
  onViewModeChange,
  onLoadMore,
  onCreatePost,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  
  // State for sort menu
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState(searchQuery);
  
  // Handle search with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    // Debounce search
    if (onSearch) {
      const timer = setTimeout(() => {
        onSearch(value);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  };
  
  // Handle sort menu
  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };
  
  const handleSortClose = () => {
    setSortAnchorEl(null);
  };
  
  const handleSortSelect = (option: SortOption) => {
    onSortChange?.(option);
    handleSortClose();
  };
  
  // Handle view mode change
  const handleViewModeChange = (_: React.MouseEvent, newViewMode: ViewMode | null) => {
    if (newViewMode !== null) {
      onViewModeChange?.(newViewMode);
    }
  };
  
  // Handle category change
  const handleCategoryChange = (categorySlug: string) => {
    onCategoryChange?.(categorySlug);
  };
  
  // Handle tag click
  const handleTagClick = (tagSlug: string) => {
    router.push(`/blogs/tags/${tagSlug}`);
  };
  
  // Handle create post
  const handleCreatePost = () => {
    if (onCreatePost) {
      onCreatePost();
    } else {
      router.push('/blogs/create');
    }
  };
  
  // Get sort label
  const getSortLabel = (sortBy: SortOption) => {
    switch (sortBy) {
      case 'latest':
        return 'Latest';
      case 'popular':
        return 'Most Popular';
      case 'trending':
        return 'Trending';
      default:
        return 'Sort By';
    }
  };
  
  // Responsive grid columns
  const getGridColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return viewMode === 'grid' ? 2 : 1;
    return viewMode === 'grid' ? 3 : 1;
  };
  
  return (
    <Box>
      {/* Header with title and create button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          {selectedTag ? `#${selectedTag}` : 'Latest Articles'}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreatePost}
          size={isMobile ? 'small' : 'medium'}
        >
          {isMobile ? 'Create' : 'Create Post'}
        </Button>
      </Box>
      
      {/* Search and filter bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Search */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search articles..."
              value={searchValue}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size={isMobile ? 'small' : 'medium'}
            />
          </Grid>
          
          {/* Sort and View Toggles */}
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="flex-end" flexWrap="wrap" gap={1}>
              {/* View Mode Toggle */}
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewModeChange}
                aria-label="view mode"
                size={isMobile ? 'small' : 'medium'}
              >
                <ToggleButton value="grid" aria-label="grid view">
                  <ViewModuleIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton value="list" aria-label="list view">
                  <ViewListIcon fontSize="small" />
                </ToggleButton>
              </ToggleButtonGroup>
              
              {/* Sort Dropdown */}
              <Button
                variant="outlined"
                startIcon={<SortIcon />}
                onClick={handleSortClick}
                size={isMobile ? 'small' : 'medium'}
                sx={{ ml: 1 }}
              >
                {getSortLabel(sortBy)}
              </Button>
              <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={handleSortClose}
              >
                <MenuItem onClick={() => handleSortSelect('latest')}>
                  <ListItemText primary="Latest" />
                  {sortBy === 'latest' && <ListItemIcon>✓</ListItemIcon>}
                </MenuItem>
                <MenuItem onClick={() => handleSortSelect('popular')}>
                  <ListItemText primary="Most Popular" />
                  {sortBy === 'popular' && <ListItemIcon>✓</ListItemIcon>}
                </MenuItem>
                <MenuItem onClick={() => handleSortSelect('trending')}>
                  <ListItemText primary="Trending" />
                  {sortBy === 'trending' && <ListItemIcon>✓</ListItemIcon>}
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
          
          {/* Categories */}
          <Grid item xs={12}>
            <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
              <Chip
                label="All"
                onClick={() => handleCategoryChange('all')}
                color={selectedCategory === 'all' ? 'primary' : 'default'}
                variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
                clickable
              />
              {categories.map((category) => (
                <Chip
                  key={category.slug}
                  label={`${category.name} (${category.postCount})`}
                  onClick={() => handleCategoryChange(category.slug)}
                  color={selectedCategory === category.slug ? 'primary' : 'default'}
                  variant={selectedCategory === category.slug ? 'filled' : 'outlined'}
                  clickable
                />
              ))}
            </Box>
          </Grid>
          
          {/* Selected Tag */}
          {selectedTag && (
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle2" sx={{ mr: 1 }}>
                  Filtering by tag:
                </Typography>
                <Chip
                  label={`#${selectedTag}`}
                  onDelete={() => router.push('/blogs')}
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
      
      {/* Loading State */}
      {isLoading && posts.length === 0 ? (
        <Box display="flex" justifyContent="center" my={8}>
          <CircularProgress />
        </Box>
      ) : null}
      
      {/* No Results */}
      {!isLoading && posts.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No articles found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {searchValue || selectedCategory !== 'all' || selectedTag
              ? 'Try adjusting your search or filter criteria.'
              : 'There are no published articles yet.'}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreatePost}
            sx={{ mt: 2 }}
          >
            Create Your First Post
          </Button>
        </Paper>
      ) : null}
      
      {/* Blog Posts Grid/List */}
      {posts.length > 0 && (
        <>
          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid 
                item 
                xs={12} 
                sm={viewMode === 'list' ? 12 : 6} 
                md={viewMode === 'list' ? 12 : 4} 
                key={post.id}
              >
                <BlogCard 
                  post={post} 
                  variant={viewMode === 'list' ? 'horizontal' : 'vertical'}
                  onLike={(postId) => console.log('Like post:', postId)}
                  onBookmark={(postId) => console.log('Bookmark post:', postId)}
                  onShare={(postId) => console.log('Share post:', postId)}
                />
              </Grid>
            ))}
          </Grid>
          
          {/* Load More Button */}
          {hasMore && (
            <Box display="flex" justifyContent="center" mt={6}>
              <Button
                variant="outlined"
                onClick={onLoadMore}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? 'Loading...' : 'Load More Articles'}
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default BlogsList;
