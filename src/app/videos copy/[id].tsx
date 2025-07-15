import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Button,
  Divider,
  Avatar,
  TextField,
  Paper,
  useTheme,
  useMediaQuery,
  Skeleton,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Share as ShareIcon,
  PlaylistAdd as PlaylistAddIcon,
  MoreVert as MoreVertIcon,
  Reply as ReplyIcon,
  Subscriptions as SubscriptionsIcon,
} from '@mui/icons-material';
import { VideoPlayer, VideoMetadata, ChannelInfo, CommentsSection, RelatedVideos } from '@/components/videos';
import { Video } from '@/types/video';

// Mock data - replace with real API calls
const mockVideo: Video = {
  id: '1',
  title: 'Getting Started with Next.js 13',
  description: 'In this comprehensive tutorial, we\'ll explore the new features of Next.js 13, including the app directory, React Server Components, and more. Perfect for both beginners and experienced developers looking to upgrade their skills.',
  videoUrl: 'https://example.com/videos/nextjs-tutorial.mp4',
  thumbnail: '/images/videos/nextjs-thumbnail.jpg',
  duration: '12:34',
  views: 12453,
  likes: 843,
  dislikes: 12,
  comments: 127,
  uploadDate: '2023-10-15',
  channel: 'Web Dev Simplified',
  channelId: '1',
  channelAvatar: '/images/avatars/avatar1.jpg',
  tags: ['Next.js', 'React', 'JavaScript', 'Web Development', 'Tutorial'],
  isLiked: false,
  isDisliked: false,
  isSubscribed: false,
  isSaved: false,
};

const mockRelatedVideos: Video[] = [
  {
    id: '2',
    title: 'Mastering React Hooks',
    description: 'Learn how to use React Hooks effectively in your applications.',
    thumbnail: '/images/videos/react-hooks.jpg',
    duration: '15:42',
    views: 24531,
    likes: 1532,
    comments: 231,
    uploadDate: '2023-09-28',
    channel: 'React Masters',
    channelAvatar: '/images/avatars/avatar2.jpg',
    isLiked: false,
    isSubscribed: false,
  },
  // Add more related videos as needed
];

const VideoDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('comments');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchVideoData = async () => {
      setIsLoading(true);
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVideo(mockVideo);
        setRelatedVideos(mockRelatedVideos);
      } catch (error) {
        console.error('Error fetching video data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchVideoData();
    }
  }, [id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleLike = () => {
    if (!video) return;
    
    const wasLiked = video.isLiked;
    const wasDisliked = video.isDisliked;
    
    setVideo({
      ...video,
      likes: wasLiked ? video.likes - 1 : video.likes + 1,
      dislikes: wasDisliked ? video.dislikes - 1 : video.dislikes,
      isLiked: !wasLiked,
      isDisliked: false,
    });
  };

  const handleDislike = () => {
    if (!video) return;
    
    const wasLiked = video.isLiked;
    const wasDisliked = video.isDisliked;
    
    setVideo({
      ...video,
      likes: wasLiked ? video.likes - 1 : video.likes,
      dislikes: wasDisliked ? video.dislikes - 1 : video.dislikes + 1,
      isLiked: false,
      isDisliked: !wasDisliked,
    });
  };

  const handleSubscribe = () => {
    if (!video) return;
    
    setVideo({
      ...video,
      isSubscribed: !video.isSubscribed,
    });
  };

  const handleSave = () => {
    if (!video) return;
    
    setVideo({
      ...video,
      isSaved: !video.isSaved,
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    // Handle comment submission
    console.log('Comment submitted:', comment);
    setComment('');
  };

  if (isLoading || !video) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Skeleton variant="rectangular" width="100%" height={isMobile ? 200 : 500} />
            <Box sx={{ mt: 2 }}>
              <Skeleton width="80%" height={40} />
              <Skeleton width="60%" height={24} sx={{ mt: 1 }} />
              <Skeleton width="40%" height={24} sx={{ mt: 1 }} />
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            {[1, 2, 3].map((item) => (
              <Box key={item} sx={{ display: 'flex', mb: 2 }}>
                <Skeleton variant="rectangular" width={168} height={94} />
                <Box sx={{ pl: 1, flex: 1 }}>
                  <Skeleton width="100%" height={20} />
                  <Skeleton width="60%" height={16} sx={{ mt: 1 }} />
                  <Skeleton width="40%" height={16} />
                </Box>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>{video.title} | Social Network</title>
        <meta name="description" content={video.description.substring(0, 160)} />
      </Head>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Main Video Content */}
          <Grid item xs={12} lg={8}>
            <Box sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
              <VideoPlayer videoUrl={video.videoUrl} thumbnail={video.thumbnail} />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
                {video.title}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {video.tags?.map((tag) => (
                  <Chip key={tag} label={`#${tag}`} size="small" />
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <IconButton onClick={handleLike} color={video.isLiked ? 'primary' : 'default'}>
                    <ThumbUpIcon />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    {video.likes.toLocaleString()}
                  </Typography>
                </Box>
                
                <IconButton onClick={handleDislike} color={video.isDisliked ? 'primary' : 'default'}>
                  <ThumbDownIcon />
                </IconButton>
                
                <IconButton>
                  <ShareIcon />
                </IconButton>
                
                <IconButton onClick={handleSave} color={video.isSaved ? 'primary' : 'default'}>
                  <PlaylistAddIcon />
                </IconButton>
                
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>

              <Paper sx={{ p: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={video.channelAvatar} alt={video.channel} sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {video.channel}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {Math.floor(Math.random() * 1000).toLocaleString()} subscribers
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant={video.isSubscribed ? 'outlined' : 'contained'}
                    color="primary"
                    startIcon={video.isSubscribed ? <SubscriptionsIcon /> : null}
                    onClick={handleSubscribe}
                  >
                    {video.isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </Button>
                </Box>

                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {video.description}
                </Typography>
              </Paper>
            </Box>

            {/* Comments Section */}
            <Paper sx={{ p: 2 }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                sx={{ mb: 2 }}
              >
                <Tab label={`${video.comments} Comments`} value="comments" />
                <Tab label="Related Videos" value="related" />
              </Tabs>

              {activeTab === 'comments' ? (
                <>
                  <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 40, height: 40 }} />
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        size="small"
                      />
                      <Button type="submit" variant="text" color="primary">
                        Comment
                      </Button>
                    </Box>
                  </Box>
                  
                  <CommentsSection videoId={video.id} />
                </>
              ) : (
                <RelatedVideos videos={relatedVideos} />
              )}
            </Paper>
          </Grid>

          {/* Sidebar with Related Videos */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: 'sticky', top: 20 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
                Up next
              </Typography>
              <RelatedVideos videos={relatedVideos} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default VideoDetailPage;
