import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { format, parseISO, isPast } from 'date-fns';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  IconButton,
  Avatar,
  Divider,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Skeleton,
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  MoreVert as MoreVertIcon,
  People as PeopleIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Share as ShareIcon,
  Report as ReportIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Public as OnlineIcon,
  PublicOff as OfflineIcon,
} from '@mui/icons-material';
import { Event } from '@/types/event';

interface EventCardProps {
  event: Event;
  onInterestToggle: (id: string) => void;
  onSaveToggle: (id: string) => void;
  viewMode: 'grid' | 'list';
  loading?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onInterestToggle, 
  onSaveToggle,
  viewMode,
  loading = false
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCardClick = () => {
    if (!loading) {
      router.push(`/events/${event.id}`);
    }
  };

  const handleInterestClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onInterestToggle(event.id);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveToggle(event.id);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement share functionality
    console.log('Sharing event:', event.id);
    handleClose();
  };

  const handleReportClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement report functionality
    console.log('Reporting event:', event.id);
    handleClose();
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/events/${event.id}/edit`);
    handleClose();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement delete functionality with confirmation
    console.log('Deleting event:', event.id);
    handleClose();
  };

  const eventDate = parseISO(event.date);
  const isPastEvent = isPast(eventDate);

  if (loading) {
    return (
      <Card>
        <Skeleton variant="rectangular" height={140} />
        <CardContent>
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="40%" height={20} />
        </CardContent>
      </Card>
    );
  }

  if (viewMode === 'list') {
    return (
      <Card 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          overflow: 'hidden',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
          },
          cursor: 'pointer',
        }}
        onClick={handleCardClick}
      >
        <Box 
          sx={{ 
            width: { xs: '100%', sm: 200 },
            height: { xs: 160, sm: 'auto' },
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <CardMedia
            component="img"
            image={event.image || '/images/event-placeholder.jpg'}
            alt={event.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {event.isOnline && (
            <Chip
              label="Online"
              color="primary"
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 500,
              }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent sx={{ flex: '1 0 auto', p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
              <Typography 
                variant="h6" 
                component="h3"
                sx={{
                  fontWeight: 600,
                  WebkitLineClamp: 2,
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {event.title}
              </Typography>
              
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(e);
                }}
                sx={{ ml: 1 }}
              >
                <MoreVertIcon />
              </IconButton>
            </Box>

            <Box display="flex" alignItems="center" mb={1.5} flexWrap="wrap" gap={1.5}>
              <Chip
                label={event.category}
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  color: 'text.secondary',
                  fontSize: '0.7rem',
                  height: 24,
                }}
              />
              
              {!event.isFree && (
                <Chip
                  label={`$${event.price}`}
                  size="small"
                  color="secondary"
                  sx={{
                    borderRadius: 1,
                    fontWeight: 600,
                    height: 24,
                  }}
                />
              )}
              
              <Box display="flex" alignItems="center" ml="auto">
                <PeopleIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {event.attendees}/{event.capacity}
                </Typography>
              </Box>
            </Box>

            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                mb: 2,
                WebkitLineClamp: 2,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {event.description}
            </Typography>

            <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5} mt="auto">
              <Box display="flex" alignItems="center" mr={2}>
                <CalendarIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {format(eventDate, 'MMM d, yyyy')} • {event.time}
                </Typography>
              </Box>
              
              <Box display="flex" alignItems="center">
                <LocationIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary" noWrap>
                  {event.location}
                </Typography>
              </Box>
            </Box>
          </CardContent>

          <Divider />
          
          <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box display="flex" alignItems="center">
              <Button
                size="small"
                startIcon={
                  event.isInterested ? (
                    <StarIcon color="primary" />
                  ) : (
                    <StarBorderIcon />
                  )
                }
                onClick={handleInterestClick}
                sx={{
                  textTransform: 'none',
                  fontWeight: event.isInterested ? 600 : 400,
                  color: event.isInterested ? 'primary.main' : 'text.secondary',
                }}
              >
                {event.isInterested ? 'Interested' : 'Interested'}
              </Button>
              
              <Button
                size="small"
                startIcon={
                  event.isSaved ? (
                    <BookmarkIcon color="primary" />
                  ) : (
                    <BookmarkBorderIcon />
                  )
                }
                onClick={handleSaveClick}
                sx={{
                  textTransform: 'none',
                  color: event.isSaved ? 'primary.main' : 'text.secondary',
                  ml: 1,
                }}
              >
                {event.isSaved ? 'Saved' : 'Save'}
              </Button>
            </Box>
            
            <Button
              variant="contained"
              size="small"
              color={isPastEvent ? 'inherit' : 'primary'}
              disabled={isPastEvent}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 2,
                py: 0.5,
                fontWeight: 500,
                '&:hover': {
                  boxShadow: theme.shadows[2],
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                // Handle register/join action
              }}
            >
              {isPastEvent ? 'Event Ended' : 'Register Now'}
            </Button>
          </Box>
        </Box>

        {/* More options menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={(e) => e.stopPropagation()}
          PaperProps={{
            elevation: 3,
            sx: {
              minWidth: 180,
              borderRadius: 2,
              overflow: 'hidden',
              '& .MuiMenuItem-root': {
                fontSize: '0.9rem',
              },
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
          <MenuItem onClick={handleShareClick}>
            <ShareIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
            Share
          </MenuItem>
          <MenuItem onClick={handleReportClick}>
            <ReportIcon fontSize="small" sx={{ mr: 1.5, color: 'error.main' }} />
            <Typography color="error">Report</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleEditClick}>
            <EditIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
            Edit Event
          </MenuItem>
          <MenuItem onClick={handleDeleteClick}>
            <DeleteIcon fontSize="small" sx={{ mr: 1.5, color: 'error.main' }} />
            <Typography color="error">Delete Event</Typography>
          </MenuItem>
        </Menu>
      </Card>
    );
  }

  // Grid View
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
        cursor: 'pointer',
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ position: 'relative', pt: '56.25%' }}>
        <CardMedia
          component="img"
          image={event.image || '/images/event-placeholder.jpg'}
          alt={event.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        
        {event.isOnline && (
          <Chip
            label="Online"
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontWeight: 500,
            }}
          />
        )}
        
        <IconButton
          aria-label="more"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleClick(e);
          }}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        >
          <MoreVertIcon />
        </IconButton>
        
        {!event.isFree && (
          <Chip
            label={`$${event.price}`}
            color="secondary"
            size="small"
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              fontWeight: 600,
            }}
          />
        )}
      </Box>
      
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography 
            variant="subtitle1" 
            component="h3"
            sx={{
              fontWeight: 600,
              WebkitLineClamp: 2,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              pr: 1,
            }}
          >
            {event.title}
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" mb={1.5}>
          <Chip
            label={event.category}
            size="small"
            variant="outlined"
            sx={{
              borderRadius: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              color: 'text.secondary',
              fontSize: '0.65rem',
              height: 22,
            }}
          />
        </Box>
        
        <Box display="flex" alignItems="center" mb={1.5} color="text.secondary">
          <CalendarIcon fontSize="small" sx={{ mr: 1, fontSize: '1rem' }} />
          <Typography variant="body2" noWrap>
            {format(eventDate, 'MMM d, yyyy')} • {event.time}
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" mb={2} color="text.secondary">
          {event.isOnline ? (
            <OnlineIcon fontSize="small" sx={{ mr: 1, fontSize: '1rem' }} />
          ) : (
            <LocationIcon fontSize="small" sx={{ mr: 1, fontSize: '1rem' }} />
          )}
          <Typography 
            variant="body2" 
            sx={{
              WebkitLineClamp: 1,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {event.location}
          </Typography>
        </Box>
        
        <Box mt="auto" pt={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
            <Box display="flex" alignItems="center">
              <PeopleIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {event.attendees}/{event.capacity}
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center">
              <IconButton 
                size="small" 
                onClick={handleSaveClick}
                color={event.isSaved ? 'primary' : 'default'}
                sx={{
                  '&:hover': {
                    bgcolor: 'transparent',
                    '& .MuiSvgIcon-root': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                {event.isSaved ? (
                  <BookmarkIcon fontSize="small" />
                ) : (
                  <BookmarkBorderIcon fontSize="small" />
                )}
              </IconButton>
              
              <IconButton 
                size="small" 
                onClick={handleInterestClick}
                color={event.isInterested ? 'primary' : 'default'}
                sx={{
                  '&:hover': {
                    bgcolor: 'transparent',
                    '& .MuiSvgIcon-root': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                {event.isInterested ? (
                  <StarIcon fontSize="small" />
                ) : (
                  <StarBorderIcon fontSize="small" />
                )}
              </IconButton>
            </Box>
          </Box>
          
          <Button
            fullWidth
            variant="contained"
            color={isPastEvent ? 'inherit' : 'primary'}
            disabled={isPastEvent}
            size="small"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              py: 0.75,
              '&:hover': {
                boxShadow: theme.shadows[2],
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle register/join action
            }}
          >
            {isPastEvent ? 'Event Ended' : 'Register Now'}
          </Button>
        </Box>
      </CardContent>
      
      {/* More options menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 180,
            borderRadius: 2,
            overflow: 'hidden',
            '& .MuiMenuItem-root': {
              fontSize: '0.9rem',
            },
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
        <MenuItem onClick={handleShareClick}>
          <ShareIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
          Share
        </MenuItem>
        <MenuItem onClick={handleReportClick}>
          <ReportIcon fontSize="small" sx={{ mr: 1.5, color: 'error.main' }} />
          <Typography color="error">Report</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleEditClick}>
          <EditIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
          Edit Event
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <DeleteIcon fontSize="small" sx={{ mr: 1.5, color: 'error.main' }} />
          <Typography color="error">Delete Event</Typography>
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default EventCard;
