import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Paper, 
  Divider, 
  Avatar, 
  Chip, 
  Tabs, 
  Tab, 
  useMediaQuery, 
  useTheme,
  Breadcrumbs,
  Link,
  Stack,
  Badge
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon, 
  Share as ShareIcon, 
  BookmarkBorder as BookmarkBorderIcon,
  Bookmark as BookmarkIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  ChatBubbleOutline as ChatIcon,
  MoreVert as MoreVertIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { Event } from '@/types/event';
import EventDetailsTab from './EventDetailsTab';
import EventAttendeesTab from './EventAttendeesTab';
import EventDiscussionTab from './EventDiscussionTab';
import EventLocationTab from './EventLocationTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`event-tabpanel-${index}`}
      aria-labelledby={`event-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `event-tab-${index}`,
    'aria-controls': `event-tabpanel-${index}`,
  };
}

interface EventDetailsProps {
  event: Event;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [saved, setSaved] = useState(false);
  const [interested, setInterested] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState<null | HTMLElement>(null);
  const [showMoreMenu, setShowMoreMenu] = useState<null | HTMLElement>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSaveEvent = () => {
    setSaved(!saved);
  };

  const handleInterestToggle = () => {
    setInterested(!interested);
  };

  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
    setShowShareMenu(event.currentTarget);
  };

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setShowMoreMenu(event.currentTarget);
  };

  const handleCloseShareMenu = () => {
    setShowShareMenu(null);
  };

  const handleCloseMoreMenu = () => {
    setShowMoreMenu(null);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    handleCloseShareMenu();
    // Show success message
  };

  const handleReportEvent = () => {
    // Handle report event
    handleCloseMoreMenu();
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  // Mock attendees count - in a real app, this would come from the event data
  const attendeesCount = 124;
  const commentsCount = 28;

  return (
    <Box>
      {/* Header with back button and breadcrumbs */}
      <Box mb={3}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => router.back()}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link 
            color="inherit" 
            href="/events" 
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            Events
          </Link>
          <Typography color="text.primary">{event.title}</Typography>
        </Breadcrumbs>
      </Box>

      {/* Event header with image and basic info */}
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 3, 
          overflow: 'hidden',
          mb: 4,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box 
          sx={{
            position: 'relative',
            height: isMobile ? 200 : 400,
            bgcolor: 'grey.100',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={event.image || '/images/event-placeholder.jpg'}
            alt={event.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: 4,
              color: 'white',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Chip 
                  label={event.category} 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    mb: 1.5,
                  }} 
                />
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                  {event.title}
                </Typography>
                <Box display="flex" alignItems="center" flexWrap="wrap" gap={2} mb={2}>
                  <Box display="flex" alignItems="center">
                    <CalendarIcon fontSize="small" sx={{ mr: 0.5, opacity: 0.8 }} />
                    <Typography variant="body2">
                      {formatDate(event.startDate)}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <LocationIcon fontSize="small" sx={{ mr: 0.5, opacity: 0.8 }} />
                    <Typography variant="body2">
                      {event.location}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box display="flex" gap={1}>
                <IconButton 
                  onClick={handleSaveEvent}
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)',
                    },
                  }}
                >
                  {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
                <IconButton 
                  onClick={handleShareClick}
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)',
                    },
                  }}
                >
                  <ShareIcon />
                </IconButton>
                <IconButton 
                  onClick={handleMoreClick}
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)',
                    },
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box p={3}>
          <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={handleInterestToggle}
              sx={{
                borderRadius: 2,
                px: 4,
                textTransform: 'none',
                fontWeight: 600,
                bgcolor: interested ? theme.palette.success.main : 'primary.main',
                '&:hover': {
                  bgcolor: interested ? theme.palette.success.dark : 'primary.dark',
                },
              }}
            >
              {interested ? 'Interested' : 'I\'m Interested'}
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              sx={{
                borderRadius: 2,
                px: 4,
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Get Tickets
            </Button>
          </Box>

          <Box display="flex" flexWrap="wrap" gap={3}>
            <Box display="flex" alignItems="center">
              <PeopleIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                <strong>{attendeesCount}</strong> people going
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <ChatIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                <strong>{commentsCount}</strong> comments
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Main content with tabs */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="event details tabs"
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab label="Details" {...a11yProps(0)} />
            <Tab label="Location" {...a11yProps(1)} />
            <Tab 
              label={
                <Box display="flex" alignItems="center">
                  <span>Attendees</span>
                  {attendeesCount > 0 && (
                    <Chip 
                      label={attendeesCount} 
                      size="small" 
                      sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                    />
                  )}
                </Box>
              } 
              {...a11yProps(2)} 
            />
            <Tab 
              label={
                <Box display="flex" alignItems="center">
                  <span>Discussion</span>
                  {commentsCount > 0 && (
                    <Chip 
                      label={commentsCount} 
                      size="small" 
                      sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                    />
                  )}
                </Box>
              } 
              {...a11yProps(3)} 
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <EventDetailsTab event={event} />
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          <EventLocationTab event={event} />
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          <EventAttendeesTab event={event} />
        </TabPanel>
        
        <TabPanel value={value} index={3}>
          <EventDiscussionTab event={event} />
        </TabPanel>
      </Box>

      {/* Share menu */}
      <Menu
        anchorEl={showShareMenu}
        open={Boolean(showShareMenu)}
        onClose={handleCloseShareMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleCopyLink}>
          <ListItemIcon>
            <LinkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy Link</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCloseShareMenu}>
          <ListItemIcon>
            <FacebookIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText>Share on Facebook</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCloseShareMenu}>
          <ListItemIcon>
            <TwitterIcon fontSize="small" color="info" />
          </ListItemIcon>
          <ListItemText>Share on Twitter</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCloseShareMenu}>
          <ListItemIcon>
            <LinkedInIcon fontSize="small" color="info" />
          </ListItemIcon>
          <ListItemText>Share on LinkedIn</ListItemText>
        </MenuItem>
      </Menu>

      {/* More options menu */}
      <Menu
        anchorEl={showMoreMenu}
        open={Boolean(showMoreMenu)}
        onClose={handleCloseMoreMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleCloseMoreMenu}>
          <ListItemText>Add to calendar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCloseMoreMenu}>
          <ListItemText>Save to collection</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleReportEvent}>
          <ListItemText sx={{ color: 'error.main' }}>Report event</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default EventDetails;
