import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  useTheme,
} from '@mui/material';
import { FilterList as FilterListIcon, Close as CloseIcon } from '@mui/icons-material';

interface EventsFilterMenuProps {
  filters: {
    category: string;
    price: string;
    date: string;
    type: string;
  };
  onFilterChange: (filters: {
    category: string;
    price: string;
    date: string;
    type: string;
  }) => void;
}

const EventsFilterMenu: React.FC<EventsFilterMenuProps> = ({ filters, onFilterChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [localFilters, setLocalFilters] = useState(filters);
  const theme = useTheme();
  
  const categories = [
    'Technology',
    'Business',
    'Science',
    'Health',
    'Entertainment',
    'Sports',
    'Education',
    'Other',
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    // Reset local filters to current applied filters when opening the menu
    setLocalFilters(filters);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApply = () => {
    onFilterChange(localFilters);
    handleClose();
  };

  const handleReset = () => {
    const resetFilters = {
      category: '',
      price: 'all',
      date: 'all',
      type: 'all',
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
    handleClose();
  };

  const isFilterActive = 
    filters.category !== '' || 
    filters.price !== 'all' || 
    filters.date !== 'all' || 
    filters.type !== 'all';

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<FilterListIcon />}
        onClick={handleClick}
        sx={{
          textTransform: 'none',
          borderRadius: 2,
          px: 2,
          borderColor: isFilterActive ? theme.palette.primary.main : 'divider',
          backgroundColor: isFilterActive ? theme.palette.primary.light + '1a' : 'transparent',
          '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light + '1a',
          },
        }}
      >
        Filters
        {isFilterActive && (
          <Box
            component="span"
            sx={{
              ml: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 20,
              height: 20,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontSize: '0.7rem',
              fontWeight: 600,
            }}
          >
            {[filters.category, filters.price, filters.date, filters.type].filter(Boolean).length - 1}
          </Box>
        )}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            width: 320,
            maxWidth: '100%',
            p: 2,
            borderRadius: 2,
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle1" fontWeight={600}>
            Filters
          </Typography>
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        
        <Box mb={3}>
          <Typography variant="subtitle2" gutterBottom>
            Category
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                clickable
                variant={localFilters.category === category ? 'filled' : 'outlined'}
                color={localFilters.category === category ? 'primary' : 'default'}
                onClick={() =>
                  setLocalFilters({
                    ...localFilters,
                    category: localFilters.category === category ? '' : category,
                  })
                }
                size="small"
                sx={{
                  borderRadius: 1,
                  '&.MuiChip-filled': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.main',
                    },
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle2" gutterBottom>
            Price
          </Typography>
          <ToggleButtonGroup
            value={localFilters.price}
            exclusive
            onChange={(e, value) =>
              value !== null &&
              setLocalFilters({ ...localFilters, price: value })
            }
            fullWidth
            size="small"
            sx={{
              '& .MuiToggleButtonGroup-grouped': {
                textTransform: 'none',
                '&:not(:first-of-type)': {
                  borderLeft: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                },
                '&:first-of-type': {
                  borderRadius: 1,
                },
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.main',
                  },
                },
              },
            }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="free">Free</ToggleButton>
            <ToggleButton value="paid">Paid</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle2" gutterBottom>
            Date
          </Typography>
          <ToggleButtonGroup
            value={localFilters.date}
            exclusive
            onChange={(e, value) =>
              value !== null &&
              setLocalFilters({ ...localFilters, date: value })
            }
            fullWidth
            size="small"
            sx={{
              '& .MuiToggleButtonGroup-grouped': {
                textTransform: 'none',
                '&:not(:first-of-type)': {
                  borderLeft: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                },
                '&:first-of-type': {
                  borderRadius: 1,
                },
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.main',
                  },
                },
              },
            }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="today">Today</ToggleButton>
            <ToggleButton value="upcoming">Upcoming</ToggleButton>
            <ToggleButton value="past">Past</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle2" gutterBottom>
            Event Type
          </Typography>
          <ToggleButtonGroup
            value={localFilters.type}
            exclusive
            onChange={(e, value) =>
              value !== null &&
              setLocalFilters({ ...localFilters, type: value })
            }
            fullWidth
            size="small"
            sx={{
              '& .MuiToggleButtonGroup-grouped': {
                textTransform: 'none',
                '&:not(:first-of-type)': {
                  borderLeft: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                },
                '&:first-of-type': {
                  borderRadius: 1,
                },
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.main',
                  },
                },
              },
            }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="online">Online</ToggleButton>
            <ToggleButton value="inPerson">In Person</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleReset}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 2,
              borderColor: 'divider',
              '&:hover': {
                borderColor: 'text.primary',
              },
            }}
          >
            Reset All
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleApply}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
              '&:hover': {
                boxShadow: theme.shadows[2],
              },
            }}
          >
            Apply Filters
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default EventsFilterMenu;
