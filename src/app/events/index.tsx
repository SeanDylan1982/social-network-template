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
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
} from '@mui/icons-material';
import EventCard from '@/components/events/EventCard';
import EventsFilterMenu from '@/components/events/EventsFilterMenu';
import EventsSortMenu from '@/components/events/EventsSortMenu';
import { Event } from '@/types/event';

// Mock data - replace with real API calls
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2023',
    description: 'Annual technology conference featuring the latest in web development, AI, and more.',
    image: '/images/events/tech-conference.jpg',
    date: '2023-12-15',
    time: '09:00',
    location: 'San Francisco, CA',
    category: 'Technology',
    isOnline: false,
    isFree: false,
    price: 199,
    capacity: 500,
    attendees: 342,
    isInterested: true,
    isSaved: true,
    organizer: {
      id: 'org1',
      name: 'Tech Events Inc.',
      avatar: '/images/avatars/org1.jpg',
    },
  },
  // Add more mock events...
];

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: 'lg',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
  '& .hero-section': {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[4],
    overflow: 'hidden',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
      zIndex: 1,
    },
    '& .hero-content': {
      position: 'relative',
      zIndex: 2,
      padding: theme.spacing(6, 4),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(4, 3),
      },
    },
  },
  '& .filters-section': {
    display: 'flex',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
    marginBottom: theme.spacing(4),
    '& .MuiTextField-root': {
      flex: 1,
      minWidth: 200,
    },
  },
  '& .events-grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  '& .event-card': {
    transition: theme.transitions.create(['box-shadow', 'transform']),
    '&:hover': {
      boxShadow: theme.shadows[6],
      transform: 'translateY(-4px)',
    },
  },
}));

const StyledEventDate = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    fontSize: '1.25rem',
  },
  '& .MuiTypography-body1': {
    fontWeight: 600,
    fontSize: '1.125rem',
  },
}));

const StyledEventCard = styled(Card)(({ theme }) => ({
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
  '& .event-header': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '& .MuiTypography-h5': {
      fontWeight: 600,
      lineHeight: 1.4,
    },
    '& .MuiAvatar-root': {
      width: 64,
      height: 64,
      border: `2px solid ${theme.palette.background.paper}`,
    },
  },
  '& .event-stats': {
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
  },
  '& .event-actions': {
    display: 'flex',
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(2),
    '& .MuiButton-root': {
      textTransform: 'none',
      fontSize: '0.9375rem',
      fontWeight: 500,
      padding: theme.spacing(0.75, 2),
      borderRadius: theme.shape.borderRadius,
      '&.primary': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
      '&.outlined': {
        borderColor: theme.palette.divider,
        '&:hover': {
          borderColor: theme.palette.primary.main,
        },
      },
    },
  },
}));

