import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container, Typography, Button, Paper } from '@mui/material';
import EventDetails from '@/components/events/EventDetails';
import { Event } from '@/types/event';

// Mock data - replace with real API calls
const mockEvent: Event = {
  id: '1',
  title: 'Tech Conference 2023',
  description: 'Join us for the biggest technology conference of the year, featuring industry leaders, hands-on workshops, and networking opportunities.',
  longDescription: `# Tech Conference 2023

## About the Event

Join us for the biggest technology conference of the year, featuring industry leaders, hands-on workshops, and networking opportunities. This year's theme is "The Future of AI and Web Development".

## What to Expect

- **Keynote Speeches**: Hear from industry leaders about the latest trends and innovations.
- **Technical Workshops**: Get hands-on experience with cutting-edge technologies.
- **Networking**: Connect with like-minded professionals and industry experts.
- **Hackathon**: Participate in our 24-hour hackathon with exciting prizes.`,
  image: '/images/events/tech-conference.jpg',
  startDate: '2023-12-15T09:00:00',
  endDate: '2023-12-16T18:00:00',
  timezone: 'America/Los_Angeles',
  location: 'San Francisco Convention Center, 747 Howard St, San Francisco, CA 94103',
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
    title: 'Event Organizer',
    bio: 'Organizing top-notch technology events since 2015.',
    website: 'https://techevents.example.com',
    followers: 12500,
  },
  attendeesList: [
    { id: 'user1', name: 'Alex Johnson', avatar: '/images/avatars/user1.jpg', joinDate: '2023-10-15' },
    { id: 'user2', name: 'Maria Garcia', avatar: '/images/avatars/user2.jpg', joinDate: '2023-10-10' },
  ],
  tags: ['Technology', 'Conference', 'AI', 'Web Development', 'Networking'],
};

const EventDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch event data
  useEffect(() => {
    const timer = setTimeout(() => {
      setEvent(mockEvent);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" width="100%" height={400} sx={{ mb: 3, borderRadius: 2 }} />
        <Skeleton variant="text" width="60%" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="40%" height={30} sx={{ mb: 4 }} />
        <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Event not found
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => router.push('/events')}
            sx={{ mt: 2 }}
          >
            Back to Events
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Head>
        <title>{event.title} | Social Network</title>
        <meta name="description" content={event.description} />
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={event.description} />
        <meta property="og:image" content={event.image} />
      </Head>
      {event ? (
        <EventDetails event={event} />
      ) : (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Event not found
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => router.push('/events')}
          >
            Back to Events
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default EventDetailPage;
