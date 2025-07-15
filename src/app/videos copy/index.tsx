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
import { VideoCard } from '@/components/videos/VideoCard';
import { Video } from '@/types/video';

// Mock data - replace with real API calls
const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 13',
    description: 'Learn how to build modern web applications with Next.js 13 and React 18.',
    thumbnail: '/images/videos/nextjs-thumbnail.jpg',
    duration: '12:34',
    views: 12453,
    likes: 843,
    comments: 127,
    uploadDate: '2023-10-15',
    channel: 'Web Dev Simplified',
    channelAvatar: '/images/avatars/avatar1.jpg',
    isLiked: false,
    isSubscribed: false,
  },
  // Add more mock videos as needed
];

const VideosPage: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Simulate API call
    const fetchVideos = async () => {
      setIsLoading(true);
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVideos(mockVideos);
      setFilteredVideos(mockVideos);
      setIsLoading(false);
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    // Filter videos based on search query
    if (searchQuery.trim() === '') {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter(
        video =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.channel.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  }, [searchQuery, videos]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    // Add filtering logic based on tab
  };

  const handleVideoClick = (videoId: string) => {
    router.push(`/videos/${videoId}`);
  };

  const handleUploadClick = () => {
    router.push('/videos/upload');
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton width="80%" />
                <Skeleton width="60%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>Videos | Social Network</title>
        <meta name="description" content="Browse and watch videos from the community" />
      </Head>

      <Box sx={{ bgcolor: 'background.paper', pt: 2, pb: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Videos
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleUploadClick}
                sx={{ mr: 1 }}
              >
                Upload Video
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                color="inherit"
                onClick={() => setViewMode('grid')}
                size={isMobile ? 'small' : 'medium'}
                sx={{ minWidth: 'auto', p: 1, mr: 1 }}
              >
                <GridViewIcon />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'contained' : 'outlined'}
                color="inherit"
                onClick={() => setViewMode('list')}
                size={isMobile ? 'small' : 'medium'}
                sx={{ minWidth: 'auto', p: 1 }}
              >
                <ViewListIcon />
              </Button>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Paper sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="video categories"
            >
              <Tab label="All" value="all" />
              <Tab label="Trending" value="trending" />
              <Tab label="Subscriptions" value="subscriptions" />
              <Tab label="Music" value="music" />
              <Tab label="Gaming" value="gaming" />
              <Tab label="News" value="news" />
              <Tab label="Sports" value="sports" />
              <Tab label="Learning" value="learning" />
            </Tabs>
          </Paper>

          {filteredVideos.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No videos found
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Try adjusting your search or filter to find what you're looking for.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredVideos.map((video) => (
                <Grid
                  item
                  xs={12}
                  sm={viewMode === 'list' ? 12 : 6}
                  md={viewMode === 'list' ? 12 : 4}
                  lg={viewMode === 'list' ? 12 : 3}
                  key={video.id}
                >
                  <VideoCard
                    video={video}
                    variant={viewMode === 'list' ? 'horizontal' : 'vertical'}
                    onClick={() => handleVideoClick(video.id)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {!isMobile && (
        <Fab
          color="primary"
          aria-label="upload video"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
          }}
          onClick={handleUploadClick}
        >
          <AddIcon />
        </Fab>
      )}
    </>
  );
};

export default VideosPage;
