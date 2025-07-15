import { useState } from 'react';
import { GroupEvent } from '@/types/group';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Avatar,
  Badge,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Event as EventIcon,
  LocationOn as LocationOnIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  People as PeopleIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material';

interface EventsTabProps {
  events: GroupEvent[];
  isMember: boolean;
  groupId: string;
}

const EventsTab: React.FC<EventsTabProps> = ({ events, isMember, groupId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<GroupEvent | null>(null);
  const [savedEvents, setSavedEvents] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, eventItem: GroupEvent) => {
    setAnchorEl(event.currentTarget);
    setSelectedEvent(eventItem);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEvent(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const toggleSaveEvent = (eventId: string) => {
    setSavedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const filteredEvents = events.filter(event => {
    // Filter by search query
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by time
    const now = new Date();
    const eventDate = new Date(`${event.date}T${event.time || '00:00'}`);
    const isUpcoming = eventDate > now;
    
    if (filter === 'upcoming') {
      return matchesSearch && isUpcoming;
    } else if (filter === 'past') {
      return matchesSearch && !isUpcoming;
    }
    
    return matchesSearch; // 'all' filter
  });

  const formatEventDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatEventTime = (timeString: string) => {
    if (!timeString) return '';
    
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12; // Convert 0 or 24 to 12
    
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const handleShareEvent = (eventId: string) => {
    // In a real app, this would open a share dialog
    console.log(`Share event: ${eventId}`);
    handleMenuClose();
  };

  const handleEditEvent = (eventId: string) => {
    // In a real app, this would open an edit dialog
    console.log(`Edit event: ${eventId}`);
    handleMenuClose();
  };

  const handleDeleteEvent = (eventId: string) => {
    // In a real app, this would delete the event
    console.log(`Delete event: ${eventId}`);
    handleMenuClose();
  };

  const handleRSVP = (eventId: string, status: 'going' | 'interested' | 'not_going') => {
    // In a real app, this would update the RSVP status
    console.log(`RSVP ${status} for event: ${eventId}`);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h6" component="h2">
          {filter === 'upcoming' ? 'Upcoming Events' : filter === 'past' ? 'Past Events' : 'All Events'}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: 'auto' }, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Search events..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: { xs: 1, sm: 0 }, minWidth: 200 }}
          />
          
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setFilter(filter === 'upcoming' ? 'past' : filter === 'past' ? 'all' : 'upcoming')}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {filter === 'upcoming' ? 'Upcoming' : filter === 'past' ? 'Past' : 'All'}
          </Button>
          
          {isMember && (
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Create Event
            </Button>
          )}
        </Box>
      </Box>
      
      {filteredEvents.length > 0 ? (
        <Grid container spacing={3}>
          {filteredEvents.map((event) => {
            const eventDate = new Date(`${event.date}T${event.time || '00:00'}`);
            const isUpcoming = eventDate > new Date();
            
            return (
              <Grid item xs={12} md={6} lg={4} key={event.id}>
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
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={event.image || '/images/events/placeholder.jpg'}
                      alt={event.title}
                    />
                    <Box 
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        p: 1,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Chip 
                        label={isUpcoming ? 'Upcoming' : 'Past'} 
                        size="small" 
                        color={isUpcoming ? 'primary' : 'default'}
                        sx={{ color: 'white', backgroundColor: isUpcoming ? 'primary.main' : 'rgba(0, 0, 0, 0.6)' }}
                      />
                      <IconButton 
                        size="small" 
                        onClick={() => toggleSaveEvent(event.id)}
                        sx={{ color: 'white' }}
                      >
                        {savedEvents.has(event.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }} noWrap>
                        {event.title}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleMenuOpen(e, event)}
                        sx={{ ml: 1 }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                    
                    <List dense disablePadding sx={{ mb: 2 }}>
                      <ListItem disableGutters sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CalendarIcon color="action" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={formatEventDate(event.date)}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                      
                      {event.time && (
                        <ListItem disableGutters sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <TimeIcon color="action" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={formatEventTime(event.time)}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      )}
                      
                      {event.location && (
                        <ListItem disableGutters sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <LocationOnIcon color="action" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={event.location}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      )}
                      
                      <ListItem disableGutters sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <PeopleIcon color="action" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={`${event.attendees || 0} ${event.attendees === 1 ? 'person' : 'people'} attending`}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    </List>
                    
                    <Box sx={{ mt: 'auto', pt: 1 }}>
                      {isUpcoming ? (
                        <Stack direction="row" spacing={1}>
                          <Button 
                            variant="contained" 
                            size="small" 
                            fullWidth
                            onClick={() => handleRSVP(event.id, 'going')}
                          >
                            Going
                          </Button>
                          <Button 
                            variant="outlined" 
                            size="small" 
                            fullWidth
                            onClick={() => handleRSVP(event.id, 'interested')}
                          >
                            Interested
                          </Button>
                        </Stack>
                      ) : (
                        <Button 
                          variant="outlined" 
                          size="small" 
                          fullWidth
                          disabled
                        >
                          Event Ended
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Box sx={{ color: 'text.secondary', mb: 2, '& svg': { fontSize: 60 } }}>
            <EventIcon fontSize="inherit" />
          </Box>
          <Typography variant="h6" gutterBottom>
            No events found
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {searchQuery 
              ? 'No events match your search. Try a different term.' 
              : filter === 'upcoming'
                ? 'There are no upcoming events scheduled.'
                : 'There are no past events.'}
          </Typography>
          {isMember && (
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
            >
              Create Event
            </Button>
          )}
        </Paper>
      )}
      
      {/* Event Menu */}
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
        <MenuItem onClick={() => selectedEvent && handleShareEvent(selectedEvent.id)}>
          <ShareIcon sx={{ mr: 1 }} /> Share Event
        </MenuItem>
        <MenuItem 
          onClick={() => selectedEvent && toggleSaveEvent(selectedEvent.id)}
        >
          {selectedEvent && savedEvents.has(selectedEvent.id) ? (
            <>
              <BookmarkIcon sx={{ mr: 1 }} /> Remove from Saved
            </>
          ) : (
            <>
              <BookmarkBorderIcon sx={{ mr: 1 }} /> Save Event
            </>
          )}
        </MenuItem>
        
        {isMember && (
          <>
            <Divider />
            <MenuItem 
              onClick={() => selectedEvent && handleEditEvent(selectedEvent.id)}
            >
              <EditIcon sx={{ mr: 1 }} /> Edit Event
            </MenuItem>
            <MenuItem 
              onClick={() => selectedEvent && handleDeleteEvent(selectedEvent.id)}
              sx={{ color: 'error.main' }}
            >
              <DeleteIcon sx={{ mr: 1 }} /> Delete Event
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default EventsTab;