const EventsPage: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    category: '',
    price: 'all',
    date: 'all',
    type: 'all',
  });

  // Fetch events (simulated)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEvents(mockEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  // Handle view mode toggle
  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newViewMode: 'grid' | 'list' | null,
  ) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  // Handle event interest toggle
  const handleInterestToggle = (eventId: string) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, isInterested: !event.isInterested }
          : event
      )
    );
  };

  // Handle save event toggle
  const handleSaveToggle = (eventId: string) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId ? { ...event, isSaved: !event.isSaved } : event
      )
    );
  };

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    // Search filter
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      filters.category === '' || event.category === filters.category;

    // Price filter
    const matchesPrice =
      filters.price === 'all' ||
      (filters.price === 'free' && event.isFree) ||
      (filters.price === 'paid' && !event.isFree);

    // Date filter (simplified for example)
    const matchesDate = true; // Implement date filtering logic

    // Type filter
    const matchesType =
      filters.type === 'all' ||
      (filters.type === 'online' && event.isOnline) ||
      (filters.type === 'inPerson' && !event.isOnline);

    return matchesSearch && matchesCategory && matchesPrice && matchesDate && matchesType;
  });

  return (
    <StyledContainer>
      <Head>
        <title>Events | Social Network</title>
        <meta name="description" content="Discover and join events in your area" />
      </Head>

      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Hero Section */}
        <Box className="hero-section">
          <Box className="hero-content">
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Discover Events
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Find and join events that match your interests
            </Typography>
            
            {/* Search Bar */}
            <Paper
              component="form"
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: 700,
                bgcolor: 'background.paper',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: theme.shadows[4],
              }}
            >
              <InputAdornment position="start" sx={{ ml: 2, color: 'text.secondary' }}>
                <SearchIcon />
              </InputAdornment>
              <TextField
                fullWidth
                variant="standard"
                placeholder="Search for events..."
                InputProps={{
                  disableUnderline: true,
                  sx: { p: 1, fontSize: '1rem' },
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  borderRadius: 0,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: 'none',
                  },
                }}
              >
                Search
              </Button>
            </Paper>
          </Box>
        </Box>

        <Box className="filters-section">
          <EventsFilterMenu
            filters={filters}
            onFilterChange={(newFilters) => setFilters(newFilters)}
          />
          <EventsSortMenu />
        </Box>

        {/* Events Grid/List */}
        {loading ? (
          <Grid container spacing={3} className="events-grid">
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={viewMode === 'grid' ? 4 : 12} key={index}>
                <Card>
                  <Skeleton variant="rectangular" height={140} />
                  <CardContent>
                    <Skeleton variant="text" width="80%" height={24} />
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton variant="text" width="40%" height={20} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : filteredEvents.length > 0 ? (
          <Grid container spacing={3} className="events-grid">
            {filteredEvents.map((event) => (
              <Grid item xs={12} sm={6} md={viewMode === 'grid' ? 4 : 12} key={event.id}>
                <StyledEventCard>
                  <CardMedia
                    component="img"
                    image={event.image}
                    alt={event.title}
                  />
                  <CardContent>
                    <Box className="event-header">
                      <Avatar src={event.organizer.avatar} />
                      <Typography variant="h5" component="h2">
                        {event.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" component="p">
                      {event.description}
                    </Typography>
                    <StyledEventDate>
                      <SearchIcon />
                      <Typography variant="body1">
                        {event.date} {event.time}
                      </Typography>
                    </StyledEventDate>
                    <Box className="event-stats">
                      <Box className="stat-item">
                        <PersonIcon />
                        <Typography variant="body1" className="stat-value">
                          {event.attendees}
                        </Typography>
                        <Typography variant="body2" className="stat-label">
                          Attendees
                        </Typography>
                      </Box>
                      <Box className="stat-item">
                        <LocationOnIcon />
                        <Typography variant="body1" className="stat-value">
                          {event.location}
                        </Typography>
                        <Typography variant="body2" className="stat-label">
                          Location
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="event-actions">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleInterestToggle(event.id)}
                      >
                        {event.isInterested ? 'Uninterested' : 'Interested'}
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSaveToggle(event.id)}
                      >
                        {event.isSaved ? 'Unsave' : 'Save'}
                      </Button>
                    </Box>
                  </CardContent>
                </StyledEventCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={8}
            textAlign="center"
          >
            <Box
              component="img"
              src="/images/no-events.svg"
              alt="No events found"
              sx={{ width: 200, height: 200, mb: 3, opacity: 0.7 }}
            />
            <Typography variant="h6" gutterBottom>
              No events found
            </Typography>
            <Typography variant="body1" color="text.secondary" maxWidth={400} mb={3}>
              We couldn't find any events matching your search. Try adjusting your filters or create a new event.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => router.push('/events/create')}
              size="large"
              sx={{ borderRadius: 2, textTransform: 'none', px: 4, fontWeight: 600 }}
            >
              Create Event
            </Button>
          </Box>
        )}
      </Box>

      {/* Create Event FAB */}
      {!isMobile && (
        <Fab
          color="primary"
          aria-label="Create event"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            width: 56,
            height: 56,
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: theme.shadows[8],
            },
          }}
          onClick={() => router.push('/events/create')}
        >
          <AddIcon />
        </Fab>
      )}
    </StyledContainer>
  );
};

export default EventsPage;
