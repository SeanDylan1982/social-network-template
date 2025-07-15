import React, { useState } from 'react';
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
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Group, GroupCategory } from '@/types/group';
import GroupCard from './GroupCard';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import { useRouter } from 'next/router';

interface GroupsListProps {
  groups: Group[];
  categories: GroupCategory[];
  onJoinGroup: (groupId: string) => void;
  onCreateGroup: () => void;
  onSearch: (query: string) => void;
  onCategoryChange: (category: string | null) => void;
  onFilterChange: (filter: string) => void;
  loading?: boolean;
  currentCategory?: string;
  currentFilter?: string;
}\n
const GroupsList: React.FC<GroupsListProps> = ({
  groups,
  categories,
  onJoinGroup,
  onCreateGroup,
  onSearch,
  onCategoryChange,
  onFilterChange,
  loading = false,
  currentCategory = 'all',
  currentFilter = 'all',
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(currentCategory);
  const [selectedFilter, setSelectedFilter] = useState<string>(currentFilter);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category === 'all' ? null : category);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
    handleFilterClose();
  };

  const handleViewGroup = (groupId: string) => {
    router.push(`/groups/${groupId}`);
  };

  const filterOptions = [
    { value: 'all', label: 'All Groups', icon: <GroupWorkIcon /> },
    { value: 'public', label: 'Public', icon: <PublicIcon /> },
    { value: 'private', label: 'Private', icon: <LockIcon /> },
    { value: 'member', label: 'My Groups', icon: <GroupAddIcon /> },
  ];

  return (
    <Box>
      {/* Header with title and create button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Groups
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onCreateGroup}
        >
          Create Group
        </Button>
      </Box>

      {/* Search and filter bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="flex-end">
              <ToggleButtonGroup
                value={selectedCategory}
                exclusive
                onChange={(_, value) => handleCategoryChange(value)}
                aria-label="group categories"
                sx={{ mr: 2 }}
              >
                <ToggleButton value="all" aria-label="all categories">
                  All
                </ToggleButton>
                {categories.map((category) => (
                  <ToggleButton 
                    key={category.id} 
                    value={category.id}
                    sx={{ textTransform: 'none' }}
                  >
                    {category.name}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              
              <IconButton
                aria-label="filter"
                aria-controls="filter-menu"
                aria-haspopup="true"
                onClick={handleFilterClick}
                color={selectedFilter !== 'all' ? 'primary' : 'default'}
              >
                <FilterListIcon />
              </IconButton>
              <Menu
                id="filter-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleFilterClose}
              >
                {filterOptions.map((option) => (
                  <MenuItem 
                    key={option.value} 
                    onClick={() => handleFilterSelect(option.value)}
                    selected={selectedFilter === option.value}
                  >
                    <ListItemIcon>
                      {option.icon}
                    </ListItemIcon>
                    <ListItemText primary={option.label} />
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Groups grid */}
      {loading ? (
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <GroupCard 
                group={{
                  id: '',
                  name: 'Loading...',
                  description: '',
                  coverImage: '',
                  avatar: '',
                  membersCount: 0,
                  postsCount: 0,
                  eventsCount: 0,
                  isPrivate: false,
                  isMember: false,
                  isAdmin: false,
                  category: 'Loading...',
                  createdAt: '',
                  updatedAt: ''
                }} 
                onView={handleViewGroup}
              />
            </Grid>
          ))}
        </Grid>
      ) : groups.length > 0 ? (
        <Grid container spacing={3}>
          {groups.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.id}>
              <GroupCard 
                group={group} 
                onJoin={onJoinGroup}
                onView={handleViewGroup}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No groups found
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {searchQuery 
              ? 'Try adjusting your search or filter criteria.'
              : 'There are no groups to display at the moment.'}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<AddIcon />}
            onClick={onCreateGroup}
            sx={{ mt: 2 }}
          >
            Create a New Group
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default GroupsList;
