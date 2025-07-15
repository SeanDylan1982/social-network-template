import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  useTheme,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Sort as SortIcon, Check as CheckIcon } from '@mui/icons-material';

interface EventsSortMenuProps {
  sortBy?: string;
  onSortChange?: (sortBy: string) => void;
}

const sortOptions = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'newest', label: 'Newest First' },
  { value: 'date-asc', label: 'Date: Soonest' },
  { value: 'date-desc', label: 'Date: Latest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popularity', label: 'Most Popular' },
];

const EventsSortMenu: React.FC<EventsSortMenuProps> = ({ 
  sortBy: propSortBy = 'relevance',
  onSortChange 
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortBy, setSortBy] = useState(propSortBy);
  const theme = useTheme();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    if (onSortChange) {
      onSortChange(value);
    }
    handleClose();
  };

  const getSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : 'Sort';
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<SortIcon />}
        onClick={handleClick}
        sx={{
          textTransform: 'none',
          borderRadius: 2,
          px: 2,
          borderColor: sortBy !== 'relevance' ? theme.palette.primary.main : 'divider',
          backgroundColor: sortBy !== 'relevance' ? theme.palette.primary.light + '1a' : 'transparent',
          '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light + '1a',
          },
        }}
      >
        {getSortLabel()}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            width: 240,
            borderRadius: 2,
            overflow: 'hidden',
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Box px={2} py={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Sort by
          </Typography>
        </Box>
        <Divider />
        
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={sortBy === option.value}
            onClick={() => handleSortChange(option.value)}
            sx={{
              py: 1.5,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              '&.Mui-selected': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selected',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              {sortBy === option.value && <CheckIcon color="primary" fontSize="small" />}
            </ListItemIcon>
            <ListItemText
              primary={option.label}
              primaryTypographyProps={{
                variant: 'body2',
                color: sortBy === option.value ? 'primary.main' : 'text.primary',
                fontWeight: sortBy === option.value ? 600 : 400,
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default EventsSortMenu;
