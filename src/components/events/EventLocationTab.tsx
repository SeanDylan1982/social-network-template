import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Divider, 
  Chip, 
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  LocationOn as LocationIcon, 
  Directions as DirectionsIcon, 
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Language as WebsiteIcon,
  Phone as PhoneIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { Event } from '@/types/event';

// This would be replaced with an actual map component in a real app
const MapPlaceholder = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box 
      sx={{
        width: '100%',
        height: isMobile ? 250 : 400,
        bgcolor: 'grey.100',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${theme.palette.divider}`,
        mb: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box 
        component="img"
        src="/images/map-placeholder.jpg"
        alt="Map"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          p: 2,
          borderRadius: 2,
          textAlign: 'center',
          boxShadow: 1,
        }}
      >
        <LocationIcon color="primary" fontSize="large" />
        <Typography variant="body1" fontWeight={500}>
          {event.location}
        </Typography>
        <Button 
          variant="outlined" 
          size="small" 
          startIcon={<DirectionsIcon />}
          sx={{ mt: 1 }}
          onClick={() => {}}
        >
          Get Directions
        </Button>
      </Box>
    </Box>
  );
};

interface EventLocationTabProps {
  event: Event;
}

const EventLocationTab: React.FC<EventLocationTabProps> = ({ event }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Format date and time
  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Location & Date
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {event.location}
        </Typography>
        
        <MapPlaceholder />
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<DirectionsIcon />}
          fullWidth={isMobile}
          sx={{ mb: 3 }}
          onClick={() => {}}
        >
          Get Directions
        </Button>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Date & Time
        </Typography>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} mb={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              flex: 1, 
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
            }}
          >
            <Box display="flex" alignItems="center" mb={1}>
              <CalendarIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle2">Start</Typography>
            </Box>
            <Typography variant="body1">
              {formatDateTime(event.startDate)}
            </Typography>
          </Paper>
          
          {event.endDate && (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                flex: 1, 
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
              }}
            >
              <Box display="flex" alignItems="center" mb={1}>
                <CalendarIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">End</Typography>
              </Box>
              <Typography variant="body1">
                {formatDateTime(event.endDate)}
              </Typography>
            </Paper>
          )}
        </Stack>
        
        {event.timezone && (
          <Typography variant="body2" color="text.secondary">
            Time zone: {event.timezone}
          </Typography>
        )}
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      {event.organizer && (
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            Organizer
          </Typography>
          <Box 
            display="flex" 
            alignItems="center" 
            sx={{ 
              p: 2, 
              borderRadius: 2, 
              bgcolor: 'grey.50',
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box
              component="img"
              src={event.organizer.avatar || '/images/avatars/default-org.jpg'}
              alt={event.organizer.name}
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                objectFit: 'cover',
                mr: 2,
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {event.organizer.name}
              </Typography>
              {event.organizer.title && (
                <Typography variant="body2" color="text.secondary">
                  {event.organizer.title}
                </Typography>
              )}
              <Box display="flex" gap={1} mt={1}>
                {event.organizer.website && (
                  <IconButton size="small" href={event.organizer.website} target="_blank">
                    <WebsiteIcon fontSize="small" />
                  </IconButton>
                )}
                {event.organizer.phone && (
                  <IconButton size="small" href={`tel:${event.organizer.phone}`}>
                    <PhoneIcon fontSize="small" />
                  </IconButton>
                )}
                {event.organizer.email && (
                  <IconButton size="small" href={`mailto:${event.organizer.email}`}>
                    <EmailIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      
      <Divider sx={{ my: 3 }} />
      
      <Box>
        <Typography variant="h6" gutterBottom>
          Share This Event
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<FacebookIcon />}
            onClick={() => {}}
          >
            Facebook
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<TwitterIcon />}
            onClick={() => {}}
          >
            Twitter
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<LinkedInIcon />}
            onClick={() => {}}
          >
            LinkedIn
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<LinkIcon />}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              // Show success message
            }}
          >
            Copy Link
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default EventLocationTab;
